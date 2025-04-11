import { addAccountElement } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Popup loaded");
    var hasAccounts = false;
    // Load existing accounts from storage
    chrome.storage.local.get("accounts", (result) => {
        const accounts = result.accounts || [];
        hasAccounts = accounts.length > 0;

        accounts.forEach((account) => {
            addAccountElement(account.email);
        });

        const getOtpButton = document.getElementById("getOtp");
        if (getOtpButton) {
            getOtpButton.style.display = hasAccounts ? "block" : "none";
        }
    });

    // Add Account button
    document.getElementById("addAccount").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "addAccount" }, (response) => {
          console.log("Response from background script:", response);
            if (response.email) {
                console.log("Account added:", response.email);
                addAccountElement(response.email);

                const getOtpButton = document.getElementById("getOtp");
                if (getOtpButton) {
                    getOtpButton.style.display = "block";
                }
            } else if (response.error) {
                if (response.error === "Account already exists.") {
                    alert("Account already exists.");
                } else {
                    console.error("Error adding account:", response.error);
                }
            }
          }
        );
    });
  
    // Get OTP button
    document.getElementById("getOtp").addEventListener("click", () => {
      chrome.runtime.sendMessage({ action: "getOtp" }, (response) => {
        if (response.otp) {
          alert(`OTP: ${response.otp}\n\nYou don't have to remember it. Just click on the input field to autofill.`);
        } else {
          alert("No OTP found in your inbox.");
        }
      });
    });
});