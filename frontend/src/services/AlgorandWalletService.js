import { PeraWalletConnect } from "@perawallet/connect";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import algosdk from "algosdk";

class AlgorandWalletService {
  constructor() {
    this.peraWallet = new PeraWalletConnect();
    this.deflyWallet = new DeflyWalletConnect();
    this.selectedWallet = null; // 'pera' | 'defly' | 'algosigner'
  }

  /**
   * Detects available wallet extensions in the browser.
   */
  async detectWallets() {
    return {
      pera: {
        id: 'pera',
        name: 'Pera Wallet',
        installed: true, // Pera is always available via QR/Mobile
        extensionInstalled: !!window?.algorand?.isPera
      },
      defly: {
        id: 'defly',
        name: 'Defly Wallet',
        installed: true, // Defly is always available via QR/Mobile
        extensionInstalled: !!window?.algorand?.isDefly
      },
      algosigner: {
        id: 'algosigner',
        name: 'AlgoSigner',
        installed: typeof window !== 'undefined' && !!window.AlgoSigner,
        extensionInstalled: typeof window !== 'undefined' && !!window.AlgoSigner
      }
    };
  }

  /**
   * Connects to Pera Wallet.
   */
  async connectPera() {
    try {
      const accounts = await this.peraWallet.connect();
      this.peraWallet.handleDisconnected(() => {
        this.disconnect();
      });
      this.selectedWallet = 'pera';
      return accounts[0];
    } catch (error) {
      if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
        throw error;
      }
    }
  }

  /**
   * Connects to Defly Wallet.
   */
  async connectDefly() {
    try {
      const accounts = await this.deflyWallet.connect();
      this.deflyWallet.handleDisconnected(() => {
        this.disconnect();
      });
      this.selectedWallet = 'defly';
      return accounts[0];
    } catch (error) {
      if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
        throw error;
      }
    }
  }

  /**
   * Connects to AlgoSigner.
   */
  async connectAlgoSigner() {
    if (typeof window.AlgoSigner === "undefined") {
      throw new Error("AlgoSigner not installed");
    }

    await window.AlgoSigner.connect();
    const accounts = await window.AlgoSigner.accounts({
      ledger: "MainNet", // Default to MainNet, can be changed
    });

    if (accounts.length === 0) {
      throw new Error("No accounts found in AlgoSigner");
    }

    this.selectedWallet = 'algosigner';
    return accounts[0].address;
  }

  /**
   * Reconnects to previous session if available.
   */
  async reconnect(savedProvider) {
    if (savedProvider === 'pera') {
      try {
        const accounts = await this.peraWallet.reconnectSession();
        if (accounts.length > 0) {
          this.peraWallet.handleDisconnected(() => this.disconnect());
          this.selectedWallet = 'pera';
          return accounts[0];
        }
      } catch (e) {
        console.error("Pera reconnect failed", e);
      }
    } else if (savedProvider === 'defly') {
      try {
        const accounts = await this.deflyWallet.reconnectSession();
        if (accounts.length > 0) {
          this.deflyWallet.handleDisconnected(() => this.disconnect());
          this.selectedWallet = 'defly';
          return accounts[0];
        }
      } catch (e) {
        console.error("Defly reconnect failed", e);
      }
    } else if (savedProvider === 'algosigner') {
      // AlgoSigner doesn't have a specific reconnect, just check if connected
      return await this.connectAlgoSigner();
    }
    return null;
  }

  /**
   * Disconnects the active wallet.
   */
  async disconnect() {
    if (this.selectedWallet === 'pera') {
      await this.peraWallet.disconnect();
    } else if (this.selectedWallet === 'defly') {
      await this.deflyWallet.disconnect();
    }
    this.selectedWallet = null;
    localStorage.removeItem("wallet_provider");
    window.location.reload(); // Force reload to clear all states reliably
  }

  /**
   * Helper to truncate address for UI.
   */
  formatAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
}

export const walletService = new AlgorandWalletService();
