'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { shallow } from 'zustand/shallow';
import { logEvent, usePageView } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckIcon } from 'lucide-react';

const REASONS = [
  'Create short-form content',
  'Repurpose long videos',
  'Automate editing workflows',
  'Improve engagement',
  'Save time on editing',
  'Other'
];

const ROLES = [
  'Content Creator',
  'Marketer',
  'Educator',
  'Business Owner',
  'Other'
];

export default function OnboardingPage() {
  const router = useRouter();
  const { reasons, role, setReasons, setRole, setStatus } = useStore(
    (state) => ({
      reasons: state.reasons,
      role: state.role,
      setReasons: state.setReasons,
      setRole: state.setRole,
      setStatus: state.setStatus,
    }),
    shallow
  );
  
  const [step, setStep] = useState(1);
  const [selectedReasons, setSelectedReasons] = useState<string[]>(() => [...reasons]);
  const [selectedRole, setSelectedRole] = useState(() => role || '');
  const [otherReason, setOtherReason] = useState('');
  
  usePageView('onboarding');
  
  // Initialize local state with store values
  useEffect(() => {
    setSelectedReasons([...reasons]);
    if (role) setSelectedRole(role);
  }, [reasons, role]);
  
  // Save progress when moving between steps
  useEffect(() => {
    if (step === 1 && selectedReasons.length > 0) {
      const allReasons = [...selectedReasons];
      if (otherReason && !selectedReasons.includes('Other')) {
        allReasons.push(`Other: ${otherReason}`);
      }
      // Only update if different from current store values
      if (JSON.stringify(allReasons) !== JSON.stringify(reasons)) {
        setReasons(allReasons);
      }
    }
    
    if (step === 2 && selectedRole) {
      // Only update if different from current store values
      if (selectedRole !== role) {
        setRole(selectedRole);
      }
    }
  }, [step, selectedReasons, selectedRole, otherReason, reasons, role]); // Now we can safely include the store values
  
  const handleNext = () => {
    logEvent('onboarding_next', { step });
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      setStatus('completed');
      logEvent('onboarding_completed');
      // Set a cookie to indicate onboarding is completed
      document.cookie = "onboardingCompleted=true; path=/; max-age=31536000"; // 1 year
      router.push('/dashboard');
    }
  };
  
  const handleBack = () => {
    logEvent('onboarding_back', { step });
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/');
    }
  };
  
  const handleReasonToggle = (reason: string) => {
    setSelectedReasons(prev => 
      prev.includes(reason) 
        ? prev.filter(r => r !== reason) 
        : [...prev, reason]
    );
  };
  
  const progress = (step / 3) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to Opus Clip</h1>
            <p className="text-muted-foreground">
              Let's set up your account to get the most out of our platform
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <div className="w-full bg-secondary rounded-full h-2 mb-6">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              {step === 1 && (
                <>
                  <CardTitle>What brings you to Opus Clip?</CardTitle>
                  <CardDescription>
                    Select all that apply
                  </CardDescription>
                </>
              )}
              
              {step === 2 && (
                <>
                  <CardTitle>What's your role?</CardTitle>
                  <CardDescription>
                    This helps us personalize your experience
                  </CardDescription>
                </>
              )}
              
              {step === 3 && (
                <>
                  <CardTitle>Choose your plan</CardTitle>
                  <CardDescription>
                    Start with a free trial, no credit card required
                  </CardDescription>
                </>
              )}
            </CardHeader>
            
            <CardContent>
              {step === 1 && (
                <div className="space-y-4">
                  {REASONS.map((reason) => (
                    <div key={reason} className="flex items-center space-x-3">
                      <Checkbox
                        id={reason}
                        checked={selectedReasons.includes(reason)}
                        onCheckedChange={() => handleReasonToggle(reason)}
                      />
                      <Label 
                        htmlFor={reason} 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {reason}
                      </Label>
                    </div>
                  ))}
                  
                  {selectedReasons.includes('Other') && (
                    <div className="mt-4">
                      <Label htmlFor="other-reason">Please specify</Label>
                      <Textarea
                        id="other-reason"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder="Tell us more about your goals..."
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
              )}
              
              {step === 2 && (
                <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
                  {ROLES.map((role) => (
                    <div key={role} className="flex items-center space-x-3">
                      <RadioGroupItem value={role} id={role} />
                      <Label 
                        htmlFor={role} 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {role}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              {step === 3 && (
                <div className="space-y-6">
                  <div className="rounded-lg border p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">Overlap Pro</h3>
                        <p className="text-muted-foreground">Perfect for individual creators</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">$29</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                      </div>
                    </div>
                    
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>100 video minutes/month</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>AI-powered editing</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>Auto-captioning</span>
                      </li>
                    </ul>
                    
                    <Button className="w-full mt-6" onClick={handleNext}>
                      Start 7-day Free Trial
                    </Button>
                    
                    <p className="text-center text-xs text-muted-foreground mt-3">
                      No credit card required
                    </p>
                  </div>
                  
                  <div className="rounded-lg border p-6 border-primary relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge>Recommended</Badge>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">Overlap Team</h3>
                        <p className="text-muted-foreground">For growing teams and agencies</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">$99</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                      </div>
                    </div>
                    
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>1000 video minutes/month</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>All Pro features</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>Team collaboration</span>
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                        <span>Export in 4K</span>
                      </li>
                    </ul>
                    
                    <Button className="w-full mt-6" onClick={handleNext}>
                      Start 14-day Free Trial
                    </Button>
                    
                    <p className="text-center text-xs text-muted-foreground mt-3">
                      No credit card required
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            
            <div className="px-6 py-4 border-t flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                {step === 1 ? 'Cancel' : 'Back'}
              </Button>
              <Button 
                onClick={handleNext}
                disabled={
                  (step === 1 && selectedReasons.length === 0) || 
                  (step === 2 && !selectedRole)
                }
              >
                {step === 3 ? 'Get Started' : 'Next'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}