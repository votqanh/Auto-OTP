import React from 'react';
import { Link } from 'react-router-dom';

function TermsPage() {
  return (
    <div className="min-h-screen font-sans text-gray-700 px-4 py-8">
      <header className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center transition-all duration-500">Terms of Service</h1>
      </header>
      <article className="max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
        <p className="mb-4">
          By installing or using the Auto OTP Chrome Extension (“the Extension”), you agree to be bound by the following terms and conditions
          (“Terms”). Please read them carefully before using the Extension.
        </p>

        {/* <p className="mb-4">
          <strong>License:</strong> Auto OTP is an open-source project distributed under the MIT License. You are permitted to use, modify,
          and distribute the Extension in accordance with the license terms. A full copy of the license is available on our{' '}
          <a href="https://github.com/votqanh/Auto-OTP" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            GitHub repository
          </a>.
        </p> */}

        <p className="mb-4">
          <strong>User Responsibilities:</strong> You are responsible for using the Extension in compliance with all applicable laws and
          regulations. You must not use the Extension for any unlawful or unauthorized purpose.
        </p>

        <p className="mb-4">
          <strong>Privacy:</strong> The Extension uses OAuth to securely access your Gmail account for the sole purpose of fetching OTP emails.
          Your credentials are never stored or transmitted to any server controlled by us. For more information, please refer to our{' '}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>.
        </p>

        <p className="mb-4">
          <strong>Disclaimer:</strong> The Extension is provided “as is” without warranty of any kind, express or implied. We do not guarantee
          that the Extension will function without error or interruption, nor that it will be compatible with all systems or websites.
        </p>

        <p className="mb-4">
          <strong>Limitation of Liability:</strong> To the fullest extent permitted by law, we shall not be held liable for any damages arising
          from your use of the Extension, including but not limited to loss of data, loss of access, or third-party claims.
        </p>

        <p className="mb-4">
          <strong>Changes to the Terms:</strong> We may update these Terms from time to time. Continued use of the Extension after such changes
          constitutes acceptance of the updated Terms.
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

export default TermsPage;
