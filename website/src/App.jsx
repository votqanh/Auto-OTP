import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PrivacyPage from './PrivacyPage';
import TermsOfService from './TermsOfService';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/tos" element={<TermsOfService />} />
    </Routes>
  );
}

export default App;