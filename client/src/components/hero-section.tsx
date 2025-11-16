import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sprout, Users, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import heroImage from "@assets/generated_images/Hero_blooming_meadow_background_caf3bdbb.png";

interface PlatformStats {
  totalCampaigns: number;
  totalDonations: number;
  totalRaised: number;
  activeDonors: number;
}

export function HeroSection() {
  const { data: stats, isLoading } = useQuery<PlatformStats>({
    queryKey: ["/api/stats"],
  });

  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative z-10 container mx-auto px-4 py-24 text-center">
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
          data-testid="text-hero-title"
        >
          Plant a seed with your donation,
          <br />
          bloom a world
        </h1>
        
        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          CeloBloom brings communities together through blockchain-powered donations and social sharing on the Celo network
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Link href="/campaigns">
            <Button 
              size="lg" 
              className="bg-primary/90 hover:bg-primary backdrop-blur-sm text-lg px-8"
              data-testid="button-start-growing"
            >
              <Sprout className="mr-2 h-5 w-5" />
              Start Growing
            </Button>
          </Link>
          <Link href="/social">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-sm text-lg px-8"
              data-testid="button-explore-community"
            >
              Explore Community
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 hover-elevate">
            <div className="flex flex-col items-center text-white">
              <TrendingUp className="h-8 w-8 mb-3 text-primary" />
              {isLoading ? (
                <Skeleton className="h-9 w-20 mb-1 bg-white/20" />
              ) : (
                <div className="text-3xl font-bold mb-1" data-testid="text-stat-campaigns">
                  {stats?.totalCampaigns || 0}
                </div>
              )}
              <div className="text-sm text-white/80">Active Campaigns</div>
            </div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 hover-elevate">
            <div className="flex flex-col items-center text-white">
              <Sprout className="h-8 w-8 mb-3 text-primary" />
              {isLoading ? (
                <Skeleton className="h-9 w-24 mb-1 bg-white/20" />
              ) : (
                <div className="text-3xl font-bold mb-1" data-testid="text-stat-donated">
                  {stats?.totalRaised.toLocaleString() || 0}
                </div>
              )}
              <div className="text-sm text-white/80">cUSD Donated</div>
            </div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 hover-elevate">
            <div className="flex flex-col items-center text-white">
              <Users className="h-8 w-8 mb-3 text-primary" />
              {isLoading ? (
                <Skeleton className="h-9 w-20 mb-1 bg-white/20" />
              ) : (
                <div className="text-3xl font-bold mb-1" data-testid="text-stat-members">
                  {stats?.activeDonors || 0}
                </div>
              )}
              <div className="text-sm text-white/80">Community Members</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
