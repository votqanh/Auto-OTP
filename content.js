// Function to autofill OTP
function autofillOTP(otp) {
  console.log("Attempting to autofill OTP:", otp); // Log the autofill attempt

  // Check for an OTP input field with autocomplete="one-time-code"
  const otpInput = document.querySelector('input[autocomplete="one-time-code"]');
  if (otpInput) {
    otpInput.value = otp;
    console.log("Autofilled OTP input field:", otpInput); // Log the autofill action
    return;
  }

  // Fallback: Check for multiple OTP input fields (e.g., 4-6 individual boxes)
  const otpInputs = document.querySelectorAll('input[type="text"][maxlength="1"], input[type="number"][maxlength="1"]');
  if (otpInputs.length === otp.length) {
    otp.split('').forEach((digit, index) => {
      otpInputs[index].value = digit;
    });
    console.log("Autofilled multiple input fields:", otpInputs); // Log the autofill action
  }
}

// Add focus event listeners to OTP input fields
function addFocusListeners() {
  // Check for an OTP input field with autocomplete="one-time-code"
  const otpInput = document.querySelector('input[autocomplete="one-time-code"]');
  if (otpInput) {
    otpInput.addEventListener("focus", () => {
      chrome.storage.local.get("otp", (data) => {
        if (data.otp) {
          otpInput.value = data.otp;
          console.log("Autofilled OTP input field on focus:", otpInput); // Log the autofill action
        }
      });
    });
  }

  // Fallback: Check for multiple OTP input fields (e.g., 4-6 individual boxes)
  const otpInputs = document.querySelectorAll('input[type="text"][maxlength="1"], input[type="number"][maxlength="1"]');
  if (otpInputs.length > 0) {
    otpInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        chrome.storage.local.get("otp", (data) => {
          if (data.otp) {
            otpInputs.forEach((input, index) => {
              input.value = data.otp[index] || "";
            });
            console.log("Autofilled multiple input fields on focus:", otpInputs); // Log the autofill action
          }
        });
      });
    });
  }
}

// Add focus listeners when the page loads
addFocusListeners();

// Optionally, add a MutationObserver to detect dynamically added OTP fields
const observer = new MutationObserver(addFocusListeners);
observer.observe(document.body, { childList: true, subtree: true });