'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { logEvent, usePageView } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { timecode } from '@/lib/utils';
import { useEditorShortcuts } from '@/hooks/use-editor-shortcuts';
import { Play, Pause, Square, Scissors, Download, Home, Video, BarChart3, FileText, DollarSign, Image as ImageIcon } from 'lucide-react';
import { Project, Clip } from '@/lib/types';
import { ExpandableTabs } from '@/components/expandable-tabs';
import { useTransitionRouter } from '@/hooks/use-transition-router';

export default function EditorPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  const {
    currentTime,
    duration,
    playing,
    captionsVisible,
    reframeEnabled,
    aspect,
    setActiveProject,
    setCurrentTime,
    setDuration,
    play,
    pause,
    toggleCaptions,
    toggleReframe,
    setAspect
  } = useStore(state => ({
    currentTime: state.currentTime,
    duration: state.duration,
    playing: state.playing,
    captionsVisible: state.captionsVisible,
    reframeEnabled: state.reframeEnabled,
    aspect: state.aspect,
    setActiveProject: state.setActiveProject,
    setCurrentTime: state.setCurrentTime,
    setDuration: state.setDuration,
    play: state.play,
    pause: state.pause,
    toggleCaptions: state.toggleCaptions,
    toggleReframe: state.toggleReframe,
    setAspect: state.setAspect
  }));
  
  const [project, setProject] = useState<Project | null>(null);
  const [clips, setClips] = useState<Clip[]>([]);
  
  usePageView('editor');
  useEditorShortcuts();
  
  useEffect(() => {
    // Set active project
    if (projectId) {
      setActiveProject(projectId);
      
      // In a real app, we would fetch project data from the database
      // For now, we'll simulate with mock data
      const mockProject: Project = {
        id: projectId,
        slug: projectId,
        title: 'Sample Project',
        duration: 1800, // 30 minutes
        points: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        thumbnail: {
          square: '/images/placeholder-square.png',
          vertical: '/images/placeholder-vertical.png'
        }
      };
      
      setProject(mockProject);
      setDuration(mockProject.duration);
      
      // Mock clips data
      const mockClips: Clip[] = [
        { id: 'clip-1', projectId: projectId, start: 0, end: 300, title: 'Introduction' },
        { id: 'clip-2', projectId: projectId, start: 300, end: 600, title: 'Main Content' },
        { id: 'clip-3', projectId: projectId, start: 600, end: 900, title: 'Conclusion' }
      ];
      
      setClips(mockClips);
    }
    
    return () => {
      setActiveProject(null);
    };
  }, [projectId]); // eslint-disable-next-line react-hooks/exhaustive-deps
    // Intentionally excluding setActiveProject and setDuration to prevent infinite re-renders
  
  const handlePlayPause = () => {
    if (playing) {
      pause();
      logEvent('editor_pause');
    } else {
      play();
      logEvent('editor_play');
    }
  };
  
  const handleSeek = (time: number) => {
    setCurrentTime(time);
    logEvent('editor_seek', { time });
  };
  
  const handleExport = () => {
    logEvent('editor_export');
    // Implementation would go here
  };
  
  const handleSplit = () => {
    logEvent('editor_split');
    // Implementation would go here
  };
  
  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p>Loading editor...</p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar with Navigation */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">{project.title}</h1>
          <div className="text-sm text-muted-foreground">
            {timecode(currentTime)} / {timecode(duration)}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="captions-toggle">Captions</Label>
            <Switch
              id="captions-toggle"
              checked={captionsVisible}
              onCheckedChange={toggleCaptions}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="reframe-toggle">Reframe</Label>
            <Switch
              id="reframe-toggle"
              checked={reframeEnabled}
              onCheckedChange={toggleReframe}
            />
          </div>
          
          <Select value={aspect} onValueChange={setAspect}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9:16">9:16 Vertical</SelectItem>
              <SelectItem value="1:1">1:1 Square</SelectItem>
              <SelectItem value="16:9">16:9 Horizontal</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <div className="w-full py-3 bg-background/50 backdrop-blur-[2px] relative border-b border-accent/10">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary" />
            <span className="font-bold text-xl">OpusClip</span>
          </div>
          <ExpandableTabs
            tabs={[
              { title: "Home", icon: Home, href: "/" },
              { title: "Videos", icon: Video, href: "/dashboard" },
              { title: "Analytics", icon: BarChart3, href: "/dashboard" },
              { title: "Reports", icon: FileText, href: "/dashboard" },
              { type: "separator" },
              { title: "Pricing", icon: DollarSign, href: "/pricing" },
              { title: "Gallery", icon: ImageIcon, href: "/dashboard" },
            ]}
            activeColor="text-accent"
            className="rounded-xl p-1"
          />
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-accent font-mono">
              Sign In
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-accent font-mono">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Video Preview - Left Panel */}
        <div className="w-2/3 p-4 border-r">
          <div className="relative bg-black rounded-lg h-full flex items-center justify-center">
            <Image 
              src={project.thumbnail.vertical} 
              alt="Video preview" 
              className="max-h-full max-w-full object-contain"
              width={400}
              height={600}
            />
            
            {captionsVisible && (
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="inline-block bg-black/70 text-white px-4 py-2 rounded">
                  Sample caption text at {timecode(currentTime)}
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center">
              <Button 
                size="icon" 
                className="h-16 w-16 rounded-full bg-black/50 hover:bg-black/70"
                onClick={handlePlayPause}
              >
                {playing ? (
                  <Pause className="h-8 w-8 text-white" />
                ) : (
                  <Play className="h-8 w-8 text-white ml-1" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Timeline - Right Panel */}
        <div className="w-1/3 flex flex-col border-l">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Timeline</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={handleSplit}>
                  <Scissors className="h-4 w-4 mr-1" />
                  Split
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              {clips.map((clip) => (
                <div 
                  key={clip.id} 
                  className="p-3 bg-muted rounded cursor-pointer hover:bg-muted/80"
                  onClick={() => handleSeek(clip.start)}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{clip.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {timecode(clip.start)} - {timecode(clip.end)}
                    </span>
                  </div>
                  <div className="mt-1 w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${((clip.end - clip.start) / duration) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <h3 className="font-medium mb-2">Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline">AI Enhance</Button>
              <Button variant="outline">Add Text</Button>
              <Button variant="outline">Add Music</Button>
              <Button variant="outline">Transitions</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Transport Controls */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" onClick={handlePlayPause}>
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-1" />
              )}
            </Button>
            <Button size="icon" variant="outline">
              <Square className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 mx-4">
            <input 
              type="range" 
              min="0" 
              max={duration} 
              value={currentTime} 
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="text-sm font-mono">
            {timecode(currentTime)}
          </div>
        </div>
      </div>
    </div>
  );
}