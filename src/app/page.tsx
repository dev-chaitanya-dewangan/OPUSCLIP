'use client';

import { useState, useRef } from 'react';
import { logEvent, usePageView, useCtaClick } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Zap, 
  ArrowRight,
  LogIn,
  User,
  Home,
  Video,
  FileText,
  BarChart3,
  DollarSign,
  Image
} from 'lucide-react';
import { useHeroUpload } from '@/hooks/use-hero-upload';
import { useSafeRouter } from '@/lib/navigation';
import { ProcessingCard, ResultCards } from '@/components/url-processing-card';
import { ExpandableTabs } from '@/components/expandable-tabs';
import { GradientButton } from '@/components/ui/gradient-button';
import { FlickeringGrid } from '@/components/ui/flickering-grid';

export default function HomePage() {
  const router = useSafeRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isProcessingUrl, setIsProcessingUrl] = useState(false);
  const [showResultCards, setShowResultCards] = useState(false);
  
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
      // Instead of directly calling handleUpload, we'll show our custom processing UI
      setIsProcessingUrl(true);
      setShowResultCards(false);
    }
  };
  
  const handleProcessingComplete = () => {
    setShowResultCards(true);
  };
  
  const handleCardClick = (cardType: string) => {
    logEvent('home_result_card_click', { cardType });
    // After clicking any card, proceed with the actual upload
    handleUpload({ url: videoUrl });
  };
  
  const handleGetStarted = () => {
    logEvent('home_get_started');
    handleCtaClick();
    import('@/hooks/use-transition-router').then(module => {
      const { useTransitionRouter } = module;
      const router = useTransitionRouter();
      router.push('/dashboard');
    });
  };
  
  return (
    <div className="min-h-screen page-bg relative font-mono">
      {/* Flickering grid positioned at the very front of the landing page */}
      <FlickeringGrid
        className="fixed inset-0 z-0"
        squareSize={4}
        gridGap={6}
        color="#C65BA7"
        maxOpacity={0.3}
        flickerChance={0.1}
      />
      
      {/* Top Navigation Bar */}
      <div className="w-full py-5 bg-background/50 backdrop-blur-[2px] relative border-b border-accent/10 z-10">
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
              { title: "Gallery", icon: Image, href: "/dashboard" },
            ]}
            activeColor="text-accent"
            className="rounded-xl p-1"
          />
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-accent font-mono">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-accent font-mono">
              <User className="h-4 w-4 mr-2" />
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative z-10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest bg-accent/10 text-accent border border-accent/20">
              <Zap className="mr-2 h-3 w-3 inline" />
              AI-POWERED VIDEO EDITING
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              <span className="block mb-2">TRANSFORM LONG VIDEOS</span>
              <span className="block text-accent">INTO ENGAGING CLIPS</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-mono">
              CREATE, EDIT, AND SCHEDULE SHORT-FORM CONTENT AUTOMATICALLY. 
              SAVE HOURS OF EDITING WITH AI-POWERED TOOLS.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <GradientButton
                onClick={handleGetStarted}
                disabled={isUploading}
                className="px-8 py-4 text-base font-mono font-bold tracking-wider rounded-xl text-lg transition-all duration-300 hover:scale-105"
              >
                GET STARTED FREE
                <ArrowRight className="ml-3 h-5 w-5" />
              </GradientButton>
              
              <Button 
                variant="outline"
                onClick={handleFileUpload}
                disabled={isUploading}
                className="px-8 py-4 text-base font-mono font-bold tracking-wider rounded-xl border-2 bg-background/50 hover:bg-accent/10 text-foreground border-accent/30 hover:border-accent/50 transition-all duration-300"
              >
                <Upload className="mr-3 h-5 w-5" />
                UPLOAD VIDEO
              </Button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="video/*" 
                onChange={handleFileChange}
              />
            </div>
            
            <div className="max-w-2xl mx-auto rounded-2xl bg-background/70 backdrop-blur-xl border border-accent/20 p-8 shadow-2xl shadow-accent/10">
              {isProcessingUrl ? (
                showResultCards ? (
                  <ResultCards onCardClick={handleCardClick} />
                ) : (
                  <ProcessingCard url={videoUrl} onProcessingComplete={handleProcessingComplete} />
                )
              ) : (
                <form onSubmit={handleUrlSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="video-url" className="sr-only">VIDEO URL</Label>
                    <Input 
                      id="video-url"
                      placeholder="PASTE A VIDEO URL (YOUTUBE, VIMEO, ETC.)" 
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      disabled={isUploading}
                      className="h-14 px-5 rounded-xl font-mono text-base border-accent/30 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-300"
                    />
                  </div>
                  <GradientButton
                    type="submit" 
                    disabled={!videoUrl || isUploading}
                    className="h-14 px-8 rounded-xl font-mono font-bold text-base transition-all duration-300 hover:scale-105"
                  >
                    {isUploading ? 'PROCESSING...' : 'IMPORT'}
                  </GradientButton>
                </form>
              )}
              <p className="text-xs text-muted-foreground mt-4 font-mono">
                SUPPORTED PLATFORMS: YOUTUBE, VIMEO, AND DIRECT VIDEO LINKS
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}