import { z } from "zod";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  beneficiaryAddress: string;
  creatorAddress: string;
  imageUrl: string | null;
  network: "mainnet" | "testnet";
  createdAt: Date;
}

export interface Donation {
  id: string;
  campaignId: string;
  donorAddress: string;
  amount: number;
  txHash: string;
  network: "mainnet" | "testnet";
  createdAt: Date;
}

export interface SocialPost {
  id: string;
  authorAddress: string;
  content: string;
  imageUrl: string | null;
  likes: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  authorAddress: string;
  content: string;
  createdAt: Date;
}

export interface Like {
  id: string;
  postId: string;
  userAddress: string;
  createdAt: Date;
}

export const insertCampaignSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  goal: z.number().positive(),
  beneficiaryAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  creatorAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  network: z.enum(["mainnet", "testnet"]),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export const insertDonationSchema = z.object({
  campaignId: z.string(),
  donorAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  amount: z.number().positive(),
  txHash: z.string().min(1),
  network: z.enum(["mainnet", "testnet"]),
});

export const insertSocialPostSchema = z.object({
  authorAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  content: z.string().min(1).max(1000),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export const insertCommentSchema = z.object({
  postId: z.string(),
  authorAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  content: z.string().min(1).max(500),
});

export const insertLikeSchema = z.object({
  postId: z.string(),
  userAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
});

export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type InsertSocialPost = z.infer<typeof insertSocialPostSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type InsertLike = z.infer<typeof insertLikeSchema>;

export type SocialPostWithDetails = SocialPost & {
  comments: Comment[];
  userHasLiked?: boolean;
};

export type CampaignWithDonations = Campaign & {
  donations: Donation[];
};
