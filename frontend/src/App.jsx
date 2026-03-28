import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="min-h-screen bg-ink-900 font-body selection:bg-aqua/30 selection:text-aqua">
      <Navbar connected={connected} setConnected={setConnected} />
      
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
