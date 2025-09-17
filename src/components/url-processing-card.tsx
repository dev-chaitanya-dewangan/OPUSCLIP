'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, Play, Square, Scissors, Smartphone } from 'lucide-react';

interface ProcessingCardProps {
  url: string;
  onProcessingComplete: () => void;
}

export function ProcessingCard({ url, onProcessingComplete }: ProcessingCardProps) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate processing progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          // Notify parent component that processing is complete
          setTimeout(() => {
            onProcessingComplete();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onProcessingComplete]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent"
              />
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"
              >
                <CheckCircle className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </div>
          
          <div className="text-center">
            <h3 className="font-semibold text-lg">
              {isProcessing ? 'Processing Video' : 'Processing Complete'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 truncate max-w-xs">
              {url}
            </p>
          </div>
          
          {isProcessing && (
            <div className="w-full">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-xs text-muted-foreground text-center mt-1">
                {progress}%
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ResultCardsProps {
  onCardClick: (cardType: string) => void;
}

export function ResultCards({ onCardClick }: ResultCardsProps) {
  const features = [
    {
      id: 'play',
      title: 'Auto Play',
      description: 'Video plays automatically',
      icon: Play,
      color: 'bg-blue-500',
    },
    {
      id: 'square',
      title: 'Square Format',
      description: 'Perfect for social media',
      icon: Square,
      color: 'bg-green-500',
    },
    {
      id: 'clip',
      title: 'Auto Clip',
      description: 'AI-powered editing',
      icon: Scissors,
      color: 'bg-purple-500',
    },
    {
      id: 'mobile',
      title: 'Mobile Ready',
      description: 'Optimized for phones',
      icon: Smartphone,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="cursor-pointer border-2 border-transparent hover:border-primary transition-all duration-200"
              onClick={() => onCardClick(feature.id)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-3">
                  <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}