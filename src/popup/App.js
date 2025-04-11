import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import htm from "htm";
import { AccountList } from './components/AccountList';

const html = htm.bind(h);

export function App() {
    const [accounts, setAccounts] = useState([]);
    const [hasAccounts, setHasAccounts] = useState(false);

    useEffect(() => {
        console.log("Popup loaded");
        chrome.storage.local.get("accounts", (result) => {
        const accountsData = result.accounts || [];
        setAccounts(accountsData);
        setHasAccounts(accountsData.length > 0);
        });
    }, []);

  const addAccount = () => {
    chrome.runtime.sendMessage({ action: "addAccount" }, (response) => {
      console.log("Response from background script:", response);
      if (response.email) {
        console.log("Account added:", response.email);
        setAccounts(prevAccounts => [...prevAccounts, { email: response.email }]);
        setHasAccounts(true);
      } else if (response.error) {
        if (response.error === "Account already exists.") {
          alert("Account already exists.");
        } else {
          console.error("Error adding account:", response.error);
        }
      }
    });
  };

  const removeAccount = (emailToRemove) => {
    chrome.storage.local.get("accounts", (result) => {
      const currentAccounts = result.accounts || [];
      const updatedAccounts = currentAccounts.filter(account => account.email !== emailToRemove);
      
      chrome.storage.local.set({ accounts: updatedAccounts }, () => {
        setAccounts(updatedAccounts);
        setHasAccounts(updatedAccounts.length > 0);
        console.log("Account removed:", emailToRemove);
      });
    });
  };

  const getOtp = () => {
    chrome.runtime.sendMessage({ action: "getOtp" }, (response) => {
      if (response.otp) {
        alert(`OTP: ${response.otp}\n\nYou don't have to remember it. Just click on the input field to autofill.`);
      } else {
        alert("No OTP found in your inbox.");
      }
    });
  };

  return html`
    <div class="popup-container">
      <h2>OTP Autofill</h2>
      <img src="../assets/icon128.png" alt="Logo" width="60" />
      <button id="addAccount" onClick=${addAccount}>Add Account</button>
      <${AccountList} accounts=${accounts} onRemove=${removeAccount} />
      ${hasAccounts && html`<button id="getOtp" onClick=${getOtp}>Get OTP</button>`}
    </div>
  `;
}

