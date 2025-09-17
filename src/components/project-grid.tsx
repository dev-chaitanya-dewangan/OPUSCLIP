'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, Play, MoreHorizontal } from 'lucide-react'
import { useStore } from '@/lib/store'

export function ProjectGrid() {
  const { entities, ids } = useStore((state) => ({
    entities: state.entities,
    ids: state.ids
  }))
  
  // Convert entities to array
  const projects = ids.map(id => entities[id])
  
  // Sample projects for demo
  const sampleProjects = [
    {
      id: '1',
      title: 'Summer Campaign',
      thumbnail: {
        square: '',
        vertical: ''
      },
      duration: 165, // 2:45 in seconds
      createdAt: new Date('2023-06-15'),
      updatedAt: new Date('2023-06-15'),
      slug: 'summer-campaign',
      points: 0
    },
    {
      id: '2',
      title: 'Product Launch',
      thumbnail: {
        square: '',
        vertical: ''
      },
      duration: 82, // 1:22 in seconds
      createdAt: new Date('2023-06-10'),
      updatedAt: new Date('2023-06-10'),
      slug: 'product-launch',
      points: 0
    },
    {
      id: '3',
      title: 'Behind the Scenes',
      thumbnail: {
        square: '',
        vertical: ''
      },
      duration: 258, // 4:18 in seconds
      createdAt: new Date('2023-06-05'),
      updatedAt: new Date('2023-06-05'),
      slug: 'behind-the-scenes',
      points: 0
    },
  ]
  
  const allProjects = projects.length > 0 ? projects : sampleProjects

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">My Projects</h2>
          <p className="text-muted-foreground">
            {allProjects.length} project{allProjects.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-primary/90 h-10 px-4 py-2 duration-200">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </button>
      </div>
      
      {allProjects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center transition-all duration-300 hover:border-primary">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Play className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No projects yet</h3>
          <p className="mt-2 text-muted-foreground">
            Create your first project to get started.
          </p>
          <button className="mt-4 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-primary/90 h-10 px-4 py-2 duration-200">
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="rounded-xl border bg-card shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="relative aspect-video bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-black/30 flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:bg-black/50">
                    <Play className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-1 text-xs text-white">
                  {formatDuration(project.duration)}
                </div>
                <button className="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 text-white transition-all duration-200 hover:bg-black/70">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold truncate">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Created {project.createdAt.toLocaleDateString()}
                </p>
                <Link
                  href={`/editor/${project.id}`}
                  className="mt-3 inline-flex items-center text-sm font-medium text-primary hover:underline transition-colors duration-200"
                >
                  Edit project
                </Link>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            className="rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center p-8 text-center transition-colors duration-200 hover:border-primary cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: allProjects.length * 0.1 }}
          >
            <div className="rounded-full bg-primary/10 p-3 transition-colors duration-200 hover:bg-primary/20">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-semibold">New Project</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create a new video project
            </p>
          </motion.div>
        </div>
      )}
    </div>
  )
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}