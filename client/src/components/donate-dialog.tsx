import { useState, useEffect, useRef } from "react";
import { Campaign } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Loader2 } from "lucide-react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";

interface DonateDialogProps {
  campaign: Campaign | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (txHash: string, amount: number) => void;
}

const CUSD_ADDRESS_TESTNET = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
const CUSD_ADDRESS_MAINNET = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

const ERC20_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ name: "", type: "bool" }]
  }
] as const;

export function DonateDialog({ campaign, open, onOpenChange, onSuccess }: DonateDialogProps) {
  const [amount, setAmount] = useState("10");
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const hasHandledSuccess = useRef(false);

  useEffect(() => {
    if (isSuccess && hash && !hasHandledSuccess.current) {
      hasHandledSuccess.current = true;
      
      setTimeout(() => {
        onSuccess(hash, parseFloat(amount));
        onOpenChange(false);
        setAmount("10");
        reset();
        hasHandledSuccess.current = false;
      }, 1000);
    }
  }, [isSuccess, hash, amount, onSuccess, onOpenChange, reset]);

  const handleDonate = async () => {
    if (!campaign || !address) return;

    const cusdAddress = campaign.network === "mainnet" 
      ? CUSD_ADDRESS_MAINNET 
      : CUSD_ADDRESS_TESTNET;

    try {
      const amountInWei = parseUnits(amount, 18);
      
      writeContract({
        address: cusdAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: "transfer",
        args: [campaign.beneficiaryAddress as `0x${string}`, amountInWei],
      });
    } catch (err) {
      console.error("Donation error:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="dialog-donate">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Support this Campaign
          </DialogTitle>
          <DialogDescription>
            One small cUSD, one giant bloom
          </DialogDescription>
        </DialogHeader>

        {campaign && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">{campaign.title}</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Current: {campaign.raised.toLocaleString()} cUSD</p>
                <p>Goal: {campaign.goal.toLocaleString()} cUSD</p>
                <p className="font-mono text-xs">
                  Beneficiary: {campaign.beneficiaryAddress.slice(0, 10)}...{campaign.beneficiaryAddress.slice(-8)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount (cUSD)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10"
                min="1"
                step="1"
                data-testid="input-donation-amount"
              />
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error.message}
              </div>
            )}

            {isSuccess && (
              <div className="text-sm text-primary bg-primary/10 p-3 rounded-md">
                Donation successful! Transaction hash: {hash?.slice(0, 10)}...
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending || isConfirming}
            data-testid="button-cancel-donate"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDonate}
            disabled={!address || isPending || isConfirming || parseFloat(amount) <= 0}
            data-testid="button-confirm-donate"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isPending ? "Confirming..." : "Processing..."}
              </>
            ) : (
              <>
                <Heart className="mr-2 h-4 w-4" />
                Donate {amount} cUSD
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
