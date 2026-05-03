import React from 'react';
import Hero from '../components/Hero';
import NetworkStats from '../components/NetworkStats';
import HowItWorks from '../components/HowItWorks';
import SecurityAudit from '../components/SecurityAudit';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <NetworkStats />
      <HowItWorks />
      <SecurityAudit />
      <Features />
      <FAQ />
      <CTA />
    </>
  );
};

export default Home;

