/**
 * Core data types for the Opus Clip application
 */

// User Profile
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'creator' | 'marketer' | 'educator' | 'other';
  preferredAspectRatio: '9:16' | '1:1' | '16:9';
  createdAt: Date;
  updatedAt: Date;
}

// Social Accounts
export interface SocialAccount {
  id: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'twitter' | 'linkedin';
  username: string;
  connected: boolean;
  profileUrl?: string;
}

// Logo
export interface Logo {
  id: string;
  name: string;
  src: string;
  width?: number;
  height?: number;
}

// Feature Card
export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon component name or URL
}

// Workflow Item
export interface WorkflowItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
}

// Plan
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: string[];
  isRecommended?: boolean;
  isTrial?: boolean;
  trialDays?: number;
}

// Project
export interface Project {
  id: string;
  slug: string;
  title: string;
  description?: string;
  thumbnail: {
    square: string;
    vertical: string;
  };
  videoSrc?: string;
  poster?: string;
  duration: number; // in seconds
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

// Clip
export interface Clip {
  id: string;
  projectId: string;
  title: string;
  start: number; // in seconds
  end: number; // in seconds
  thumbnail?: string;
}

// Caption Block
export interface CaptionBlock {
  id: string;
  clipId: string;
  start: number; // in seconds
  end: number; // in seconds
  text: string;
}

// Timeline Segment
export interface TimelineSegment {
  id: string;
  projectId: string;
  start: number; // in seconds
  end: number; // in seconds
  type: 'clip' | 'transition' | 'overlay';
  clipId?: string;
}

// Notification
export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  type: 'info' | 'success' | 'warning' | 'error';
}

// Schedule Item
export interface ScheduleItem {
  id: string;
  projectId: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'twitter' | 'linkedin';
  scheduledAt: Date;
  status: 'scheduled' | 'published' | 'failed';
}