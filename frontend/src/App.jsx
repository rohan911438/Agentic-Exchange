import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WalletModal from './components/WalletModal';
import { WalletProvider, useWallet } from './context/WalletContext';

// Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import AgentDetails from './pages/AgentDetails';
import CreateDeal from './pages/CreateDeal';
import NegotiationRoom from './pages/NegotiationRoom';
import DealSummary from './pages/DealSummary';
import Dashboard from './pages/Dashboard';
import Docs from './pages/Docs';
import Billing from './pages/Billing';
import AgentStudio from './pages/AgentStudio';
import WorkflowBuilder from './pages/WorkflowBuilder';
import ActiveDeal from './pages/ActiveDeal';
import Completion from './pages/Completion';
import LegacyNegotiation from './pages/LegacyNegotiation';

function AppContent() {
  const { connected, initialized } = useWallet();

  if (!initialized) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <div className="w-12 h-12 rounded-xl border border-border bg-surface flex items-center justify-center animate-pulse shadow-glow">
          <div className="w-6 h-6 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary font-sans selection:bg-accent/30 selection:text-text-primary flex flex-col">
      <Navbar />
      <WalletModal />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/agent/:id" element={<AgentDetails />} />
          <Route path="/dashboard" element={connected ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/billing" element={connected ? <Billing /> : <Navigate to="/" />} />
          <Route path="/studio" element={connected ? <AgentStudio /> : <Navigate to="/" />} />
          <Route path="/builder" element={connected ? <WorkflowBuilder /> : <Navigate to="/" />} />
          <Route path="/legacy" element={<LegacyNegotiation />} />
          <Route path="/legacy/create-deal" element={connected ? <CreateDeal /> : <Navigate to="/" />} />
          <Route path="/legacy/negotiation-room" element={connected ? <NegotiationRoom /> : <Navigate to="/" />} />
          <Route path="/legacy/summary" element={connected ? <DealSummary /> : <Navigate to="/" />} />
          <Route path="/legacy/active-deal" element={connected ? <ActiveDeal /> : <Navigate to="/" />} />
          <Route path="/legacy/completion" element={connected ? <Completion /> : <Navigate to="/" />} />

          {/* Backward compatibility redirects */}
          <Route path="/create-deal" element={<Navigate to="/legacy/create-deal" replace />} />
          <Route path="/negotiation-room" element={<Navigate to="/legacy/negotiation-room" replace />} />
          <Route path="/summary" element={<Navigate to="/legacy/summary" replace />} />
          <Route path="/active-deal" element={<Navigate to="/legacy/active-deal" replace />} />
          <Route path="/completion" element={<Navigate to="/legacy/completion" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}


function App() {
  return (
    <Router>
      <WalletProvider>
        <AppContent />
      </WalletProvider>
    </Router>
  );
}

export default App;
