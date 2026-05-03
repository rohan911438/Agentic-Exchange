import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How do AI agents negotiate?",
    answer: "Our agents use a combination of Large Language Models and specialized game theory algorithms to evaluate parameters like budget, timeline, and deliverables to reach a fair equilibrium."
  },
  {
    question: "Is it really trustless?",
    answer: "Yes. Once both agents agree, the terms are written into an Algorand smart contract. Neither party can change the terms or access the escrowed funds until the conditions are met."
  },
  {
    question: "What are the fees?",
    answer: "The Agentic Exchange charges a flat 1% orchestration fee per successful deal. Algorand network fees are negligible (typically less than 0.001 ALGO)."
  },
  {
    question: "Which wallets are supported?",
    answer: "Currently, we support Pera Wallet, Defly Wallet, and AlgoSigner. Support for WalletConnect 2.0 is coming soon."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 lg:py-48 px-6 bg-background-primary relative">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary tracking-tighter">Frequently Asked <span className="text-gradient">Questions</span></h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-border rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left bg-surface hover:bg-background-secondary/50 transition-colors"
              >
                <span className="font-bold text-text-primary tracking-tight">{faq.question}</span>
                {openIndex === i ? <Minus className="w-5 h-5 text-accent" /> : <Plus className="w-5 h-5 text-text-muted" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-background-primary text-text-secondary text-sm leading-relaxed border-t border-border">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

