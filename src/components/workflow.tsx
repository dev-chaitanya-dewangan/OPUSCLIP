'use client'

import { motion } from 'framer-motion'
import { Upload, Zap, Share, Play } from 'lucide-react'

export function Workflow() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload',
      description: 'Import your long-form video from any source',
    },
    {
      icon: Zap,
      title: 'AI Process',
      description: 'Our AI identifies the best moments automatically',
    },
    {
      icon: Play,
      title: 'Edit',
      description: 'Fine-tune with our intuitive editor',
    },
    {
      icon: Share,
      title: 'Share',
      description: 'Publish to all platforms with one click',
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple workflow, powerful results
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Create viral content in minutes, not hours.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden md:block" />
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90">
                    <Icon className="h-8 w-8" />
                    <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold transition-all duration-200 hover:scale-110">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}