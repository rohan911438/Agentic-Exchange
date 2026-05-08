import React from 'react';
import Hero from '../components/Hero';
import FeaturedAgents from '../components/FeaturedAgents';
import HowItWorks from '../components/HowItWorks';
import MultiAgentWorkflows from '../components/MultiAgentWorkflows';
import WhyAgenticExchange from '../components/WhyAgenticExchange';
import DeveloperPlatform from '../components/DeveloperPlatform';
import AnalyticsSection from '../components/AnalyticsSection';

const Home = () => {
  return (
    <div className="bg-background-primary overflow-x-hidden">
      <Hero />
      <AnalyticsSection />
      <FeaturedAgents />
      <HowItWorks />
      <MultiAgentWorkflows />
      <WhyAgenticExchange />
      <DeveloperPlatform />
      <div className="py-20" /> {/* Spacer */}
    </div>
  );
};

export default Home;
