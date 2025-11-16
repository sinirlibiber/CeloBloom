import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import { SocialPostWithDetails } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import socialPlaceholder from "@assets/generated_images/Social_post_placeholder_pattern_9866a0f7.png";

interface SocialPostCardProps {
  post: SocialPostWithDetails;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  userAddress?: string;
}

export function SocialPostCard({ post, onLike, onComment, userAddress }: SocialPostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const shortAddress = `${post.authorAddress.slice(0, 6)}...${post.authorAddress.slice(-4)}`;

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText("");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto" data-testid={`card-post-${post.id}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {post.authorAddress.slice(2, 4).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium font-mono text-sm" data-testid={`text-author-${post.id}`}>
              {shortAddress}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </CardHeader>

      {post.imageUrl && (
        <div className="w-full aspect-video bg-accent overflow-hidden">
          <img 
            src={post.imageUrl || socialPlaceholder}
            alt="Post content"
            className="w-full h-full object-cover"
            data-testid={`img-post-${post.id}`}
          />
        </div>
      )}

      <CardContent className="pt-4">
        <p className="whitespace-pre-wrap" data-testid={`text-content-${post.id}`}>
          {post.content}
        </p>
      </CardContent>

      <CardFooter className="flex-col gap-4 items-start">
        <div className="flex items-center gap-4 w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            className={post.userHasLiked ? "text-destructive" : ""}
            data-testid={`button-like-${post.id}`}
          >
            <Heart className={`mr-2 h-4 w-4 ${post.userHasLiked ? "fill-current" : ""}`} />
            {post.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            data-testid={`button-comment-${post.id}`}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {post.comments.length}
          </Button>
        </div>

        {showComments && (
          <div className="w-full space-y-3">
            {post.comments.map((comment) => (
              <div 
                key={comment.id} 
                className="bg-muted/50 rounded-lg p-3"
                data-testid={`comment-${comment.id}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-medium">
                    {comment.authorAddress.slice(0, 6)}...{comment.authorAddress.slice(-4)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}

            {userAddress && (
              <div className="flex gap-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-0 h-10 resize-none"
                  data-testid={`input-comment-${post.id}`}
                />
                <Button 
                  onClick={handleComment} 
                  disabled={!commentText.trim()}
                  data-testid={`button-submit-comment-${post.id}`}
                >
                  Post
                </Button>
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
