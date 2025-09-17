'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { logEvent, usePageView, useCtaClick } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Zap, 
  Scissors, 
  Smartphone, 
  ArrowRight, 
  Clock
} from 'lucide-react';
import { useHeroUpload } from '@/hooks/use-hero-upload';

export default function HomePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState('');
  
  const { isUploading, handleUpload } = useHeroUpload();
  
  usePageView('home');
  const handleCtaClick = useCtaClick('home_hero_cta');
  
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      logEvent('home_file_upload', { fileName: file.name, fileSize: file.size });
      handleUpload({ file });
    }
  };
  
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (videoUrl) {
      logEvent('home_url_upload', { url: videoUrl });
      handleUpload({ url: videoUrl });
    }
  };
  
  const handleGetStarted = () => {
    logEvent('home_get_started');
    handleCtaClick();
    router.push('/onboarding');
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              <Zap className="mr-1 h-3 w-3" />
              AI-Powered Video Editing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Long Videos into <span className="text-primary">Engaging Clips</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Create, edit, and schedule short-form content automatically. Save hours of editing with AI-powered tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                disabled={isUploading}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleFileUpload}
                disabled={isUploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Video
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="video/*" 
                onChange={handleFileChange}
              />
            </div>
            
            <div className="bg-muted rounded-xl p-8 max-w-2xl mx-auto">
              <form onSubmit={handleUrlSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="video-url" className="sr-only">Video URL</Label>
                  <Input 
                    id="video-url"
                    placeholder="Paste a video URL (YouTube, Vimeo, etc.)" 
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    disabled={isUploading}
                  />
                </div>
                <Button type="submit" disabled={!videoUrl || isUploading}>
                  {isUploading ? 'Processing...' : 'Import'}
                </Button>
              </form>
              <p className="text-sm text-muted-foreground mt-3">
                Supported platforms: YouTube, Vimeo, and direct video links
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Logos Section */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Trusted by creators worldwide</h2>
            <p className="text-muted-foreground">Join thousands of content creators who save hours every week</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {['Logo A', 'Logo B', 'Logo C', 'Logo D', 'Logo E'].map((logo, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Creators</h2>
            <p className="text-muted-foreground">
              Everything you need to create engaging content faster
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Models</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Leverage cutting-edge AI to enhance your video content automatically
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Scissors className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Clip Anything</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Transform long videos into engaging clips with one click
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Reframe Anything</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automatically reframe your content for different aspect ratios
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Workflow Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simplified Workflow</h2>
            <p className="text-muted-foreground">
              From import to publication, we've got you covered
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 transform translate-x-px hidden md:block"></div>
            
            <div className="space-y-12 pl-0 md:pl-20 relative">
              <div className="relative">
                <div className="absolute -left-20 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center hidden md:flex">
                  <Upload className="h-4 w-4 text-primary-foreground" />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Auto Import</CardTitle>
                    <CardDescription>Connect your video sources for automatic importing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    Connect YouTube, Vimeo, or upload directly to automatically import your content.
                  </CardContent>
                </Card>
              </div>
              
              <div className="relative">
                <div className="absolute -left-20 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center hidden md:flex">
                  <Scissors className="h-4 w-4 text-primary-foreground" />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Auto Edit</CardTitle>
                    <CardDescription>Let AI create engaging clips from your content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    Our AI analyzes your video and creates engaging clips optimized for each platform.
                  </CardContent>
                </Card>
              </div>
              
              <div className="relative">
                <div className="absolute -left-20 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center hidden md:flex">
                  <Clock className="h-4 w-4 text-primary-foreground" />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Auto Scheduling</CardTitle>
                    <CardDescription>Schedule your content across platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    Automatically schedule your content to publish at optimal times across all your channels.
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <p className="text-muted-foreground">Time saved on editing</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3x</div>
              <p className="text-muted-foreground">More content published</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="text-muted-foreground">Customer satisfaction</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your content creation?</h2>
            <p className="text-primary-foreground/80 mb-8">
              Join thousands of creators who save hours every week with Opus Clip
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={handleGetStarted}
              disabled={isUploading}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}