
import { useCallback, useState } from "react";

// Reference the global KeplrWindow type
/// <reference types="src/vite-env.d.ts" />

// Exposed Keplr types are not available unless using @keplr-wallet types. We'll use window.keplr as "any"
interface UseKeplrConnectResult {
  connecting: boolean;
  account: string | null;
  error: string | null;
  connect: () => Promise<void>;
}

/**
 * Simple hook to connect to Keplr wallet and retrieve the Cosmos account address.
 * Chains: e.g. CosmosHub-4 (Cosmos mainnet) or testnets
 */
export function useKeplrConnect(chainId: string = "cosmoshub-4"): UseKeplrConnectResult {
  const [connecting, setConnecting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setConnecting(true);
    setError(null);
    setAccount(null);

    try {
      // Cast window to KeplrWindow to access keplr properties
      const keplrWindow = window as KeplrWindow;

      if (!keplrWindow.keplr) {
        setError("Keplr extension is not installed. Please install Keplr and refresh.");
        setConnecting(false);
        return;
      }

      // Enable the requested chain on Keplr (prompts user)
      await keplrWindow.keplr.enable(chainId);
      // Get offline signer for chain
      const offlineSigner = keplrWindow.getOfflineSigner!(chainId);
      const accounts = await offlineSigner.getAccounts();

      if (accounts && accounts.length > 0) {
        setAccount(accounts[0].address);
      } else {
        setError("No account found in Keplr for this chain.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to connect to Keplr.");
    } finally {
      setConnecting(false);
    }
  }, [chainId]);

  return { connecting, account, error, connect };
}
