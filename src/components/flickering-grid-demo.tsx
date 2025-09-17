'use client'

import { FlickeringGrid } from "@/components/ui/flickering-grid"

export function FlickeringGridDemo() {
  return (
    <div className="relative rounded-lg overflow-hidden border bg-card h-64 w-full">
      <FlickeringGrid
        className="absolute inset-0"
        squareSize={4}
        gridGap={6}
        color="#3B82F6"
        maxOpacity={0.3}
        flickerChance={0.1}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
        <h3 className="text-2xl font-bold text-white">Flickering Grid Demo</h3>
        <p className="text-white/80 mt-2">
          This is a demo of the MagicUI FlickeringGrid component
        </p>
      </div>
    </div>
  )
}