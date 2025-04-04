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
        document.getElementById("signOut").style.display = "block";

        // Fetch the user's email address
        fetchUserEmail(token).catch((error) => {
          console.error(error);
        });
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

        fetchUserEmail(token).catch((error) => {
          console.error(error);
        });
  
        console.log("Signed in successfully");
        // Hide the Sign In button and show the Get OTP button
        document.getElementById("signIn").style.display = "none";
        document.getElementById("getOtp").style.display = "block";
        document.getElementById("signOut").style.display = "block";
      });
    });

    // Sign Out button logic
    document.getElementById("signOut").addEventListener("click", () => {
        chrome.identity.getAuthToken({ interactive: false }, (token) => {
          console.log("Token for sign out:", token);
          if (chrome.runtime.lastError) {
              console.error("Error fetching token:", chrome.runtime.lastError);
              return;
          }
      
          // Remove the cached token
          var url = 'https://accounts.google.com/o/oauth2/revoke?token=' + token;
          window.fetch(url);

          chrome.identity.removeCachedAuthToken({ token: token }, () => {
              console.log("Signed out successfully");
              // Hide the Get OTP and Sign Out buttons, and show the Sign In button
              document.getElementById("getOtp").style.display = "none";
              document.getElementById("signOut").style.display = "none";
              document.getElementById("signIn").style.display = "block";
              // Clear the displayed emai
              displayUserEmail("");
          });
        });
    });

    // Function to fetch the user's email address using the UserInfo endpoint
    async function fetchUserEmail(token) {
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
        const email = data.email; // Extract the email address
    
        // Display the email above the Get OTP button
        displayUserEmail(email);
    }
  
    // Function to display the user's email
    function displayUserEmail(email) {
        const emailElement = document.getElementById("email");
        emailElement.textContent = email;
    }
  
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