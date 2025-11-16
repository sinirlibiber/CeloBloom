import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, Users } from "lucide-react";
import { Campaign } from "@shared/schema";
import { DonorList } from "@/components/donor-list";
import campaignPlaceholder from "@assets/generated_images/Campaign_placeholder_seedling_illustration_bae6efde.png";

interface CampaignCardProps {
  campaign: Campaign;
  onDonate: (campaign: Campaign) => void;
}

export function CampaignCard({ campaign, onDonate }: CampaignCardProps) {
  const [showDonors, setShowDonors] = useState(false);
  const percentage = campaign.goal > 0 ? Math.min((campaign.raised / campaign.goal) * 100, 100) : 0;
  const shortAddress = `${campaign.creatorAddress.slice(0, 6)}...${campaign.creatorAddress.slice(-4)}`;

  return (
    <>
      <Card className="overflow-hidden hover-elevate transition-all" data-testid={`card-campaign-${campaign.id}`}>
      <div className="aspect-video w-full bg-accent relative overflow-hidden">
        <img 
          src={campaign.imageUrl || campaignPlaceholder} 
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <Badge 
          variant={campaign.network === "mainnet" ? "default" : "secondary"}
          className="absolute top-3 right-3"
        >
          {campaign.network === "mainnet" ? "Mainnet" : "Testnet"}
        </Badge>
      </div>
      
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif font-semibold text-xl leading-tight" data-testid={`text-campaign-title-${campaign.id}`}>
            {campaign.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {campaign.creatorAddress.slice(2, 4).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground font-mono" data-testid={`text-creator-${campaign.id}`}>
            {shortAddress}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-description-${campaign.id}`}>
          {campaign.description}
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium" data-testid={`text-percentage-${campaign.id}`}>
              {percentage.toFixed(0)}%
            </span>
          </div>
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="font-medium text-primary" data-testid={`text-raised-${campaign.id}`}>
              {campaign.raised.toLocaleString()} cUSD
            </span>
            <span className="text-muted-foreground">
              of {campaign.goal.toLocaleString()} cUSD
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Button 
          className="flex-1" 
          onClick={() => onDonate(campaign)}
          data-testid={`button-donate-${campaign.id}`}
          title="One small cUSD, one giant bloom"
        >
          <Heart className="mr-2 h-4 w-4" />
          Donate
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setShowDonors(true)}
          data-testid={`button-view-donors-${campaign.id}`}
          title="View donors"
        >
          <Users className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>

      <Dialog open={showDonors} onOpenChange={setShowDonors}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid={`dialog-donors-${campaign.id}`}>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {campaign.title} - Donors
            </DialogTitle>
            <DialogDescription>
              Thank you to everyone helping this campaign bloom!
            </DialogDescription>
          </DialogHeader>
          
          <DonorList campaignId={campaign.id} network={campaign.network} />
        </DialogContent>
      </Dialog>
    </>
  );
}
