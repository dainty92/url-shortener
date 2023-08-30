import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Home from './pages/Home';
import Auth from './pages/Auth';

const AppWrapper = styled.div`
  font-family: Arial, sans-serif;
`;

const AppHeader = styled.header`
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 10px;
`;

const AppTitle = styled.h1`
  margin: 0;
  font-size: 24px;
`;

function App() {
  return (
    <Router>
      <AppWrapper>
        <AppHeader>
          <AppTitle>ShortLinkify - URL Shortener</AppTitle>
        </AppHeader>
        <Routes> {/* Wrap your routes in a Routes component */}
          <Route path="/" element={<Auth />} /> {/* Use the element prop */}
          <Route path="/shorten" element={<Home />} /> {/* Use the element prop */}
        </Routes>
      </AppWrapper>
    </Router>
  );
}

export default App;
