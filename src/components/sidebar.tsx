'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Video, 
  LayoutTemplate, 
  Library, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Post', href: '/dashboard/posts', icon: Video },
  { name: 'Brand template', href: '/dashboard/templates', icon: LayoutTemplate },
  { name: 'Asset library', href: '/dashboard/assets', icon: Library },
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Social accounts', href: '/dashboard/social', icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`flex h-full flex-col border-r border-border bg-sidebar transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          {!collapsed && (
            <>
              <div className="h-8 w-8 rounded-full bg-primary transition-colors duration-200 hover:bg-primary/80" />
              <span>OpusClip</span>
            </>
          )}
          {collapsed && (
            <div className="h-8 w-8 rounded-full bg-primary transition-colors duration-200 hover:bg-primary/80" />
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto rounded-md p-1 hover:bg-accent transition-colors duration-200"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
                } ${collapsed ? 'justify-center' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>
      </div>
      
      <div className="border-t border-border p-2">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
            pathname === '/dashboard/settings' 
              ? 'bg-accent text-primary' 
              : 'text-muted-foreground hover:text-primary hover:bg-accent/50'
          } ${collapsed ? 'justify-center' : ''}`}
          aria-current={pathname === '/dashboard/settings' ? 'page' : undefined}
        >
          <Settings className="h-4 w-4" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>
  )
}