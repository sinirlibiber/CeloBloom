import { Sprout, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NetworkSelector } from "@/components/network-selector";
import { Link, useLocation } from "wouter";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  const [location] = useLocation();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { open } = useWeb3Modal();

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 hover-elevate p-2 -m-2 rounded-md">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="font-serif font-bold text-xl hidden sm:inline">CeloBloom</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/campaigns">
              <span 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === "/campaigns" ? "text-primary" : "text-muted-foreground"
                }`}
                data-testid="link-campaigns"
              >
                Campaigns
              </span>
            </Link>
            <Link href="/social">
              <span 
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === "/social" ? "text-primary" : "text-muted-foreground"
                }`}
                data-testid="link-social"
              >
                Community
              </span>
            </Link>
            {isConnected && (
              <Link href="/create-campaign">
                <span 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === "/create-campaign" ? "text-primary" : "text-muted-foreground"
                  }`}
                  data-testid="link-create"
                >
                  Create Campaign
                </span>
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <NetworkSelector />
          <ThemeToggle />
          
          {isConnected && address ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2" data-testid="button-wallet-menu">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {address.slice(2, 4).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-mono text-sm hidden sm:inline">{shortAddress}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2">
                  <p className="text-xs text-muted-foreground">Connected Wallet</p>
                  <p className="font-mono text-sm font-medium">{shortAddress}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" data-testid="menu-item-profile">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/create-campaign">Create Campaign</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => disconnect()}
                  className="text-destructive"
                  data-testid="menu-item-disconnect"
                >
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => open()} data-testid="button-connect-wallet">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
