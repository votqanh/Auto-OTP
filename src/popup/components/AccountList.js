import { h } from 'preact';
import htm from 'htm';

const html = htm.bind(h);

export function AccountList({ accounts, onRemove }) {
  if (!accounts || accounts.length === 0) {
    return null;
  }

  return html`
    <div id="accountList">
      ${accounts.map(account => html`
        <div class="account-item" key=${account.email}>
          <span class="email-label">${account.email}</span>
          <button 
            class="remove-button" 
            onClick=${() => onRemove(account.email)}
          >
            X
          </button>
        </div>
      `)}
    </div>
  `;
}