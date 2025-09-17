'use client'

import { motion } from 'framer-motion'

export function TrustedLogos() {
  const logos = [
    { name: 'Company A', id: 1 },
    { name: 'Company B', id: 2 },
    { name: 'Company C', id: 3 },
    { name: 'Company D', id: 4 },
    { name: 'Company E', id: 5 },
    { name: 'Company F', id: 6 },
  ]

  return (
    <div className="container px-4 md:px-6 py-12">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-medium text-primary">TRUSTED BY creators from</p>
        
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.id}
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="h-10 w-32 bg-muted rounded flex items-center justify-center">
                <span className="text-muted-foreground font-medium">{logo.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}