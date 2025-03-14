document.addEventListener("DOMContentLoaded", () => {
    console.log("Popup loaded");
  
    // Check for an existing token
    chrome.identity.getAuthToken({ interactive: false }, (token) => {
      if (chrome.runtime.lastError) {
        console.error("OAuth Error:", chrome.runtime.lastError);
        // Show the Sign In button if no token is available
        document.getElementById("signIn").style.display = "block";
      } else {
        console.log("Token found:", token);
        // Show the Get OTP button if a token is available
        document.getElementById("getOtp").style.display = "block";
      }
    });
  
    // Sign In button
    document.getElementById("signIn").addEventListener("click", () => {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError) {
          console.error("OAuth Error:", chrome.runtime.lastError);
          alert("Sign-in failed. Please try again.");
          return;
        }
  
        console.log("Signed in successfully");
        // Hide the Sign In button and show the Get OTP button
        document.getElementById("signIn").style.display = "none";
        document.getElementById("getOtp").style.display = "block";
      });
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