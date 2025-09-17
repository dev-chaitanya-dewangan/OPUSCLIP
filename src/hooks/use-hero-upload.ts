/**
 * Hook for handling marketing hero upload functionality
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/lib/store';
import { uid } from '@/lib/utils';
import { logEvent } from '@/lib/analytics';

interface UploadOptions {
  url?: string;
  file?: File;
}

export function useHeroUpload() {
  const router = useRouter();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const createProject = useStore((state) => state.createProject);
  
  const handleUpload = async ({ url, file }: UploadOptions): Promise<void> => {
    setIsUploading(true);
    
    try {
      logEvent('hero_upload_start', { type: url ? 'url' : 'file' });
      
      // Show uploading toast
      const uploadingToast = toast({
        title: 'Uploading...',
        description: 'Processing your video',
        duration: Infinity
      });
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dismiss uploading toast
      uploadingToast.dismiss();
      
      // Create a new project
      const projectId = uid('project');
      const project = await createProject({
        id: projectId,
        slug: `project-${Date.now()}`,
        title: file?.name || 'Uploaded Video',
        description: url || 'Uploaded video file',
        duration: Math.floor(Math.random() * 3000) + 600, // 10-50 minutes
        points: Math.floor(Math.random() * 1000) + 500 // 500-1500 points
      });
      
      logEvent('hero_upload_success', { projectId: project.id });
      
      // Show success toast
      toast({
        title: 'Upload successful!',
        description: 'Your project has been created',
        duration: 3000
      });
      
      // Navigate to editor
      router.push(`/editor/${project.id}`);
    } catch (error: unknown) {
      logEvent('hero_upload_error', { error: error instanceof Error ? error.message : 'Unknown error' });
      
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Failed to process your video',
        variant: 'destructive',
        duration: 5000
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return {
    isUploading,
    handleUpload
  };
}