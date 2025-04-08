import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PrivacyPage from './PrivacyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  );
}

export default App;