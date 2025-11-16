import { CampaignForm } from "@/components/campaign-form";
import { Card } from "@/components/ui/card";
import { InsertCampaign } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useNetwork } from "@/components/network-selector";
import { Button } from "@/components/ui/button";
import { Wallet, Sprout } from "lucide-react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function CreateCampaign() {
  const { address, isConnected } = useAccount();
  const [, setLocation] = useLocation();
  const network = useNetwork();
  const { toast } = useToast();
  const { open } = useWeb3Modal();

  const createCampaign = useMutation({
    mutationFn: async (campaign: InsertCampaign) => {
      return await apiRequest("POST", "/api/campaigns", campaign);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      toast({
        title: "Campaign Created!",
        description: "Your campaign is now live and ready to bloom!",
      });
      setLocation("/campaigns");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create campaign",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: InsertCampaign) => {
    createCampaign.mutate(data);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <Sprout className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className="text-2xl font-serif font-bold mb-3">
            Connect Your Wallet
          </h2>
          <p className="text-muted-foreground mb-6">
            You need to connect your wallet to create a campaign
          </p>
          <Button onClick={() => open()} size="lg" data-testid="button-connect-wallet-create">
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent/20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 md:p-8">
            <CampaignForm
              onSubmit={handleSubmit}
              defaultNetwork={network}
              creatorAddress={address!}
              isPending={createCampaign.isPending}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
