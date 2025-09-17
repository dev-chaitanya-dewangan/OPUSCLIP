'use client'

import { motion } from 'framer-motion'
import { 
  Wand2, 
  Scissors, 
  Captions, 
  Smartphone, 
  Zap, 
  TrendingUp,
  CheckCircle,
  Play
} from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Wand2,
      title: 'AI-Powered Clipping',
      description: 'Automatically identify and extract the most engaging moments from your videos.',
    },
    {
      icon: Captions,
      title: 'Smart Captions',
      description: 'Generate and customize captions that match your brand voice in seconds.',
    },
    {
      icon: Smartphone,
      title: 'Multi-Platform Optimization',
      description: 'One-click export to TikTok, Instagram, YouTube Shorts, and more.',
    },
    {
      icon: Scissors,
      title: 'Precision Editing',
      description: 'Fine-tune your clips with our intuitive timeline editor.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process videos 10x faster than traditional editing software.',
    },
    {
      icon: TrendingUp,
      title: 'Boost Engagement',
      description: 'Increase your reach with content optimized for each platform.',
    },
  ]

  const benefits = [
    'Save 10+ hours per week',
    'Increase engagement by 300%',
    'Grow your audience faster',
    'Monetize your content',
    'Join 500K+ creators',
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to go viral
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed to help creators like you maximize reach and engagement.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-200">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-20 rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">
                Join 500K+ creators who save hours every week
              </h3>
              <p className="mt-4 text-primary-foreground/90 max-w-md">
                Stop spending time on repetitive editing tasks. Focus on creating amazing content.
              </p>
              
              <ul className="mt-6 space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="relative aspect-video rounded-lg bg-black/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:bg-white/30">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-medium">LIVE PREVIEW</span>
                  </div>
                  <div className="mt-2 h-2 w-3/4 rounded bg-white/30" />
                  <div className="mt-1 h-2 w-1/2 rounded bg-white/30" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}