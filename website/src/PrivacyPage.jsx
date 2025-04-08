import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPage() {
  return (
    <div className="min-h-screen font-sans text-gray-700 px-4 py-8">
      <header className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center transition-all duration-500">Privacy Policy</h1>
      </header>
      <article className="max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
        <p className="mb-4">
          This Privacy Policy explains how Auto OTP (“we,” “us,” or “our”) collects, uses, and protects your personal information when you use
          our Chrome extension. We are committed to safeguarding your privacy and ensuring that your personal data is collected and used only
          in accordance with this Policy.
        </p>
        <p className="mb-4">
          <strong>Data Collection and Use:</strong> Auto OTP utilizes the OAuth protocol to access your Gmail account solely for the purpose
          of retrieving One-Time Passwords (OTPs) required for a seamless login experience. Your credentials and other personal information are
          never stored on our servers.
        </p>
        <p className="mb-4">
          <strong>Security:</strong> We implement industry-standard security measures to ensure that your data is protected from unauthorized access,
          disclosure, alteration, or destruction.
        </p>
        <p className="mb-4">
          <strong>Transparency and Control:</strong> As an open-source project, our code is available on GitHub for public review. We encourage
          you to review our source code to verify our privacy practices.
        </p>
        <p className="mb-4">
          By using Auto OTP, you acknowledge that you have read and understood this Privacy Policy. Any changes to this Policy will be posted on
          this page, and your continued use of the extension constitutes your acceptance of any amendments.
        </p>
      </article>
      <footer className="mt-8 text-center">
        <Link to="/" className="text-blue-600 hover:underline transition-all duration-300 text-base md:text-lg transform hover:scale-105">
          &larr; Back to Home
        </Link>
      </footer>
    </div>
  );
}

export default PrivacyPage;
