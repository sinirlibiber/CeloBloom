import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Campaign, InsertDonation } from "@shared/schema";
import { CampaignCard } from "@/components/campaign-card";
import { DonateDialog } from "@/components/donate-dialog";
import { Input } from "@/components/ui/input";
import { Search, Loader2, Sprout } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAccount } from "wagmi";
import { useNetwork } from "@/components/network-selector";

export default function Campaigns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const { address } = useAccount();
  const network = useNetwork();
  const { toast } = useToast();

  const { data: campaigns = [], isLoading } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  const recordDonation = useMutation({
    mutationFn: async (donation: InsertDonation) => {
      return await apiRequest("POST", "/api/donations", donation);
    },
    onSuccess: (_, donation) => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["/api/donations/campaign", donation.campaignId] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "Donation Successful!",
        description: "Your contribution is helping this campaign bloom!",
      });
    },
  });

  const handleDonate = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDonateDialogOpen(true);
  };

  const handleDonationSuccess = (txHash: string, amount: number) => {
    if (selectedCampaign && address) {
      recordDonation.mutate({
        campaignId: selectedCampaign.id,
        donorAddress: address,
        amount,
        txHash,
        network: selectedCampaign.network,
      });
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNetwork = campaign.network === network;
    return matchesSearch && matchesNetwork;
  });

  return (
    <div className="min-h-screen">
      <div className="bg-accent/30 border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-serif font-bold mb-3 text-center">
            Discover Campaigns
          </h1>
          <p className="text-center text-muted-foreground mb-8 italic">
            Seeds on Celo, flowers on the blockchain
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-campaigns"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="text-center py-20">
            <Sprout className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
            <p className="text-muted-foreground">
              {searchQuery 
                ? "Try adjusting your search or check a different network" 
                : "Be the first to plant a seed and create a campaign!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onDonate={handleDonate}
              />
            ))}
          </div>
        )}
      </div>

      <DonateDialog
        campaign={selectedCampaign}
        open={donateDialogOpen}
        onOpenChange={setDonateDialogOpen}
        onSuccess={handleDonationSuccess}
      />
    </div>
  );
}
