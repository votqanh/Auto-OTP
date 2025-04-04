import { addAccountElement } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Popup loaded");

    // Load existing accounts from storage
    chrome.storage.local.get("accounts", (result) => {
        const accounts = result.accounts || [];
        accounts.forEach((account) => {
            addAccountElement(account.email);
        });
    });

    // Add Account button
    document.getElementById("addAccount").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "addAccount" }, (response) => {
            if (response.email) {
                console.log("Account added:", response.email);
                addAccountElement(response.email);
            } else {
                console.error("Failed to add account.");
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