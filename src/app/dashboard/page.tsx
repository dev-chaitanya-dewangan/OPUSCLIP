'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Upload, Film, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectCard } from '@/components/project-card';
import { HeroUpload } from '@/components/hero-upload';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/components/toast-context';
import { useStore } from '@/lib/store';

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { entities, ids, loading, error, fetchProjects } = useStore();
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async () => {
    try {
      // In a real app, this would call an API
      toast({
        title: 'Project Created',
        description: 'Your new project has been created successfully.',
      });
      router.push('/editor');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create project. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={() => setShowUpload(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Video
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowUpload(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Video
          </Button>
          <Button onClick={handleCreateProject}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
      
      {error && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-destructive text-center">
              Error loading projects: {error}
            </div>
          </CardContent>
        </Card>
      )}
      
      {ids.length === 0 ? (
        <div className="text-center py-12">
          <Film className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-6">
            Get started by creating your first video project.
          </p>
          <div className="flex justify-center gap-2">
            <Button onClick={() => setShowUpload(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Video
            </Button>
            <Button onClick={handleCreateProject}>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ids.map(id => (
            <ProjectCard key={id} project={entities[id]} />
          ))}
        </div>
      )}
      
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <HeroUpload />
        </DialogContent>
      </Dialog>
    </div>
  );
}