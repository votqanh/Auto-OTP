import { extractOTP, fetchUserEmail } from "./utils.js";

const clientId = chrome.runtime.getManifest().oauth2.client_id;
const redirectUri = chrome.identity.getRedirectURL();
const scopes = chrome.runtime.getManifest().oauth2.scopes.join(" ");

const authUrl = `https://accounts.google.com/o/oauth2/auth?` +
                `client_id=${clientId}&` +
                `response_type=token&` +
                `redirect_uri=${encodeURIComponent(redirectUri)}&` +
                `scope=${encodeURIComponent(scopes)}`;

console.log(clientId);
console.log(redirectUri);
console.log(authUrl);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getOtp") {
        // Retrieve tokens from storage
        chrome.storage.local.get("accounts", async (result) => {
            const accounts = result.accounts || [];
            if (accounts.length === 0) {
                console.error("No accounts found in storage.");
                sendResponse({ otp: null });
                return;
            }

            const query = `is:unread ("OTP" OR "one-time code" OR "login code" OR "sign-in code" OR "sign in code" OR "verification code" OR "one-time pass code" OR "confirmation code")
                -in:spam -in:trash newer_than:1d`;

            let latestEmail = null;
            let latestTimestamp = 0;

            // Iterate over all accounts
            for (const account of accounts) {
                const token = account.token;

                try {
                    // Fetch emails matching the query for the current account
                    const response = await fetch(
                        `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}&maxResults=1&orderBy=internalDate`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`API Error: ${response.status} ${response.statusText}`);
                    }

                    const data = await response.json();
                    if (data.messages && data.messages.length > 0) {
                        // Fetch the first matching email
                        const emailResponse = await fetch(
                            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${data.messages[0].id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        if (!emailResponse.ok) {
                            throw new Error(`API Error: ${emailResponse.status} ${emailResponse.statusText}`);
                        }

                        const email = await emailResponse.json();
                        const timestamp = parseInt(email.internalDate, 10);

                        // Compare timestamps to find the latest email
                        if (timestamp > latestTimestamp) {
                            latestTimestamp = timestamp;
                            latestEmail = email;
                        }
                    }
                } catch (error) {
                    console.error(`Error fetching emails for account ${account.email}:`, error);
                }
            }

            if (latestEmail) {
                console.log("Latest Email Details:", latestEmail);

                // Extract the email body
                let body = "";
                if (latestEmail.payload.body.data) {
                    // Plain text email
                    body = atob(latestEmail.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
                } else if (latestEmail.payload.parts) {
                    // Multipart email (e.g., HTML + plain text)
                    for (const part of latestEmail.payload.parts) {
                        if (part.mimeType === "text/plain" && part.body.data) {
                            body = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
                            break;
                        }
                    }
                }

                const otp = extractOTP(body); // Extract OTP from email body

                if (otp) {
                  chrome.storage.local.set({ otp: otp }, () => {
                    sendResponse({ otp: otp });
                  });
                } else {
                    console.log("No OTP found in the email body.");
                    sendResponse({ otp: null });
                }
            } else {
                console.log("No matching emails found across all accounts.");
                sendResponse({ otp: null });
            }
        });

        // Return true to indicate that the response will be sent asynchronously
        return true;
    }

    else if (request.action === "addAccount") {
      chrome.identity.launchWebAuthFlow(
        { url: authUrl, interactive: true },
        (redirectUrl) => {
            if (chrome.runtime.lastError || !redirectUrl) {
                console.error("OAuth Error:", chrome.runtime.lastError);
                alert("Sign-in failed. Please try again.");
                return;
            }

            const token = new URL(redirectUrl).hash
                .substring(1)
                .split("&")
                .find((param) => param.startsWith("access_token"))
                .split("=")[1];

            fetchUserEmail(token)
              .then((email) => {
                  chrome.storage.local.get("accounts", (result) => {
                      const accounts = result.accounts || [];
                      accounts.push({ email, token });
                      chrome.storage.local.set({ accounts }, () => {
                          console.log("Account added:", email);
                      });
                  });

                  sendResponse({ email });
              })
              .catch((error) => {
                  sendResponse({ error: "Failed to fetch user email.\n" + error });
              });

            return true; // Indicate that the response will be sent asynchronously
        }
    );
    }
});