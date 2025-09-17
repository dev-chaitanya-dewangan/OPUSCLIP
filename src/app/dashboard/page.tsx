'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { logEvent, usePageView } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Upload } from 'lucide-react';
import { useHeroUpload } from '@/hooks/use-hero-upload';

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { entities, ids, loading, error, fetchProjects, createProject } = useStore(
    (state) => ({
      entities: state.entities,
      ids: state.ids,
      loading: state.loading,
      error: state.error,
      fetchProjects: state.fetchProjects,
      createProject: state.createProject
    })
  );
  
  const { isUploading, handleUpload } = useHeroUpload();
  
  usePageView('dashboard');
  
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);
  
  const handleNewProject = async () => {
    try {
      logEvent('dashboard_new_project');
      const project = await createProject({
        title: 'New Project',
        description: 'Created from dashboard',
        duration: 1800, // 30 minutes default
        points: 0
      });
      router.push(`/editor/${project.id}`);
    } catch (error: unknown) {
      toast({
        title: 'Failed to create project',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive'
      });
    }
  };
  
  const handleUploadClick = () => {
    logEvent('dashboard_upload_click');
    // In a real implementation, this would open a file dialog
    // For now, we'll simulate with a placeholder
    handleUpload({ url: 'https://example.com/video.mp4' });
  };
  
  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-10 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Error Loading Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={fetchProjects}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={handleUploadClick} disabled={isUploading}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button onClick={handleNewProject}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
      
      {ids.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>No Projects Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Get started by creating your first project.</p>
            <div className="flex gap-2">
              <Button onClick={handleUploadClick} disabled={isUploading}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Video
              </Button>
              <Button onClick={handleNewProject}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ids.map((id) => {
            const project = entities[id];
            return (
              <Card 
                key={project.id} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  logEvent('dashboard_project_card_click', { projectId: project.id });
                  router.push(`/editor/${project.id}`);
                }}
              >
                <div className="relative">
                  <Image 
                    src={project.thumbnail.vertical} 
                    alt={project.title} 
                    className="w-full h-48 object-cover"
                    width={400}
                    height={192}
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {project.points} points
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}