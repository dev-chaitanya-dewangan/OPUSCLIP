/**
 * Deterministic seed data for the Opus Clip application
 */

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

// User Profile
export const userProfile: UserProfile = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'creator',
  preferredAspectRatio: '9:16',
  createdAt: new Date('2023-01-15'),
  updatedAt: new Date('2023-06-20')
};

// Social Accounts
export const socialAccounts: SocialAccount[] = [
  {
    id: 'social-1',
    platform: 'youtube',
    username: 'alexjohnson',
    connected: true,
    profileUrl: 'https://youtube.com/@alexjohnson'
  },
  {
    id: 'social-2',
    platform: 'tiktok',
    username: 'alexjohnson',
    connected: false
  },
  {
    id: 'social-3',
    platform: 'instagram',
    username: 'alexjohnson',
    connected: true,
    profileUrl: 'https://instagram.com/alexjohnson'
  }
];

// Logos
export const logos: Logo[] = [
  {
    id: 'logo-1',
    name: 'Company A',
    src: '/images/logo-a.png'
  },
  {
    id: 'logo-2',
    name: 'Company B',
    src: '/images/logo-b.png'
  },
  {
    id: 'logo-3',
    name: 'Company C',
    src: '/images/logo-c.png'
  },
  {
    id: 'logo-4',
    name: 'Company D',
    src: '/images/logo-d.png'
  },
  {
    id: 'logo-5',
    name: 'Company E',
    src: '/images/logo-e.png'
  }
];

// Feature Cards
export const featureCards: FeatureCard[] = [
  {
    id: 'feature-1',
    title: 'AI Models',
    description: 'Leverage cutting-edge AI to enhance your video content automatically',
    icon: '🤖'
  },
  {
    id: 'feature-2',
    title: 'Clip Anything',
    description: 'Transform long videos into engaging clips with one click',
    icon: '✂️'
  },
  {
    id: 'feature-3',
    title: 'Reframe Anything',
    description: 'Automatically reframe your content for different aspect ratios',
    icon: '📱'
  }
];

// Workflow Items
export const workflowItems: WorkflowItem[] = [
  {
    id: 'workflow-1',
    title: 'Auto Import',
    description: 'Connect your video sources for automatic importing',
    icon: '📥',
    completed: true
  },
  {
    id: 'workflow-2',
    title: 'Auto Edit',
    description: 'Let AI create engaging clips from your content',
    icon: '✂️',
    completed: true
  },
  {
    id: 'workflow-3',
    title: 'Auto Scheduling',
    description: 'Schedule your content across platforms',
    icon: '🗓️',
    completed: false
  }
];

// Plans
export const plans: Plan[] = [
  {
    id: 'plan-1',
    name: 'Overlap Pro',
    description: 'Perfect for individual creators',
    price: {
      monthly: 29,
      annual: 290 // 29 * 10 months = 20% discount
    },
    features: [
      '100 video minutes/month',
      'AI-powered editing',
      'Auto-captioning',
      'Export in 1080p',
      'Basic analytics'
    ],
    isRecommended: false,
    isTrial: true,
    trialDays: 7
  },
  {
    id: 'plan-2',
    name: 'Overlap Team',
    description: 'For growing teams and agencies',
    price: {
      monthly: 99,
      annual: 990 // 99 * 10 months = 20% discount
    },
    features: [
      '1000 video minutes/month',
      'All Pro features',
      'Team collaboration',
      'Export in 4K',
      'Advanced analytics',
      'Priority support'
    ],
    isRecommended: true,
    isTrial: true,
    trialDays: 14
  }
];

// Projects
export const projects: Project[] = [
  {
    id: 'project-1',
    slug: 'lex-408',
    title: 'Demo project: Lex #408',
    description: 'Interview with Lex Fridman',
    thumbnail: {
      square: '/images/thumbnail-square-1.png',
      vertical: '/images/thumbnail-vertical-1.png'
    },
    videoSrc: '/videos/sample-1.mp4',
    poster: '/images/poster-1.png',
    duration: 3600, // 1 hour
    points: 1200,
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-15')
  },
  {
    id: 'project-2',
    slug: 'curry-drills',
    title: 'Curry Drills 12 Threes',
    description: 'Basketball training session',
    thumbnail: {
      square: '/images/thumbnail-square-2.png',
      vertical: '/images/thumbnail-vertical-2.png'
    },
    videoSrc: '/videos/sample-2.mp4',
    poster: '/images/poster-2.png',
    duration: 1800, // 30 minutes
    points: 800,
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-01')
  },
  {
    id: 'project-3',
    slug: 'danny-duncan',
    title: 'Interview with Danny Duncan',
    description: 'Skateboarding legend interview',
    thumbnail: {
      square: '/images/thumbnail-square-3.png',
      vertical: '/images/thumbnail-vertical-3.png'
    },
    videoSrc: '/videos/sample-3.mp4',
    poster: '/images/poster-3.png',
    duration: 2700, // 45 minutes
    points: 1000,
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2023-06-10')
  },
  {
    id: 'project-4',
    slug: 'learning-center',
    title: 'Learning center',
    description: 'Educational content series',
    thumbnail: {
      square: '/images/thumbnail-square-4.png',
      vertical: '/images/thumbnail-vertical-4.png'
    },
    videoSrc: '/videos/sample-4.mp4',
    poster: '/images/poster-4.png',
    duration: 1200, // 20 minutes
    points: 600,
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: 'project-5',
    slug: 'tech-review',
    title: 'Latest Tech Review',
    description: 'Gadget reviews and analysis',
    thumbnail: {
      square: '/images/thumbnail-square-5.png',
      vertical: '/images/thumbnail-vertical-5.png'
    },
    videoSrc: '/videos/sample-5.mp4',
    poster: '/images/poster-5.png',
    duration: 2100, // 35 minutes
    points: 900,
    createdAt: new Date('2023-06-18'),
    updatedAt: new Date('2023-06-18')
  },
  {
    id: 'project-6',
    slug: 'cooking-tutorial',
    title: 'Masterclass: Italian Cuisine',
    description: 'Learn to cook authentic Italian dishes',
    thumbnail: {
      square: '/images/thumbnail-square-6.png',
      vertical: '/images/thumbnail-vertical-6.png'
    },
    videoSrc: '/videos/sample-6.mp4',
    poster: '/images/poster-6.png',
    duration: 3000, // 50 minutes
    points: 1100,
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2023-06-20')
  }
];

// Clips
export const clips: Record<string, Clip[]> = {
  'project-1': [
    {
      id: 'clip-1-1',
      projectId: 'project-1',
      title: 'Introduction',
      start: 0,
      end: 120
    },
    {
      id: 'clip-1-2',
      projectId: 'project-1',
      title: 'AI and Consciousness',
      start: 120,
      end: 600
    },
    {
      id: 'clip-1-3',
      projectId: 'project-1',
      title: 'The Future of Robotics',
      start: 600,
      end: 1200
    },
    {
      id: 'clip-1-4',
      projectId: 'project-1',
      title: 'Neural Networks Explained',
      start: 1200,
      end: 1800
    },
    {
      id: 'clip-1-5',
      projectId: 'project-1',
      title: 'Ethics in AI',
      start: 1800,
      end: 2400
    },
    {
      id: 'clip-1-6',
      projectId: 'project-1',
      title: 'Closing Thoughts',
      start: 2400,
      end: 3600
    }
  ],
  'project-2': [
    {
      id: 'clip-2-1',
      projectId: 'project-2',
      title: 'Warm-up Drills',
      start: 0,
      end: 300
    },
    {
      id: 'clip-2-2',
      projectId: 'project-2',
      title: 'Ball Handling',
      start: 300,
      end: 600
    },
    {
      id: 'clip-2-3',
      projectId: 'project-2',
      title: 'Shooting Form',
      start: 600,
      end: 900
    },
    {
      id: 'clip-2-4',
      projectId: 'project-2',
      title: 'Three-Point Practice',
      start: 900,
      end: 1500
    },
    {
      id: 'clip-2-5',
      projectId: 'project-2',
      title: 'Cool Down',
      start: 1500,
      end: 1800
    }
  ],
  'project-3': [
    {
      id: 'clip-3-1',
      projectId: 'project-3',
      title: 'Early Life',
      start: 0,
      end: 300
    },
    {
      id: 'clip-3-2',
      projectId: 'project-3',
      title: 'Rise to Fame',
      start: 300,
      end: 900
    },
    {
      id: 'clip-3-3',
      projectId: 'project-3',
      title: 'Signature Tricks',
      start: 900,
      end: 1500
    },
    {
      id: 'clip-3-4',
      projectId: 'project-3',
      title: 'Life Philosophy',
      start: 1500,
      end: 2100
    },
    {
      id: 'clip-3-5',
      projectId: 'project-3',
      title: 'Future Goals',
      start: 2100,
      end: 2700
    }
  ],
  'project-4': [
    {
      id: 'clip-4-1',
      projectId: 'project-4',
      title: 'Welcome',
      start: 0,
      end: 120
    },
    {
      id: 'clip-4-2',
      projectId: 'project-4',
      title: 'Basic Concepts',
      start: 120,
      end: 420
    },
    {
      id: 'clip-4-3',
      projectId: 'project-4',
      title: 'Hands-on Demo',
      start: 420,
      end: 840
    },
    {
      id: 'clip-4-4',
      projectId: 'project-4',
      title: 'Advanced Techniques',
      start: 840,
      end: 1200
    }
  ],
  'project-5': [
    {
      id: 'clip-5-1',
      projectId: 'project-5',
      title: 'Product Overview',
      start: 0,
      end: 300
    },
    {
      id: 'clip-5-2',
      projectId: 'project-5',
      title: 'Unboxing',
      start: 300,
      end: 600
    },
    {
      id: 'clip-5-3',
      projectId: 'project-5',
      title: 'Performance Tests',
      start: 600,
      end: 1200
    },
    {
      id: 'clip-5-4',
      projectId: 'project-5',
      title: 'Pros and Cons',
      start: 1200,
      end: 1650
    },
    {
      id: 'clip-5-5',
      projectId: 'project-5',
      title: 'Final Verdict',
      start: 1650,
      end: 2100
    }
  ],
  'project-6': [
    {
      id: 'clip-6-1',
      projectId: 'project-6',
      title: 'Ingredients',
      start: 0,
      end: 300
    },
    {
      id: 'clip-6-2',
      projectId: 'project-6',
      title: 'Pasta Making',
      start: 300,
      end: 900
    },
    {
      id: 'clip-6-3',
      projectId: 'project-6',
      title: 'Sauce Preparation',
      start: 900,
      end: 1500
    },
    {
      id: 'clip-6-4',
      projectId: 'project-6',
      title: 'Cooking Techniques',
      start: 1500,
      end: 2400
    },
    {
      id: 'clip-6-5',
      projectId: 'project-6',
      title: 'Plating and Serving',
      start: 2400,
      end: 3000
    }
  ]
};

// Caption Blocks
export const captionBlocks: Record<string, CaptionBlock[]> = {
  'clip-1-1': [
    {
      id: 'caption-1-1-1',
      clipId: 'clip-1-1',
      start: 0,
      end: 30,
      text: 'Welcome to another episode of the Lex Fridman Podcast'
    },
    {
      id: 'caption-1-1-2',
      clipId: 'clip-1-1',
      start: 30,
      end: 60,
      text: 'Today we have a fascinating guest who has made significant contributions'
    },
    {
      id: 'caption-1-1-3',
      clipId: 'clip-1-1',
      start: 60,
      end: 90,
      text: 'to the field of artificial intelligence and robotics'
    },
    {
      id: 'caption-1-1-4',
      clipId: 'clip-1-1',
      start: 90,
      end: 120,
      text: 'Please welcome our guest for today'
    }
  ],
  'clip-2-1': [
    {
      id: 'caption-2-1-1',
      clipId: 'clip-2-1',
      start: 0,
      end: 60,
      text: 'Before we start with the intense drills, lets do a proper warm-up'
    },
    {
      id: 'caption-2-1-2',
      clipId: 'clip-2-1',
      start: 60,
      end: 120,
      text: 'This will help prevent injuries and prepare your muscles'
    },
    {
      id: 'caption-2-1-3',
      clipId: 'clip-2-1',
      start: 120,
      end: 180,
      text: 'We will do 5 minutes of light jogging followed by stretching'
    },
    {
      id: 'caption-2-1-4',
      clipId: 'clip-2-1',
      start: 180,
      end: 240,
      text: 'Focus on your breathing and keeping a steady pace'
    },
    {
      id: 'caption-2-1-5',
      clipId: 'clip-2-1',
      start: 240,
      end: 300,
      text: 'Remember, warming up is just as important as the main workout'
    }
  ]
};

// Timeline Segments
export const timelineSegments: Record<string, TimelineSegment[]> = {
  'project-1': [
    {
      id: 'segment-1-1',
      projectId: 'project-1',
      start: 0,
      end: 120,
      type: 'clip',
      clipId: 'clip-1-1'
    },
    {
      id: 'segment-1-2',
      projectId: 'project-1',
      start: 120,
      end: 600,
      type: 'clip',
      clipId: 'clip-1-2'
    },
    {
      id: 'segment-1-3',
      projectId: 'project-1',
      start: 600,
      end: 1200,
      type: 'clip',
      clipId: 'clip-1-3'
    }
  ],
  'project-2': [
    {
      id: 'segment-2-1',
      projectId: 'project-2',
      start: 0,
      end: 300,
      type: 'clip',
      clipId: 'clip-2-1'
    },
    {
      id: 'segment-2-2',
      projectId: 'project-2',
      start: 300,
      end: 600,
      type: 'clip',
      clipId: 'clip-2-2'
    },
    {
      id: 'segment-2-3',
      projectId: 'project-2',
      start: 600,
      end: 900,
      type: 'clip',
      clipId: 'clip-2-3'
    }
  ]
};

// Export all fixtures as a single object
export const fixtures = {
  userProfile,
  socialAccounts,
  logos,
  featureCards,
  workflowItems,
  plans,
  projects,
  clips,
  captionBlocks,
  timelineSegments
};