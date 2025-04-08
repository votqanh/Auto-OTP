import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

function HomePage() {
  return (
    <div className="min-h-screen font-sans text-gray-700">
      {/* Header */}
      <header className="flex items-center justify-center py-4 border-b border-gray-200">
        <img
          src="https://raw.githubusercontent.com/votqanh/Auto-OTP/main/assets/icon128.png"
          alt="Auto OTP Logo"
          className="w-14 h-14 mr-3 transition-transform duration-300 hover:scale-105"
        />
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">Auto OTP</h1>
          <p className="text-base md:text-lg text-gray-500">Chrome Extension</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-12 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-transform duration-300">
          Automate your OTPs for a seamless login experience
        </h2>
        <p className="max-w-2xl mx-auto text-base md:text-lg mb-6 transition-all duration-300">
          Tired of switching between your email and browser to copy-paste OTPs? Auto OTP saves you time and effort.
          Our Chrome extension automatically fetches OTPs from your email and fills them in for you – just like SMS OTPs on your phone, but for your desktop.
        </p>
        <a
          href="https://github.com/votqanh/Auto-OTP#installation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-base md:text-lg transition-transform duration-300 transform hover:scale-105"
        >
          <i className="fab fa-chrome mr-2 transition-transform duration-300 hover:rotate-12"></i>
          Install Now
        </a>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-around gap-6">
          <div className="flex-1 px-4">
            <i className="fas fa-download fa-2x text-blue-600 mb-3 transition-transform duration-300"></i>
            <h3 className="text-xl font-semibold mb-1">1. Install Extension</h3>
            <p className="text-sm">
              Download and add Auto OTP to your Chrome browser.{' '}
              <a
                href="https://github.com/votqanh/Auto-OTP#installation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Learn how
              </a>.
            </p>
          </div>
          <div className="flex-1 px-4">
            <i className="fas fa-sign-in-alt fa-2x text-blue-600 mb-3 transition-transform duration-300"></i>
            <h3 className="text-xl font-semibold mb-1">2. Log In Once</h3>
            <p className="text-sm">Securely log in to your email account through the extension.</p>
          </div>
          <div className="flex-1 px-4">
            <i className="fas fa-magic fa-2x text-blue-600 mb-3 transition-transform duration-300"></i>
            <h3 className="text-xl font-semibold mb-1">3. Automatic OTP Handling</h3>
            <p className="text-sm">Auto OTP fetches and fills OTPs for you automatically.</p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-12 text-center px-4 bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Features</h2>
        <ul className="max-w-lg mx-auto text-left space-y-3">
          <li className="text-base md:text-lg py-2 border-b border-gray-200 transition-transform duration-300 hover:scale-105">
            Automatic OTP fetching from email
          </li>
          <li className="text-base md:text-lg py-2 border-b border-gray-200 transition-transform duration-300 hover:scale-105">
            Secure: Uses OAuth for Gmail, ensuring your credentials are never stored
          </li>
          <li className="text-base md:text-lg py-2 border-b border-gray-200 transition-transform duration-300 hover:scale-105">
            One-time login for convenience
          </li>
          <li className="text-base md:text-lg py-2 border-b border-gray-200 transition-transform duration-300 hover:scale-105">
            Currently supports Gmail (more providers coming soon)
          </li>
          <li className="text-base md:text-lg py-2 transition-transform duration-300 hover:scale-105">
            Open-source and transparent
          </li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-base md:text-lg">
          If you have any questions or feedback, feel free to reach out to us at{' '}
          <a href="mailto:votqanh@gmail.com" className="text-blue-600 hover:underline">
            votqanh@gmail.com
          </a>.
        </p>
      </section>

      {/* Short Privacy Policy Section */}
    <section id="privacy" className="py-12 text-center px-4 bg-gray-50">
    <h2 className="text-2xl md:text-3xl font-bold mb-4">Privacy Policy</h2>
    <p className="max-w-2xl mx-auto text-base md:text-lg mb-4">
        We value your privacy. Auto OTP uses OAuth for secure Gmail access and does not store your credentials.
    </p>
    <a
      href="https://autootp.ca/privacy"
      className="text-blue-600 no-underline transition-transform duration-300 transform hover:scale-105"
    >
      Read full Privacy Policy
    </a>
    <p className="mt-4">
        <Link
        to="/tos"
        className="text-blue-600 no-underline transition-transform duration-300 transform hover:scale-105"
        >
        Read full Terms of Service
        </Link>
    </p>
    </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-100">
        <p className="text-xs md:text-sm">&copy; 2025 Auto OTP. All rights reserved.</p>
        <a
          href="https://github.com/votqanh/Auto-OTP"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 no-underline transition-transform duration-300 transform hover:scale-105"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}

export default HomePage;
