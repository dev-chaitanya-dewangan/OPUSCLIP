'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

export function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(true)
  
  const plans = [
    {
      name: 'Pro',
      description: 'Perfect for individual creators and small teams',
      monthlyPrice: 29,
      annualPrice: 24,
      priceSuffix: '/month',
      featured: false,
      features: [
        'Up to 20 hours of video/month',
        'AI-powered clipping',
        'Smart captions',
        'Multi-platform export',
        'Basic analytics',
        '720p export quality',
        'Email support',
      ],
    },
    {
      name: 'Team',
      description: 'For growing teams and agencies',
      monthlyPrice: 79,
      annualPrice: 69,
      priceSuffix: '/month',
      featured: true,
      features: [
        'Up to 100 hours of video/month',
        'All Pro features',
        'Brand templates',
        'Advanced analytics',
        '1080p export quality',
        'Priority support',
        'Team collaboration',
        'Custom watermark',
      ],
    },
  ]

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <motion.h2 
          className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Simple, transparent pricing
        </motion.h2>
        <motion.p 
          className="mt-4 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Choose the plan that works best for you. All plans include a 7-day free trial.
        </motion.p>
        
        <motion.div 
          className="mt-8 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex items-center rounded-lg border bg-muted p-1 transition-all duration-200">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                !isAnnual
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isAnnual
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual
              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary transition-colors duration-200">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg ${
              plan.featured ? 'border-primary ring-1 ring-primary/20' : 'border-border'
            }`}
          >
            {plan.featured && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90">
                <Sparkles className="h-4 w-4" />
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-muted-foreground">{plan.description}</p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold">
                  ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="text-muted-foreground">{plan.priceSuffix}</span>
                {isAnnual && (
                  <span className="text-sm text-muted-foreground">
                    billed annually
                  </span>
                )}
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                plan.featured
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              Start Free Trial
            </button>
            
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Cancel anytime. No credit card required for trial.
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}