
import { useState } from "react";
import { useKeplrConnect } from "./useKeplrConnect";
import { Button } from "@/components/ui/button";
import { Globe, Link as LinkIcon, ShieldCheck, KeyRound } from "lucide-react";

export default function KeplrConnectPanel({ onConnect }: { onConnect?: (account: string) => void }) {
  const { connecting, account, error, connect } = useKeplrConnect();

  const [showCopied, setShowCopied] = useState(false);

  // Handle copy address
  const handleCopy = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 1500);
    }
  };

  return (
    <div className="rounded-xl shadow bg-[#1A1F2C] text-white max-w-md mx-auto px-6 py-7 flex flex-col items-center">
      <div className="flex flex-col items-center gap-3 mb-5">
        <div className="bg-[#D6BCFA] rounded-full p-2 mb-1">
          <Globe className="h-8 w-8 text-[#6E59A5]" />
        </div>
        <h2 className="font-bold text-2xl tracking-tight mb-1">Connect Keplr Wallet</h2>
        <span className="text-md text-[#8E9196] text-center mb-2">
          Securely link your wallet to use Cosmos/IBC. $NESTIFI support is coming soon!
        </span>
      </div>
      {!account ? (
        <Button
          onClick={connect}
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] mt-2 font-semibold text-lg py-5"
          disabled={connecting}
        >
          {connecting ? (
            <>
              <LinkIcon className="mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <KeyRound className="mr-2" />
              Connect with Keplr
            </>
          )}
        </Button>
      ) : (
        <div className="w-full space-y-4 flex flex-col items-center">
          <div className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-[#E5DEFF] text-[#6E59A5] cursor-pointer"
            onClick={handleCopy}>
            <span className="font-mono text-base">{account.slice(0, 8)}...{account.slice(-6)}</span>
            <ShieldCheck className="h-5 w-5" />
            {showCopied && <span className="ml-2 text-xs text-green-700">Copied!</span>}
          </div>
          <span className="text-xs text-[#999]">Your Cosmos wallet address</span>
        </div>
      )}
      {error && (
        <div className="mt-5 text-center text-sm bg-[#FEF7CD] text-[#8A898C] rounded p-2">{error}</div>
      )}
      <div className="mt-8 text-xs text-[#8E9196]">
        <p>
          Requires the <span className="font-bold">Keplr Extension</span> for Chrome or Firefox. <a href="https://www.keplr.app/" target="_blank" className="underline text-[#7E69AB]">Get Keplr</a>
        </p>
        <p className="mt-2 opacity-80">
          Cosmos IBC connection only. $NESTIFI not yet deployed.
        </p>
      </div>
    </div>
  );
}
