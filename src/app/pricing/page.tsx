'use client';

import { useState, useEffect } from 'react';
import { logEvent, usePageView, useCtaClick } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckIcon } from 'lucide-react';
import { listPlans } from '@/lib/db';
import { Plan } from '@/lib/types';
import { useSafeRouter } from '@/lib/navigation';

export default function PricingPage() {
  const router = useSafeRouter();
  const [isAnnual, setIsAnnual] = useState(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  
  usePageView('pricing');
  const handleCtaClick = useCtaClick('pricing_cta');
  
  // Fetch plans on mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await listPlans();
        setPlans(fetchedPlans);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
        setLoading(false);
      }
    };
    
    fetchPlans();
  }, []);
  
  const handleStartTrial = async (planId: string) => {
    try {
      logEvent('pricing_start_trial', { planId });
      handleCtaClick();
      
      // Navigate to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to start trial:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your content creation needs
          </p>
        </div>
        
        <div className="flex justify-center items-center mb-8">
          <span className="mr-3 text-muted-foreground">Monthly</span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <Label htmlFor="annual-toggle" className="ml-3 cursor-pointer">
            Annual <Badge variant="secondary">Save 20%</Badge>
          </Label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[1, 2].map((i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <div className="h-8 w-32 mb-2 bg-muted animate-pulse rounded"></div>
                <div className="h-4 w-48 bg-muted animate-pulse rounded"></div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <div className="h-12 w-32 bg-muted animate-pulse rounded"></div>
                  <div className="h-4 w-24 mt-2 bg-muted animate-pulse rounded"></div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex items-center">
                      <div className="h-4 w-4 mr-2 bg-muted animate-pulse rounded"></div>
                      <div className="h-4 w-40 bg-muted animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan for your content creation needs
        </p>
      </div>
      
      <div className="flex justify-center items-center mb-8">
        <span className="mr-3 text-muted-foreground">Monthly</span>
        <Switch 
          id="annual-toggle" 
          checked={isAnnual} 
          onCheckedChange={setIsAnnual} 
        />
        <Label htmlFor="annual-toggle" className="ml-3 cursor-pointer">
          Annual <Badge variant="secondary">Save 20%</Badge>
        </Label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`flex flex-col ${plan.isRecommended ? 'border-primary shadow-lg relative' : ''}`}
          >
            {plan.isRecommended && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge>Recommended</Badge>
              </div>
            )}
            
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="mb-6">
                <div className="text-3xl font-bold">
                  ${isAnnual ? plan.price.annual : plan.price.monthly}
                  <span className="text-lg font-normal text-muted-foreground">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
                {plan.isTrial && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {plan.trialDays}-day free trial
                  </div>
                )}
              </div>
              
              <ul className="space-y-3">
                {plan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.isRecommended ? 'default' : 'outline'}
                onClick={() => handleStartTrial(plan.id)}
              >
                {plan.isTrial ? 'Start Free Trial' : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}