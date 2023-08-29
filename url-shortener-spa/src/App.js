import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <Routes> {/* Wrap your routes in a Routes component */}
        <Route path="/" element={<Auth />} /> {/* Use the element prop */}
        <Route path="/shorten" element={<Home />} /> {/* Use the element prop */}
      </Routes>
    </Router>
  );
}

export default App;
