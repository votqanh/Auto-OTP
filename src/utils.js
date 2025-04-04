import { convert } from "html-to-text";

// Function to add an account element to the UI
export function addAccountElement(email) {
    const accountList = document.getElementById("accountList");
  
    const accountItem = document.createElement("div");
    accountItem.className = "account-item";
  
    const emailLabel = document.createElement("span");
    emailLabel.textContent = email;
    emailLabel.className = "email-label";
  
    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.className = "remove-button";
    removeButton.addEventListener("click", () => {
        chrome.storage.local.get("accounts", (result) => {
            const accounts = result.accounts || [];
            const updatedAccounts = accounts.filter((account) => account.email !== email);
            chrome.storage.local.set({ accounts: updatedAccounts }, () => {
                accountItem.remove();
                console.log("Account removed:", email);
            });
        });
    });
  
    accountItem.appendChild(emailLabel);
    accountItem.appendChild(removeButton);
    accountList.appendChild(accountItem);
  }

export function extractOTP(text) {
    // Edge case: HTML body (Uber sends OTPs in HTML emails)
    const parsed = convert(text, {
        wordwrap: 100, // Ensures text isn't too long
        selectors: [
            { selector: "img", format: "skip" }, // Remove images
            { selector: "a", options: { ignoreHref: true } }, // Remove links
        ],
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

    // Function to fetch the user's email address using the UserInfo endpoint
export async function fetchUserEmail(token) {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  const response = await fetch(url, {
      headers: {
          Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch user email: ${response.statusText}`);
    }

    const data = await response.json();
    return data.email; // Extract the email address
}