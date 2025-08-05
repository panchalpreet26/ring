import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RingViewer from './components/RingViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dghedhh" element={<LandingPage />} />
        <Route path="/" element={<RingViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
