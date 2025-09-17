/**
 * In-memory database with localStorage persistence for the Opus Clip application
 */

import { delay, safeLocalStorageGet, safeLocalStorageSet } from './utils';
import {
  UserProfile,
  SocialAccount,
  Logo,
  FeatureCard,
  WorkflowItem,
  Plan,
  Project,
  Clip,
  CaptionBlock,
  TimelineSegment
} from './types';
import { fixtures } from './fixtures';

// Storage keys with versioning
const STORAGE_KEYS = {
  PROFILE: 'oc_profile_v1',
  PROJECTS: 'oc_projects_v1',
  CLIPS: 'oc_clips_v1',
  CAPTIONS: 'oc_captions_v1',
  TIMELINE: 'oc_timeline_v1',
  LAST_SAVED: 'oc_last_saved_v1'
};

// In-memory storage
const db: {
  profile: UserProfile | null;
  projects: Record<string, Project>;
  clips: Record<string, Clip[]>;
  captions: Record<string, CaptionBlock[]>;
  timeline: Record<string, TimelineSegment[]>;
  logos: Logo[];
  features: FeatureCard[];
  workflow: WorkflowItem[];
  plans: Plan[];
  socialAccounts: SocialAccount[];
} = {
  profile: null,
  projects: {},
  clips: {},
  captions: {},
  timeline: {},
  logos: [],
  features: [],
  workflow: [],
  plans: [],
  socialAccounts: []
};

// Initialize database from fixtures or localStorage
export async function initializeDb(): Promise<void> {
  // Simulate network delay
  await delay(100);
  
  // Load from localStorage or use fixtures
  db.profile = safeLocalStorageGet<UserProfile | null>(STORAGE_KEYS.PROFILE, fixtures.userProfile);
  
  const storedProjects = safeLocalStorageGet<Record<string, Project> | null>(STORAGE_KEYS.PROJECTS, null);
  if (storedProjects) {
    db.projects = storedProjects;
  } else {
    // Convert array to record by id
    db.projects = fixtures.projects.reduce((acc, project) => {
      acc[project.id] = project;
      return acc;
    }, {} as Record<string, Project>);
  }
  
  const storedClips = safeLocalStorageGet<Record<string, Clip[]> | null>(STORAGE_KEYS.CLIPS, null);
  if (storedClips) {
    db.clips = storedClips;
  } else {
    db.clips = fixtures.clips;
  }
  
  const storedCaptions = safeLocalStorageGet<Record<string, CaptionBlock[]> | null>(STORAGE_KEYS.CAPTIONS, null);
  if (storedCaptions) {
    db.captions = storedCaptions;
  } else {
    db.captions = fixtures.captionBlocks;
  }
  
  const storedTimeline = safeLocalStorageGet<Record<string, TimelineSegment[]> | null>(STORAGE_KEYS.TIMELINE, null);
  if (storedTimeline) {
    db.timeline = storedTimeline;
  } else {
    db.timeline = fixtures.timelineSegments;
  }
  
  // Static data always comes from fixtures
  db.logos = fixtures.logos;
  db.features = fixtures.featureCards;
  db.workflow = fixtures.workflowItems;
  db.plans = fixtures.plans;
  db.socialAccounts = fixtures.socialAccounts;
}

// Save database to localStorage
function saveToLocalStorage(): void {
  safeLocalStorageSet(STORAGE_KEYS.PROFILE, db.profile);
  safeLocalStorageSet(STORAGE_KEYS.PROJECTS, db.projects);
  safeLocalStorageSet(STORAGE_KEYS.CLIPS, db.clips);
  safeLocalStorageSet(STORAGE_KEYS.CAPTIONS, db.captions);
  safeLocalStorageSet(STORAGE_KEYS.TIMELINE, db.timeline);
  safeLocalStorageSet(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());
}

// Reset database to initial state
export async function resetDb(): Promise<void> {
  // Clear all data
  db.profile = null;
  db.projects = {};
  db.clips = {};
  db.captions = {};
  db.timeline = {};
  
  // Reinitialize with fixtures
  await initializeDb();
  
  // Clear localStorage
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  
  // Save to localStorage
  saveToLocalStorage();
}

// Profile functions
export async function getProfile(): Promise<UserProfile> {
  await delay(50);
  if (!db.profile) {
    throw new Error('User profile not found');
  }
  return db.profile;
}

export async function updateProfile(patch: Partial<UserProfile>): Promise<UserProfile> {
  await delay(100);
  if (!db.profile) {
    throw new Error('User profile not found');
  }
  
  db.profile = {
    ...db.profile,
    ...patch,
    updatedAt: new Date()
  };
  
  saveToLocalStorage();
  return db.profile;
}

// Project functions
export async function listProjects(): Promise<Project[]> {
  await delay(150);
  return Object.values(db.projects).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getProject(id: string): Promise<Project> {
  await delay(50);
  const project = db.projects[id];
  if (!project) {
    throw new Error(`Project with id ${id} not found`);
  }
  return project;
}

export async function createProject(input: Partial<Project>): Promise<Project> {
  await delay(200);
  
  const now = new Date();
  const newProject: Project = {
    id: input.id || `project-${Date.now()}`,
    slug: input.slug || `project-${Date.now()}`,
    title: input.title || 'Untitled Project',
    description: input.description || '',
    thumbnail: input.thumbnail || {
      square: '/images/placeholder-square.png',
      vertical: '/images/placeholder-vertical.png'
    },
    videoSrc: input.videoSrc || '/videos/sample.mp4',
    poster: input.poster || '/images/poster.png',
    duration: input.duration || 600,
    points: input.points || 0,
    createdAt: input.createdAt || now,
    updatedAt: now
  };
  
  db.projects[newProject.id] = newProject;
  
  // Create default clips for the project
  const defaultClips: Clip[] = [];
  const segmentLength = Math.floor(newProject.duration / 5); // 5 default clips
  
  for (let i = 0; i < 5; i++) {
    defaultClips.push({
      id: `clip-${newProject.id}-${i + 1}`,
      projectId: newProject.id,
      title: `Clip ${i + 1}`,
      start: i * segmentLength,
      end: (i + 1) * segmentLength
    });
  }
  
  db.clips[newProject.id] = defaultClips;
  
  // Create default timeline segments
  db.timeline[newProject.id] = defaultClips.map((clip, index) => ({
    id: `segment-${newProject.id}-${index + 1}`,
    projectId: newProject.id,
    start: clip.start,
    end: clip.end,
    type: 'clip',
    clipId: clip.id
  }));
  
  saveToLocalStorage();
  return newProject;
}

export async function updateProject(id: string, patch: Partial<Project>): Promise<Project> {
  await delay(100);
  const project = db.projects[id];
  if (!project) {
    throw new Error(`Project with id ${id} not found`);
  }
  
  db.projects[id] = {
    ...project,
    ...patch,
    updatedAt: new Date()
  };
  
  saveToLocalStorage();
  return db.projects[id];
}

// Clip functions
export async function listClips(projectId: string): Promise<Clip[]> {
  await delay(50);
  return db.clips[projectId] || [];
}

export async function updateClip(projectId: string, clipId: string, patch: Partial<Clip>): Promise<Clip> {
  await delay(100);
  const clips = db.clips[projectId];
  if (!clips) {
    throw new Error(`Clips for project ${projectId} not found`);
  }
  
  const clipIndex = clips.findIndex(c => c.id === clipId);
  if (clipIndex === -1) {
    throw new Error(`Clip with id ${clipId} not found`);
  }
  
  clips[clipIndex] = {
    ...clips[clipIndex],
    ...patch
  };
  
  saveToLocalStorage();
  return clips[clipIndex];
}

// Plan functions
export async function listPlans(): Promise<Plan[]> {
  await delay(50);
  return db.plans;
}

// Logo functions
export async function listLogos(): Promise<Logo[]> {
  await delay(50);
  return db.logos;
}

// Feature functions
export async function listFeatures(): Promise<FeatureCard[]> {
  await delay(50);
  return db.features;
}

// Workflow functions
export async function listWorkflow(): Promise<WorkflowItem[]> {
  await delay(50);
  return db.workflow;
}

// Initialize the database on module load, but only on client side
if (typeof window !== 'undefined') {
  initializeDb();
}