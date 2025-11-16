import { useQuery } from "@tanstack/react-query";
import { Donation } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DonorListProps {
  campaignId: string;
  network: "mainnet" | "testnet";
}

export function DonorList({ campaignId, network }: DonorListProps) {
  const { data: donations = [], isLoading } = useQuery<Donation[]>({
    queryKey: ["/api/donations/campaign", campaignId],
    enabled: !!campaignId,
  });

  const getExplorerUrl = (txHash: string) => {
    const baseUrl = network === "mainnet" 
      ? "https://celoscan.io/tx/"
      : "https://alfajores.celoscan.io/tx/";
    return `${baseUrl}${txHash}`;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (donations.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Heart className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
        <h3 className="font-semibold mb-2">No donations yet</h3>
        <p className="text-sm text-muted-foreground">
          Be the first to help this campaign bloom!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3" data-testid="list-donors">
      {donations.map((donation) => (
        <Card key={donation.id} className="p-4 hover-elevate" data-testid={`donor-item-${donation.id}`}>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">
                {donation.donorAddress.slice(2, 4).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium font-mono" data-testid={`text-donor-address-${donation.id}`}>
                  {formatAddress(donation.donorAddress)}
                </p>
                <a
                  href={getExplorerUrl(donation.txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`link-tx-${donation.id}`}
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="text-xs text-muted-foreground" data-testid={`text-donation-time-${donation.id}`}>
                {formatDistanceToNow(new Date(donation.createdAt), { addSuffix: true })}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-bold text-primary" data-testid={`text-donation-amount-${donation.id}`}>
                {donation.amount.toLocaleString()} cUSD
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
