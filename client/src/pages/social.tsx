import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SocialPostWithDetails, InsertSocialPost, InsertComment, InsertLike } from "@shared/schema";
import { SocialPostCard } from "@/components/social-post-card";
import { SocialPostForm } from "@/components/social-post-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Plus, Wallet, MessageCircle } from "lucide-react";
import { useAccount } from "wagmi";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function Social() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const { open } = useWeb3Modal();

  const { data: posts = [], isLoading } = useQuery<SocialPostWithDetails[]>({
    queryKey: ["/api/social/posts"],
  });

  const createPost = useMutation({
    mutationFn: async (post: InsertSocialPost) => {
      return await apiRequest("POST", "/api/social/posts", post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social/posts"] });
      toast({
        title: "Post Shared!",
        description: "Your content is now blooming in the community feed!",
      });
      setShowCreateForm(false);
    },
  });

  const likePost = useMutation({
    mutationFn: async (data: InsertLike) => {
      return await apiRequest("POST", "/api/social/likes", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social/posts"] });
    },
  });

  const commentOnPost = useMutation({
    mutationFn: async (comment: InsertComment) => {
      return await apiRequest("POST", "/api/social/comments", comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social/posts"] });
      toast({
        title: "Comment Added!",
        description: "Your thoughts have been shared with the community.",
      });
    },
  });

  const handleCreatePost = (data: InsertSocialPost) => {
    createPost.mutate(data);
  };

  const handleLike = (postId: string) => {
    if (!address) {
      open();
      return;
    }
    likePost.mutate({ postId, userAddress: address });
  };

  const handleComment = (postId: string, content: string) => {
    if (!address) {
      open();
      return;
    }
    commentOnPost.mutate({ postId, authorAddress: address, content });
  };

  return (
    <div className="min-h-screen bg-accent/10">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-3">
            Community Feed
          </h1>
          <p className="text-muted-foreground italic">
            Every donation a leaf, every post a petal
          </p>
        </div>

        {isConnected ? (
          <div className="mb-8">
            {!showCreateForm ? (
              <Card className="p-6 hover-elevate cursor-pointer" onClick={() => setShowCreateForm(true)}>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Plus className="h-5 w-5" />
                  <span>Share your impact, inspire the community...</span>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                <SocialPostForm
                  onSubmit={handleCreatePost}
                  authorAddress={address!}
                  isPending={createPost.isPending}
                />
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        ) : (
          <Card className="p-8 text-center mb-8">
            <p className="text-muted-foreground mb-4">
              Connect your wallet to share and engage with the community
            </p>
            <Button onClick={() => open()}>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </Card>
        )}

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground">
              Be the first to share your story and inspire the community!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <SocialPostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                userAddress={address}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
