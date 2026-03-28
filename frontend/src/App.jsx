import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import CreateDeal from './pages/CreateDeal';
import NegotiationRoom from './pages/NegotiationRoom';
import DealSummary from './pages/DealSummary';
import Dashboard from './pages/Dashboard';
import ActiveDeal from './pages/ActiveDeal';
import Completion from './pages/Completion';

function App() {
  const [connected, setConnected] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-ink-900 font-body selection:bg-aqua/30 selection:text-aqua flex flex-col">
        <Navbar connected={connected} setConnected={setConnected} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={connected ? <Navigate to="/dashboard" /> : <Home />} />
            <Route path="/create-deal" element={connected ? <CreateDeal /> : <Navigate to="/" />} />
            <Route path="/negotiation-room" element={connected ? <NegotiationRoom /> : <Navigate to="/" />} />
            <Route path="/summary" element={connected ? <DealSummary /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={connected ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/active-deal" element={connected ? <ActiveDeal /> : <Navigate to="/" />} />
            <Route path="/completion" element={connected ? <Completion /> : <Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
