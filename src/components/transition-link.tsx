'use client';

import Link from 'next/link';
import { useTransitionRouter } from '@/hooks/use-transition-router';
import { useTransition } from '@/components/route-transition-provider';
import React from 'react';

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  prefetch?: boolean;
}

export function TransitionLink({ 
  href, 
  children, 
  prefetch = true,
  ...props 
}: TransitionLinkProps) {
  const router = useTransitionRouter();
  const { startTransition } = useTransition();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Start the transition animation
    startTransition('forward');
    
    // Navigate after a short delay to allow animation to start
    setTimeout(() => {
      router.push(href);
    }, 50);
  };

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </Link>
  );
}