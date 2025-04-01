import { convert } from "html-to-text";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getOtp") {
      chrome.identity.getAuthToken({ interactive: false }, (token) => {
        if (chrome.runtime.lastError) {
          console.error("OAuth Error:", chrome.runtime.lastError);
          sendResponse({ otp: null });
          return;
        }
  
        // Define the search query for OTP-related emails
        const query = `is:unread ("OTP" OR "one-time code" OR "login code" OR "verification code" OR "one-time pass code" OR "confirmation code")
          -in:spam -in:trash newer_than:1d`;

        // Fetch emails matching the query
        fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}&maxResults=1&orderBy=internalDate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Gmail API Response:", data); // Log the API response
            if (data.messages && data.messages.length > 0) {
              // Fetch the first matching email
              return fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${data.messages[0].id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            } else {
              console.log("No matching emails found.");
              sendResponse({ otp: null });
              return null; // Explicitly return null to avoid undefined
            }
          })
          .then((response) => {
            if (!response) {
              return; // Exit if response is null
            }
            if (!response.ok) {
              throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
          })
          .then((email) => {
            if (!email) {
              return; // Exit if email is null
            }
            console.log("Email Details:", email); // Log the email details
  
            // Extract the email body
            let body = "";
            if (email.payload.body.data) {
              // Plain text email
              body = atob(email.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
            } else if (email.payload.parts) {
              // Multipart email (e.g., HTML + plain text)
              for (const part of email.payload.parts) {
                if (part.mimeType === "text/plain" && part.body.data) {
                  body = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
                  break;
                }
              }
            }
  
            const otp = extractOTP(body); // Extract OTP from email body
  
            if (otp) {
              // Store the OTP in localStorage
              chrome.storage.local.set({ otp: otp }, () => {
                sendResponse({ otp: otp });
              });
            } else {
              console.log("No OTP found in the email body.");
              sendResponse({ otp: null });
            }
          })
          .catch((error) => {
            console.error("Fetch Error:", error);
            sendResponse({ otp: null });
          });
      });
  
      // Return true to indicate that the response will be sent asynchronously
      return true;
    }
  });
  
  function extractOTP(text) {
    // Edge case: HTML body (Uber sends OTPs in HTML emails)
    const parsed = convert(text, {
      wordwrap: 100, // Ensures text isn't too long
      selectors: [
          { selector: "img", format: "skip" }, // Remove images
          { selector: "a", options: { ignoreHref: true } } // Remove links
      ]
    });

    // This regex matches OTPs that are:
    // 4-6 digits long
    // not 1990-2025 (to avoid matching years)
    // possibly separated by a hyphen (e.g., "123-456")
    // alphanumeric (e.g., "F4U-3BE")
    const otpRegex = /\b(?!(?:19[9][0-9]|20[0-2][0-5])\b)(?:[A-Z0-9]{4,6}|[A-Z0-9]{3}-[A-Z0-9]{3})\b/g;
    const match = parsed.match(otpRegex);

    console.log(text);
    console.log(parsed);
  
    if (match) {
      // Remove non-alphanumeric characters from the OTP
      const cleanedOTP = match[0].replace(/[^A-Z0-9]/g, "");
      return cleanedOTP;
    }
  
    return null; // Return null if no OTP is found
  }