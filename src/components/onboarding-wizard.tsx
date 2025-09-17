'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'
import { logEvent, usePageView } from '@/lib/analytics'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const REASONS = [
  'Create short-form content',
  'Repurpose long videos',
  'Automate editing workflows',
  'Improve engagement',
  'Save time on editing',
  'Other'
]

const ROLES = [
  'Content Creator',
  'Marketer',
  'Educator',
  'Business Owner',
  'Other'
]

const PLANS = [
  {
    id: 'pro',
    name: 'Overlap Pro',
    description: 'Perfect for individual creators',
    price: 29,
    features: [
      '100 video minutes/month',
      'AI-powered editing',
      'Auto-captioning',
      'Export in 1080p',
      'Basic analytics'
    ],
    isRecommended: false,
    trialDays: 7
  },
  {
    id: 'team',
    name: 'Overlap Team',
    description: 'For growing teams and agencies',
    price: 99,
    features: [
      '1000 video minutes/month',
      'All Pro features',
      'Team collaboration',
      'Export in 4K',
      'Advanced analytics',
      'Priority support'
    ],
    isRecommended: true,
    trialDays: 14
  }
]

const steps = [
  {
    id: 1,
    title: 'Welcome to OpusClip!',
    description: 'Let\'s get you set up in just a few steps.',
  },
  {
    id: 2,
    title: 'What\'s your role?',
    description: 'This helps us tailor your experience.',
  },
  {
    id: 3,
    title: 'Which plan interests you?',
    description: 'You can change this anytime.',
  },
  {
    id: 4,
    title: 'What brings you to OpusClip?',
    description: 'This helps us improve our product.',
  },
  {
    id: 5,
    title: 'You\'re all set!',
    description: 'Let\'s start creating amazing content.',
  },
]

export function OnboardingWizard() {
  const router = useRouter()
  const { 
    reasons, 
    role, 
    plan,
    status,
    setReasons,
    setRole,
    setPlan,
    setStatus
  } = useStore(
    useMemo(() => (state) => ({
      reasons: state.reasons,
      role: state.role,
      plan: state.plan,
      status: state.status,
      setReasons: state.setReasons,
      setRole: state.setRole,
      setPlan: state.setPlan,
      setStatus: state.setStatus
    }), [])
  )
  
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedReasons, setSelectedReasons] = useState<string[]>(() => [...reasons])
  const [selectedRole, setSelectedRole] = useState(() => role || '')
  const [selectedPlan, setSelectedPlan] = useState(() => plan || '')
  const [otherReason, setOtherReason] = useState('')
  
  usePageView('onboarding-wizard')
  
  // Initialize local state with store values
  useEffect(() => {
    setSelectedReasons([...reasons])
    if (role) setSelectedRole(role)
    if (plan) setSelectedPlan(plan)
  }, [reasons, role, plan])
  
  const handleNext = () => {
    logEvent('onboarding_wizard_next', { step: currentStep })
    
    // Save data when moving to next step
    switch (currentStep) {
      case 1:
        // Save reasons
        const allReasons = [...selectedReasons]
        if (otherReason && !selectedReasons.includes('Other')) {
          allReasons.push(`Other: ${otherReason}`)
        }
        setReasons(allReasons)
        break
      case 2:
        // Save role
        if (selectedRole) {
          setRole(selectedRole)
        }
        break
      case 3:
        // Save plan
        if (selectedPlan) {
          setPlan(selectedPlan)
        }
        break
      case 5:
        // Complete onboarding
        setStatus('completed')
        logEvent('onboarding_wizard_completed')
        // Set a cookie to indicate onboarding is completed
        document.cookie = "onboardingCompleted=true; path=/; max-age=31536000" // 1 year
        router.push('/dashboard')
        return
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }
  
  const handleBack = () => {
    logEvent('onboarding_wizard_back', { step: currentStep })
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push('/')
    }
  }
  
  const handleReasonToggle = (reason: string) => {
    setSelectedReasons(prev => 
      prev.includes(reason) 
        ? prev.filter(r => r !== reason) 
        : [...prev, reason]
    )
  }
  
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedReasons.length > 0
      case 2:
        return !!selectedRole
      case 3:
        return !!selectedPlan
      case 4:
        return true // Optional step
      default:
        return true
    }
  }
  
  const progress = (currentStep / steps.length) * 100
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
            <span className="text-2xl font-bold">O</span>
          </div>
          <h1 className="text-3xl font-bold">OpusClip</h1>
        </div>
        
        <Card className="overflow-hidden">
          <div className="p-1 bg-muted">
            <div 
              className="h-2 bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <CardHeader>
            <div className="text-center">
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
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
                
                {currentStep === 2 && (
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
                
                {currentStep === 3 && (
                  <div className="space-y-6">
                    {PLANS.map((planOption) => (
                      <div 
                        key={planOption.id}
                        className={`rounded-lg border p-6 relative cursor-pointer transition-all ${
                          selectedPlan === planOption.id 
                            ? 'border-primary ring-2 ring-primary ring-offset-2' 
                            : 'hover:border-primary'
                        } ${planOption.isRecommended ? 'border-primary' : ''}`}
                        onClick={() => setSelectedPlan(planOption.id)}
                      >
                        {planOption.isRecommended && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge>Recommended</Badge>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{planOption.name}</h3>
                            <p className="text-muted-foreground">{planOption.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">${planOption.price}</div>
                            <div className="text-sm text-muted-foreground">per month</div>
                          </div>
                        </div>
                        
                        <ul className="mt-4 space-y-2">
                          {planOption.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          className="w-full mt-6"
                          variant={selectedPlan === planOption.id ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedPlan(planOption.id)
                            handleNext()
                          }}
                        >
                          Start {planOption.trialDays}-day Free Trial
                        </Button>
                        
                        <p className="text-center text-xs text-muted-foreground mt-3">
                          No credit card required
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                
                {currentStep === 4 && (
                  <div className="text-center py-8">
                    <div className="mx-auto h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary-foreground">O</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Transform your long videos into viral clips with AI-powered editing tools.
                    </p>
                  </div>
                )}
                
                {currentStep === 5 && (
                  <div className="text-center py-8">
                    <div className="mx-auto h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                        <CheckIcon className="h-8 w-8 text-primary-foreground" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">You're Ready to Go!</h3>
                    <p className="text-muted-foreground">
                      Your account is set up and you're ready to start creating amazing content.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-between mt-12">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6"
              >
                {currentStep === 1 ? 'Cancel' : 'Back'}
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6"
              >
                {currentStep === steps.length ? 'Get Started' : 'Continue'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}