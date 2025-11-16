import { Sprout } from "lucide-react";
import { SiGithub, SiFarcaster } from "react-icons/si";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-xl">CeloBloom</span>
            </div>
            <p className="text-sm text-muted-foreground italic mb-4">
              The community's garden, powered by Celo's soil
            </p>
            <p className="text-sm text-muted-foreground">
              A decentralized platform for donations and social impact on the Celo blockchain.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/campaigns" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-campaigns">
                  Browse Campaigns
                </Link>
              </li>
              <li>
                <Link href="/create-campaign" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-create">
                  Create Campaign
                </Link>
              </li>
              <li>
                <Link href="/social" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-social">
                  Social Feed
                </Link>
              </li>
              <li>
                <a 
                  href="https://docs.celo.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-docs"
                >
                  Celo Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Built By</h3>
            <div className="space-y-3">
              <a
                href="https://github.com/sinirlibiber/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-github"
              >
                <SiGithub className="h-5 w-5" />
                <span>GitHub - sinirlibiber</span>
              </a>
              <a
                href="https://farcaster.xyz/gumusbey"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-farcaster"
              >
                <SiFarcaster className="h-5 w-5" />
                <span>Farcaster - gumusbey</span>
              </a>
            </div>
            <div className="mt-6 text-xs text-muted-foreground">
              <p>Seeds on Celo, flowers on the blockchain</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CeloBloom. Built for the Celo community.</p>
          <p className="mt-1 italic">You plant, we make it bloom</p>
        </div>
      </div>
    </footer>
  );
}
