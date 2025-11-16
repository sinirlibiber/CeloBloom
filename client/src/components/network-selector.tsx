import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";

export type Network = "mainnet" | "testnet";

export function NetworkSelector() {
  const [network, setNetwork] = useState<Network>("testnet");

  useEffect(() => {
    const saved = localStorage.getItem("celoBloom:network");
    if (saved === "mainnet" || saved === "testnet") {
      setNetwork(saved);
    }
  }, []);

  const handleNetworkChange = (newNetwork: Network) => {
    setNetwork(newNetwork);
    localStorage.setItem("celoBloom:network", newNetwork);
    window.dispatchEvent(new CustomEvent("networkChange", { detail: newNetwork }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" data-testid="button-network-selector">
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Network:</span>
          <Badge variant={network === "mainnet" ? "default" : "secondary"} className="ml-2">
            {network === "mainnet" ? "Mainnet" : "Testnet"}
          </Badge>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleNetworkChange("mainnet")}
          data-testid="menu-item-mainnet"
        >
          <div className="flex flex-col">
            <span className="font-medium">Celo Mainnet</span>
            <span className="text-xs text-muted-foreground">Real transactions with cUSD</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNetworkChange("testnet")}
          data-testid="menu-item-testnet"
        >
          <div className="flex flex-col">
            <span className="font-medium">Alfajores Testnet</span>
            <span className="text-xs text-muted-foreground">Test transactions (recommended)</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function useNetwork() {
  const [network, setNetwork] = useState<Network>("testnet");

  useEffect(() => {
    const saved = localStorage.getItem("celoBloom:network");
    if (saved === "mainnet" || saved === "testnet") {
      setNetwork(saved);
    }

    const handleNetworkChange = (e: Event) => {
      const customEvent = e as CustomEvent<Network>;
      setNetwork(customEvent.detail);
    };

    window.addEventListener("networkChange", handleNetworkChange);
    return () => window.removeEventListener("networkChange", handleNetworkChange);
  }, []);

  return network;
}
