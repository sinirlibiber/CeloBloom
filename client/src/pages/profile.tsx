import { useQuery } from "@tanstack/react-query";
import { Campaign, Donation, SocialPost } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet, ExternalLink, Users, Sprout, Heart, MessageCircle } from "lucide-react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { formatDistanceToNow } from "date-fns";

export default function Profile() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const { data: campaigns = [], isLoading: loadingCampaigns } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
    enabled: isConnected,
  });

  const { data: donations = [], isLoading: loadingDonations } = useQuery<Donation[]>({
    queryKey: ["/api/donations"],
    enabled: isConnected,
  });

  const { data: posts = [], isLoading: loadingPosts } = useQuery<SocialPost[]>({
    queryKey: ["/api/social/posts"],
    enabled: isConnected,
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-12 text-center max-w-md">
          <Users className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className="text-2xl font-serif font-bold mb-3">
            Connect Your Wallet
          </h2>
          <p className="text-muted-foreground mb-6">
            Connect your wallet to view your profile and activity
          </p>
          <Button onClick={() => open()} size="lg" data-testid="button-connect-wallet-profile">
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
        </Card>
      </div>
    );
  }

  const myCampaigns = campaigns.filter(c => c.creatorAddress.toLowerCase() === address?.toLowerCase());
  const myDonations = donations.filter(d => d.donorAddress.toLowerCase() === address?.toLowerCase());
  const myPosts = posts.filter(p => p.authorAddress.toLowerCase() === address?.toLowerCase());

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="min-h-screen bg-accent/10">
      <div className="bg-gradient-to-b from-primary/20 to-transparent border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="text-3xl bg-primary/20 text-primary">
                {address.slice(2, 4).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-serif font-bold mb-2" data-testid="text-profile-address">
              {shortAddress}
            </h1>
            <p className="text-muted-foreground italic mb-4">
              CeloBloom: Every donation a leaf, every post a petal
            </p>
            <div className="flex gap-3">
              <Badge variant="outline" className="font-mono text-xs">
                {address}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="campaigns" data-testid="tab-campaigns">
              My Campaigns ({myCampaigns.length})
            </TabsTrigger>
            <TabsTrigger value="donations" data-testid="tab-donations">
              My Donations ({myDonations.length})
            </TabsTrigger>
            <TabsTrigger value="posts" data-testid="tab-posts">
              My Posts ({myPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            {loadingCampaigns ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : myCampaigns.length === 0 ? (
              <Card className="p-12 text-center">
                <Sprout className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
                <p className="text-muted-foreground">Create your first campaign to start making an impact!</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {myCampaigns.map((campaign) => (
                  <Card key={campaign.id} data-testid={`card-my-campaign-${campaign.id}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="font-serif">{campaign.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Created {formatDistanceToNow(new Date(campaign.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <Badge variant={campaign.network === "mainnet" ? "default" : "secondary"}>
                          {campaign.network}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm">
                        <span className="text-primary font-medium">
                          {campaign.raised.toLocaleString()} cUSD raised
                        </span>
                        <span className="text-muted-foreground">
                          of {campaign.goal.toLocaleString()} cUSD
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="donations">
            {loadingDonations ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : myDonations.length === 0 ? (
              <Card className="p-12 text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No donations yet</h3>
                <p className="text-muted-foreground">Support a campaign to grow the community!</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {myDonations.map((donation) => (
                  <Card key={donation.id} data-testid={`card-my-donation-${donation.id}`}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-primary">
                            {donation.amount} cUSD donated
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatDistanceToNow(new Date(donation.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={`https://explorer.celo.org/tx/${donation.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="posts">
            {loadingPosts ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : myPosts.length === 0 ? (
              <Card className="p-12 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground">Share your story with the community!</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {myPosts.map((post) => (
                  <Card key={post.id} data-testid={`card-my-post-${post.id}`}>
                    <CardContent className="pt-6">
                      <p className="mb-2">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{post.likes} likes</span>
                        <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
