'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { timecode } from '@/lib/utils';
import { Play, Calendar } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {  
  const handleClick = () => {
    import('@/hooks/use-transition-router').then(module => {
      const { useTransitionRouter } = module;
      const router = useTransitionRouter();
      router.push(`/editor/${project.id}`);
    });
  };
  
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleClick}>
      <CardHeader className="p-4">
        <div className="relative aspect-video bg-muted rounded-md mb-2 flex items-center justify-center">
          <Play className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {project.description}
        </p>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            {timecode(project.duration)}
          </span>
          <span>{project.points} points</span>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full mt-3"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Edit Project
        </Button>
      </CardContent>
    </Card>
  );
}