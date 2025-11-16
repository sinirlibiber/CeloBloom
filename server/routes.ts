import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertCampaignSchema,
  insertDonationSchema,
  insertSocialPostSchema,
  insertCommentSchema,
  insertLikeSchema,
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      res.json(campaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  });

  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.getCampaign(req.params.id);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      const donations = await storage.getDonationsByCampaign(campaign.id);
      res.json({ ...campaign, donations });
    } catch (error) {
      console.error("Error fetching campaign:", error);
      res.status(500).json({ error: "Failed to fetch campaign" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const validatedData = insertCampaignSchema.parse(req.body);
      const campaign = await storage.createCampaign(validatedData);
      res.status(201).json(campaign);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error creating campaign:", error);
      res.status(500).json({ error: "Failed to create campaign" });
    }
  });

  app.get("/api/donations", async (req, res) => {
    try {
      const donations = await storage.getDonations();
      res.json(donations);
    } catch (error) {
      console.error("Error fetching donations:", error);
      res.status(500).json({ error: "Failed to fetch donations" });
    }
  });

  app.get("/api/donations/campaign/:campaignId", async (req, res) => {
    try {
      const donations = await storage.getDonationsByCampaign(req.params.campaignId);
      res.json(donations);
    } catch (error) {
      console.error("Error fetching campaign donations:", error);
      res.status(500).json({ error: "Failed to fetch donations" });
    }
  });

  app.get("/api/donations/donor/:donorAddress", async (req, res) => {
    try {
      const donations = await storage.getDonationsByDonor(req.params.donorAddress);
      res.json(donations);
    } catch (error) {
      console.error("Error fetching donor donations:", error);
      res.status(500).json({ error: "Failed to fetch donations" });
    }
  });

  app.post("/api/donations", async (req, res) => {
    try {
      const validatedData = insertDonationSchema.parse(req.body);
      
      const campaign = await storage.getCampaign(validatedData.campaignId);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      
      const donation = await storage.createDonation(validatedData);
      res.status(201).json(donation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error creating donation:", error);
      res.status(500).json({ error: "Failed to create donation" });
    }
  });

  app.get("/api/social/posts", async (req, res) => {
    try {
      const posts = await storage.getSocialPosts();
      const userAddress = req.query.userAddress as string | undefined;
      
      if (userAddress) {
        const postsWithUserLikes = await Promise.all(
          posts.map(async (post) => {
            const userLike = await storage.getUserLike(post.id, userAddress);
            return {
              ...post,
              userHasLiked: !!userLike,
            };
          })
        );
        return res.json(postsWithUserLikes);
      }
      
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/social/posts/:id", async (req, res) => {
    try {
      const post = await storage.getSocialPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      const comments = await storage.getCommentsByPost(post.id);
      res.json({ ...post, comments });
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.get("/api/social/posts/author/:authorAddress", async (req, res) => {
    try {
      const posts = await storage.getSocialPostsByAuthor(req.params.authorAddress);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching author posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.post("/api/social/posts", async (req, res) => {
    try {
      const validatedData = insertSocialPostSchema.parse(req.body);
      const post = await storage.createSocialPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.get("/api/social/comments/:postId", async (req, res) => {
    try {
      const comments = await storage.getCommentsByPost(req.params.postId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  app.post("/api/social/comments", async (req, res) => {
    try {
      const validatedData = insertCommentSchema.parse(req.body);
      
      const post = await storage.getSocialPost(validatedData.postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      const comment = await storage.createComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  });

  app.post("/api/social/likes", async (req, res) => {
    try {
      const validatedData = insertLikeSchema.parse(req.body);
      
      const post = await storage.getSocialPost(validatedData.postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      
      const existingLike = await storage.getUserLike(
        validatedData.postId,
        validatedData.userAddress
      );
      
      if (existingLike) {
        await storage.deleteLike(validatedData.postId, validatedData.userAddress);
        return res.json({ liked: false, likes: post.likes - 1 });
      }
      
      const like = await storage.createLike(validatedData);
      res.status(201).json({ liked: true, likes: post.likes + 1 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      console.error("Error toggling like:", error);
      res.status(500).json({ error: "Failed to toggle like" });
    }
  });

  app.delete("/api/social/likes/:postId/:userAddress", async (req, res) => {
    try {
      const { postId, userAddress } = req.params;
      await storage.deleteLike(postId, userAddress);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting like:", error);
      res.status(500).json({ error: "Failed to delete like" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
