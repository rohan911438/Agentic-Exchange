import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
            <Route path="/" element={<Home />} />
            <Route path="/create-deal" element={<CreateDeal />} />
            <Route path="/negotiation-room" element={<NegotiationRoom />} />
            <Route path="/summary" element={<DealSummary />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/active-deal" element={<ActiveDeal />} />
            <Route path="/completion" element={<Completion />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
