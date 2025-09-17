/**
 * Zustand store for the Opus Clip application
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Project
} from './types';
import * as db from './db';
import { delay } from './utils';

// Projects Slice
interface ProjectsState {
  entities: Record<string, Project>;
  ids: string[];
  loading: boolean;
  error: string | null;
}

interface ProjectsActions {
  fetchProjects: () => Promise<void>;
  createProject: (input: Partial<Project>) => Promise<Project>;
  updateProject: (id: string, patch: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  refreshProjects: () => Promise<void>;
}

const initialProjectsState: ProjectsState = {
  entities: {},
  ids: [],
  loading: false,
  error: null
};

const createProjectsSlice = (
  set: (partial: Partial<AppState> | ((state: AppState) => Partial<AppState>)) => void,
  get: () => AppState
): ProjectsState & ProjectsActions => ({
  ...initialProjectsState,
  fetchProjects: async () => {
    const state = get();
    // Prevent multiple simultaneous fetches
    if (state.loading) return;
    
    set({ loading: true, error: null });
    try {
      const projects = await db.listProjects();
      const entities = projects.reduce((acc, project) => {
        acc[project.id] = project;
        return acc;
      }, {} as Record<string, Project>);
      
      set({ 
        entities, 
        ids: projects.map(p => p.id),
        loading: false 
      });
    } catch (error: unknown) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch projects' 
      });
    }
  },
  createProject: async (input) => {
    try {
      const project = await db.createProject(input);
      
      set((state: any) => ({
        entities: { ...state.entities, [project.id]: project },
        ids: [project.id, ...state.ids]
      }));
      
      return project;
    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : 'Failed to create project' });
      throw error;
    }
  },
  updateProject: async (id, patch) => {
    try {
      await db.updateProject(id, patch);
      
      set((state: any) => ({
        entities: {
          ...state.entities,
          [id]: { ...state.entities[id], ...patch }
        }
      }));
    } catch (error: unknown) {
      set({ error: error instanceof Error ? error.message : 'Failed to update project' });
      throw error;
    }
  },
  deleteProject: async (id) => {
    // In a real app, we would delete from the database
    set((state) => ({
      entities: Object.fromEntries(
        Object.entries(state.entities).filter(([key]) => key !== id)
      ) as Record<string, Project>,
      ids: state.ids.filter((i) => i !== id)
    }));
  },
  refreshProjects: async () => {
    // Re-fetch all projects
    // This would call fetchProjects if we had a reference to it
    console.log('Refresh projects called');
  }
});

// Editor Slice
interface EditorState {
  activeProjectId: string | null;
  currentTime: number;
  duration: number;
  playing: boolean;
  selectedClipId: string | null;
  captionsVisible: boolean;
  reframeEnabled: boolean;
  aspect: '9:16' | '1:1' | '16:9';
  selectionStart: number | null;
  selectionEnd: number | null;
  keyboardShortcutsEnabled: boolean;
  lastSavedAt: Date | null;
}

interface EditorActions {
  setActiveProject: (id: string | null) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  selectClip: (id: string | null) => void;
  toggleCaptions: () => void;
  toggleReframe: () => void;
  setAspect: (aspect: '9:16' | '1:1' | '16:9') => void;
  setSelectionStart: (time: number | null) => void;
  setSelectionEnd: (time: number | null) => void;
  clearSelection: () => void;
  splitAtPlayhead: () => void;
  markIn: () => void;
  markOut: () => void;
  saveProject: () => Promise<void>;
  toggleKeyboardShortcuts: () => void;
}

const initialEditorState: EditorState = {
  activeProjectId: null,
  currentTime: 0,
  duration: 0,
  playing: false,
  selectedClipId: null,
  captionsVisible: true,
  reframeEnabled: false,
  aspect: '9:16',
  selectionStart: null,
  selectionEnd: null,
  keyboardShortcutsEnabled: true,
  lastSavedAt: null
};

const createEditorSlice = (
  set: (partial: Partial<AppState> | ((state: AppState) => Partial<AppState>)) => void
): EditorState & EditorActions => ({
  ...initialEditorState,
  setActiveProject: (id) => set({ activeProjectId: id }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  play: () => set({ playing: true }),
  pause: () => set({ playing: false }),
  togglePlay: () => set((state) => ({ playing: !state.playing })),
  selectClip: (id) => set({ selectedClipId: id }),
  toggleCaptions: () => set((state) => ({ captionsVisible: !state.captionsVisible })),
  toggleReframe: () => set((state) => ({ reframeEnabled: !state.reframeEnabled })),
  setAspect: (aspect) => set({ aspect }),
  setSelectionStart: (time) => set({ selectionStart: time }),
  setSelectionEnd: (time) => set({ selectionEnd: time }),
  clearSelection: () => set({ selectionStart: null, selectionEnd: null }),
  splitAtPlayhead: () => {
    // Implementation would go here
    console.log('Split at playhead');
  },
  markIn: () => set((state) => ({ selectionStart: state.currentTime })),
  markOut: () => set((state) => ({ selectionEnd: state.currentTime })),
  saveProject: async () => {
    // Simulate saving
    await delay(500);
    set({ lastSavedAt: new Date() });
  },
  toggleKeyboardShortcuts: () => set((state) => ({ 
    keyboardShortcutsEnabled: !state.keyboardShortcutsEnabled 
  }))
});

// Main Store
type AppState = 
  ProjectsState & 
  ProjectsActions & 
  EditorState & 
  EditorActions;

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...createProjectsSlice(set, get),
      ...createEditorSlice(set)
    }),
    {
      name: 'opus-clip-storage',
      partialize: (state) => ({
        aspect: state.aspect,
        captionsVisible: state.captionsVisible,
        reframeEnabled: state.reframeEnabled
      })
    }
  )
);