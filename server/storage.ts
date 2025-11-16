import {
  Campaign,
  InsertCampaign,
  Donation,
  InsertDonation,
  SocialPost,
  InsertSocialPost,
  Comment,
  InsertComment,
  Like,
  InsertLike,
  SocialPostWithDetails,
  CampaignWithDonations,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface PlatformStats {
  totalCampaigns: number;
  totalDonations: number;
  totalRaised: number;
  activeDonors: number;
}

export interface IStorage {
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  getCampaignsByCreator(creatorAddress: string): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaignRaised(id: string, amount: number): Promise<void>;
  
  getDonations(): Promise<Donation[]>;
  getDonationsByCampaign(campaignId: string): Promise<Donation[]>;
  getDonationsByDonor(donorAddress: string): Promise<Donation[]>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  
  getSocialPosts(): Promise<SocialPostWithDetails[]>;
  getSocialPost(id: string): Promise<SocialPost | undefined>;
  getSocialPostsByAuthor(authorAddress: string): Promise<SocialPost[]>;
  createSocialPost(post: InsertSocialPost): Promise<SocialPost>;
  
  getCommentsByPost(postId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  getLikesByPost(postId: string): Promise<Like[]>;
  getUserLike(postId: string, userAddress: string): Promise<Like | undefined>;
  createLike(like: InsertLike): Promise<Like>;
  deleteLike(postId: string, userAddress: string): Promise<void>;
  incrementPostLikes(postId: string): Promise<void>;
  decrementPostLikes(postId: string): Promise<void>;
  
  getStats(): Promise<PlatformStats>;
}

export class MemStorage implements IStorage {
  private campaigns: Map<string, Campaign>;
  private donations: Map<string, Donation>;
  private socialPosts: Map<string, SocialPost>;
  private comments: Map<string, Comment>;
  private likes: Map<string, Like>;

  constructor() {
    this.campaigns = new Map();
    this.donations = new Map();
    this.socialPosts = new Map();
    this.comments = new Map();
    this.likes = new Map();
  }

  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async getCampaignsByCreator(creatorAddress: string): Promise<Campaign[]> {
    return Array.from(this.campaigns.values())
      .filter((c) => c.creatorAddress.toLowerCase() === creatorAddress.toLowerCase())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = randomUUID();
    const campaign: Campaign = {
      id,
      title: insertCampaign.title,
      description: insertCampaign.description,
      goal: insertCampaign.goal,
      beneficiaryAddress: insertCampaign.beneficiaryAddress,
      creatorAddress: insertCampaign.creatorAddress,
      network: insertCampaign.network,
      imageUrl: insertCampaign.imageUrl || null,
      raised: 0,
      createdAt: new Date(),
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaignRaised(id: string, amount: number): Promise<void> {
    const campaign = this.campaigns.get(id);
    if (campaign) {
      campaign.raised += amount;
      this.campaigns.set(id, campaign);
    }
  }

  async getDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getDonationsByCampaign(campaignId: string): Promise<Donation[]> {
    return Array.from(this.donations.values())
      .filter((d) => d.campaignId === campaignId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getDonationsByDonor(donorAddress: string): Promise<Donation[]> {
    return Array.from(this.donations.values())
      .filter((d) => d.donorAddress.toLowerCase() === donorAddress.toLowerCase())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = randomUUID();
    const donation: Donation = {
      id,
      campaignId: insertDonation.campaignId,
      donorAddress: insertDonation.donorAddress,
      amount: insertDonation.amount,
      txHash: insertDonation.txHash,
      network: insertDonation.network,
      createdAt: new Date(),
    };
    this.donations.set(id, donation);
    await this.updateCampaignRaised(donation.campaignId, donation.amount);
    return donation;
  }

  async getSocialPosts(): Promise<SocialPostWithDetails[]> {
    const posts = Array.from(this.socialPosts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    const postsWithDetails: SocialPostWithDetails[] = await Promise.all(
      posts.map(async (post) => {
        const comments = await this.getCommentsByPost(post.id);
        return {
          ...post,
          comments,
          userHasLiked: false,
        };
      })
    );
    
    return postsWithDetails;
  }

  async getSocialPost(id: string): Promise<SocialPost | undefined> {
    return this.socialPosts.get(id);
  }

  async getSocialPostsByAuthor(authorAddress: string): Promise<SocialPost[]> {
    return Array.from(this.socialPosts.values())
      .filter((p) => p.authorAddress.toLowerCase() === authorAddress.toLowerCase())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createSocialPost(insertPost: InsertSocialPost): Promise<SocialPost> {
    const id = randomUUID();
    const post: SocialPost = {
      id,
      authorAddress: insertPost.authorAddress,
      content: insertPost.content,
      imageUrl: insertPost.imageUrl || null,
      likes: 0,
      createdAt: new Date(),
    };
    this.socialPosts.set(id, post);
    return post;
  }

  async getCommentsByPost(postId: string): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter((c) => c.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = {
      id,
      postId: insertComment.postId,
      authorAddress: insertComment.authorAddress,
      content: insertComment.content,
      createdAt: new Date(),
    };
    this.comments.set(id, comment);
    return comment;
  }

  async getLikesByPost(postId: string): Promise<Like[]> {
    return Array.from(this.likes.values()).filter((l) => l.postId === postId);
  }

  async getUserLike(postId: string, userAddress: string): Promise<Like | undefined> {
    return Array.from(this.likes.values()).find(
      (l) => l.postId === postId && l.userAddress.toLowerCase() === userAddress.toLowerCase()
    );
  }

  async createLike(insertLike: InsertLike): Promise<Like> {
    const id = randomUUID();
    const like: Like = {
      id,
      postId: insertLike.postId,
      userAddress: insertLike.userAddress,
      createdAt: new Date(),
    };
    this.likes.set(id, like);
    await this.incrementPostLikes(insertLike.postId);
    return like;
  }

  async deleteLike(postId: string, userAddress: string): Promise<void> {
    const like = await this.getUserLike(postId, userAddress);
    if (like) {
      this.likes.delete(like.id);
      await this.decrementPostLikes(postId);
    }
  }

  async incrementPostLikes(postId: string): Promise<void> {
    const post = this.socialPosts.get(postId);
    if (post) {
      post.likes += 1;
      this.socialPosts.set(postId, post);
    }
  }

  async decrementPostLikes(postId: string): Promise<void> {
    const post = this.socialPosts.get(postId);
    if (post) {
      post.likes = Math.max(0, post.likes - 1);
      this.socialPosts.set(postId, post);
    }
  }

  async getStats(): Promise<PlatformStats> {
    const campaigns = Array.from(this.campaigns.values());
    const donations = Array.from(this.donations.values());
    const uniqueDonors = new Set(donations.map(d => d.donorAddress.toLowerCase()));
    const totalRaised = donations.reduce((sum, donation) => sum + donation.amount, 0);

    return {
      totalCampaigns: campaigns.length,
      totalDonations: donations.length,
      totalRaised,
      activeDonors: uniqueDonors.size,
    };
  }
}

export const storage = new MemStorage();
