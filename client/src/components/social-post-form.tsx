import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSocialPostSchema, InsertSocialPost } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from "lucide-react";

interface SocialPostFormProps {
  onSubmit: (data: InsertSocialPost) => void;
  authorAddress: string;
  isPending?: boolean;
}

export function SocialPostForm({ onSubmit, authorAddress, isPending }: SocialPostFormProps) {
  const form = useForm<InsertSocialPost>({
    resolver: zodResolver(insertSocialPostSchema),
    defaultValues: {
      authorAddress,
      content: "",
    },
  });

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          <span className="font-serif">Grow with your donation, bloom with your share</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's on your mind?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your thoughts, celebrate a donation, or inspire the community..."
                      className="min-h-24 resize-none"
                      {...field}
                      data-testid="input-post-content"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="https://example.com/image.jpg"
                        {...field}
                        data-testid="input-post-image"
                      />
                      <Button type="button" variant="outline" size="icon" data-testid="button-upload-helper">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Add a photo to make your post more engaging
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={isPending}
              data-testid="button-create-post"
            >
              {isPending ? "Posting..." : "Share with Community"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
