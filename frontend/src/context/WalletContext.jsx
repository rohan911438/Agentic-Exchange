import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { walletService } from "../services/AlgorandWalletService";

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [provider, setProvider] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  // Sync with localStorage on mount
  useEffect(() => {
    const savedProvider = localStorage.getItem("wallet_provider");
    if (savedProvider) {
      reconnect(savedProvider);
    }
  }, []);

  const reconnect = async (savedProvider) => {
    setConnecting(true);
    try {
      const address = await walletService.reconnect(savedProvider);
      if (address) {
        setAccount(address);
        setConnected(true);
        setProvider(savedProvider);
      } else {
        localStorage.removeItem("wallet_provider");
      }
    } catch (err) {
      console.error("Reconnect failed", err);
      localStorage.removeItem("wallet_provider");
    } finally {
      setConnecting(false);
    }
  };

  const connect = async (walletType) => {
    setConnecting(true);
    setError(null);
    try {
      let address;
      if (walletType === 'pera') {
        address = await walletService.connectPera();
      } else if (walletType === 'defly') {
        address = await walletService.connectDefly();
      } else if (walletType === 'algosigner') {
        address = await walletService.connectAlgoSigner();
      }

      if (address) {
        setAccount(address);
        setConnected(true);
        setProvider(walletType);
        localStorage.setItem("wallet_provider", walletType);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(`Connection error for ${walletType}:`, err);
      setError(err.message || "Failed to connect wallet");
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      await walletService.disconnect();
      setAccount(null);
      setConnected(false);
      setProvider(null);
      localStorage.removeItem("wallet_provider");
    } catch (err) {
      console.error("Disconnect failed", err);
    }
  };

  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  const value = {
    account,
    connected,
    connecting,
    provider,
    error,
    isModalOpen,
    connect,
    disconnect,
    toggleModal,
    formatAddress: walletService.formatAddress
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
