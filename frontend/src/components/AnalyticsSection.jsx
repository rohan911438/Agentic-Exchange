import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const metrics = [
  { label: 'Total Agents Deployed', value: '42,840' },
  { label: 'Workflow Executions', value: '1.2M+' },
  { label: 'Transactions Processed', value: '840K' },
  { label: 'Marketplace Revenue', value: '$12.4M' },
  { label: 'Active Developers', value: '15,200' }
];

const AnalyticsSection = () => {
  return (
    <section className="section-container relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent pointer-events-none" />
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-bold">
              {metric.label}
            </span>
            <span className="text-4xl font-bold tracking-tighter text-text-primary text-glow">
              {metric.value}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AnalyticsSection;
