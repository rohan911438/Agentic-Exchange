import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Layers, ShieldCheck, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { useWallet } from "../context/WalletContext";
import { walletService } from "../services/AlgorandWalletService";

const WalletModal = () => {
  const { isModalOpen, toggleModal, connect, connecting, error } = useWallet();
  const [availableWallets, setAvailableWallets] = useState({
    pera: { installed: true, name: "Pera Wallet", id: "pera" },
    defly: { installed: true, name: "Defly Wallet", id: "defly" },
    algosigner: { installed: false, name: "AlgoSigner", id: "algosigner" }
  });

  useEffect(() => {
    const checkWallets = async () => {
      const detected = await walletService.detectWallets();
      setAvailableWallets(detected);
    };
    if (isModalOpen) {
      checkWallets();
    }
  }, [isModalOpen]);

  const wallets = [
    {
      id: "pera",
      name: "Pera Wallet",
      icon: <Smartphone className="w-6 h-6 text-accent" />,
      description: "Connect via mobile app or extension",
      installed: availableWallets.pera.installed
    },
    {
      id: "defly",
      name: "Defly Wallet",
      icon: <Layers className="w-6 h-6 text-accent" />,
      description: "Algorand's DeFi wallet",
      installed: availableWallets.defly.installed
    },
    {
      id: "algosigner",
      name: "AlgoSigner",
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
      description: "Browser extension wallet",
      installed: availableWallets.algosigner.installed,
      installLink: "https://puresake.io/algosigner/"
    }
  ];

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleModal}
          className="absolute inset-0 bg-background-primary/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-surface border border-border rounded-3xl shadow-premium overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center justify-between bg-background-secondary/50">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">Connect Wallet</h2>
            <button
              onClick={toggleModal}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-text-muted hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-3">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400 leading-tight font-medium">{error}</p>
              </motion.div>
            )}

            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                disabled={connecting}
                onClick={() => wallet.installed ? connect(wallet.id) : null}
                className={`w-full group relative flex items-center gap-4 p-4 rounded-2xl border border-border bg-background-secondary/30 transition-all duration-300 ${
                  !wallet.installed ? 'opacity-50 cursor-not-allowed' : 'hover:border-accent/40 hover:bg-surface active:scale-[0.98]'
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-background-primary border border-border flex items-center justify-center group-hover:border-accent/20 transition-colors">
                  {wallet.icon}
                </div>
                
                <div className="flex-grow text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-primary tracking-tight">{wallet.name}</span>
                    {!wallet.installed && (
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-surface border border-border text-text-muted">
                        Legacy
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">{wallet.description}</p>
                </div>

                {!wallet.installed && wallet.installLink && (
                  <a
                    href={wallet.installLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 hover:bg-accent/10 rounded-lg text-accent transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {connecting && (
                  <div className="absolute inset-0 bg-surface/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                    <Loader2 className="w-6 h-6 animate-spin text-accent" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="p-6 bg-background-secondary/50 text-center border-t border-border">
            <p className="text-xs text-text-muted leading-relaxed">
              By connecting, you agree to Agentic Exchange's <br />
              <span className="text-text-primary cursor-pointer hover:text-accent transition-colors">Terms of Service</span> and <span className="text-text-primary cursor-pointer hover:text-accent transition-colors">Privacy Policy</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WalletModal;

