// Add focus event listeners to OTP input fields
function addFocusListeners() {
  // Check for an OTP input field with autocomplete="one-time-code"
  const otpInput = document.querySelector('input[autocomplete="one-time-code"], \
    input[name*="otp"], input[name*="code"], input[id*="otp"], input[id*="code"], \
    input[class*="otp"], input[class*="code"]');
  if (otpInput) {
    otpInput.addEventListener("focus", () => {
      chrome.storage.local.get("otp", (data) => {
        if (data.otp) {
          otpInput.value = data.otp;

          // Trigger input and change events to simulate user interaction
          otpInput.dispatchEvent(new Event('input', { bubbles: true }));
          otpInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log("Autofilled OTP input field on focus:", otpInput); // Log the autofill action
        }
      });
    });
  }

  // Fallback: Check for multiple OTP input fields (e.g., 4-6 individual boxes)
  const otpInputs = document.querySelectorAll('input[type="text"][maxlength="1"], input[type="number"][maxlength="1"]');
  if (otpInputs.length > 0) {
    otpInputs.forEach((input) => {
      input.addEventListener("click", () => {
        console.log("Clicked OTP input field:", input); // Log the click event
        chrome.storage.local.get("otp", (data) => {
          if (data.otp) {
            otpInputs.forEach((input, index) => {
              input.value = data.otp[index] || "";
              input.dispatchEvent(new Event('input', { bubbles: true }));
              // input.dispatchEvent(new Event('change', { bubbles: true }));
            });
            console.log("Autofilled multiple input fields on click:", otpInputs); // Log the autofill action
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