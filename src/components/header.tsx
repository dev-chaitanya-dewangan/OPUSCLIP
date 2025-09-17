'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary" />
          <span className="inline-block font-bold text-xl">OpusClip</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <div className="relative">
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="flex items-center text-sm font-medium transition-colors hover:text-primary"
              aria-expanded={isResourcesOpen}
              aria-haspopup="true"
            >
              Resources
              <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" 
                style={{ transform: isResourcesOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
            </button>
            {isResourcesOpen && (
              <div className="absolute top-full mt-1 w-48 rounded-md border bg-popover p-2 shadow-md transition-all duration-200 ease-in-out">
                <Link
                  href="/blog"
                  className="block px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded transition-colors duration-150"
                >
                  Blog
                </Link>
                <Link
                  href="/tutorials"
                  className="block px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded transition-colors duration-150"
                >
                  Tutorials
                </Link>
                <Link
                  href="/help"
                  className="block px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded transition-colors duration-150"
                >
                  Help Center
                </Link>
              </div>
            )}
          </div>
          
          <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-primary">
            Pricing
          </Link>
          
          <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-2">
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 px-3 transition-all duration-150"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-primary/90 h-9 px-4 py-2 transition-all duration-150"
          >
            Sign up
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors duration-150"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border animate-in slide-in-from-top-2 duration-200">
          <div className="container py-3 flex flex-col space-y-3">
            <Link
              href="/pricing"
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className="pt-2 border-t border-border space-y-2">
              <Link
                href="/login"
                className="block w-full text-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2 transition-all duration-150"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center rounded-md bg-primary text-primary-foreground text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-primary/90 h-9 px-4 py-2 transition-all duration-150"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}