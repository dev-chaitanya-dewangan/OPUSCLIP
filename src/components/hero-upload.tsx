'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Upload, Link as LinkIcon, Play } from 'lucide-react'
import { motion } from 'framer-motion'

export function HeroUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [url, setUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Handle file upload
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    // Validate files
    const file = files[0]
    if (!file) return
    
    // Check file type
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid video file (MP4, WebM, MOV)')
      return
    }
    
    // Check file size (max 2GB)
    if (file.size > 2 * 1024 * 1024 * 1024) {
      alert('File size exceeds 2GB limit')
      return
    }
    
    // Start upload process
    setIsUploading(true)
    
    // Simulate upload progress
    setTimeout(() => {
      setIsUploading(false)
      alert(`File "${file.name}" uploaded successfully!`)
    }, 2000)
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    
    // Validate URL
    try {
      new URL(url)
    } catch {
      alert('Please enter a valid URL')
      return
    }
    
    // Start URL processing
    setIsUploading(true)
    
    // Simulate processing
    setTimeout(() => {
      setIsUploading(false)
      alert(`Video from URL processed successfully!`)
      setUrl('')
    }, 2000)
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h1 
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Transform Long Videos into <span className="text-primary">Viral Clips</span>
        </motion.h1>
        
        <motion.p 
          className="mt-4 text-lg text-muted-foreground sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          AI-powered tool that automatically clips, captions, and optimizes your content for social media.
        </motion.p>
        
        <motion.div 
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* URL Input */}
            <div className="rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-primary/10 p-2 transition-colors duration-200">
                  <LinkIcon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Import from URL</h3>
              </div>
              
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/video.mp4"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150"
                    disabled={isUploading}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-primary/90 h-10 px-4 py-2 transition-all duration-150"
                    disabled={isUploading || !url}
                  >
                    {isUploading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      'Import'
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* File Upload */}
            <div className="rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-primary/10 p-2 transition-colors duration-200">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Upload Video</h3>
              </div>
              
              <div
                className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200 ${
                  isDragging ? 'border-primary bg-primary/5' : 'border-input'
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInput}
                  accept="video/*"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  disabled={isUploading}
                />
                
                <div className="space-y-3">
                  <div className="mx-auto h-10 w-10 text-muted-foreground">
                    <Upload className="h-10 w-10" />
                  </div>
                  <div className="text-sm font-medium">
                    {isUploading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Uploading...
                      </div>
                    ) : (
                      <>
                        <span className="text-primary">Click to upload</span> or drag and drop
                      </>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    MP4, WebM, MOV up to 2GB
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="mt-8 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 rounded-lg bg-primary/20 blur transition-all duration-300 group-hover:opacity-70" />
              <div className="relative rounded-lg bg-card p-6 border transition-all duration-300 group-hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors duration-200 group-hover:bg-primary/20">
                    <Play className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">See how it works</h4>
                    <p className="text-sm text-muted-foreground">
                      Watch our 60-second demo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}