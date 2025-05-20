import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Capture from './pages/Capture';
import Settings from './pages/Settings';
import { ThemeProvider } from './context/ThemeContext';
import { KnowledgeProvider } from './context/KnowledgeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <KnowledgeProvider>
        <Router>
          <Toaster position="bottom-right" />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="explore" element={<Explore />} />
              <Route path="capture" element={<Capture />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </KnowledgeProvider>
    </ThemeProvider>
  );
}

export default App;