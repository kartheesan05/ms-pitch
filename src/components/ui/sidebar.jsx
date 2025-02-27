"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SidebarContext = React.createContext({
  collapsed: false,
  setCollapsed: () => {},
})

const Sidebar = React.forwardRef(({ className, children, defaultCollapsed = false, ...props }, ref) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div 
        ref={ref} 
        className={cn(
          "flex h-full transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          className
        )} 
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props}>
    {children}
  </div>
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { collapsed } = React.useContext(SidebarContext)

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-1 flex-col overflow-hidden",
        collapsed ? "items-center" : "w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { collapsed, setCollapsed } = React.useContext(SidebarContext)

  return (
    <button
      ref={ref}
      type="button"
      className={cn("rounded-md p-2 hover:bg-neutral-800", className)}
      onClick={() => setCollapsed(!collapsed)}
      {...props}
    >
      {children || (
        collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />
      )}
      <span className="sr-only">{collapsed ? "Expand" : "Collapse"} sidebar</span>
    </button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarGroup = React.forwardRef(({ className, children, ...props }, ref) => {
  const { collapsed } = React.useContext(SidebarContext)
  
  return (
    <div 
      ref={ref} 
      className={cn(
        "flex flex-col", 
        collapsed ? "items-center w-full px-0" : "w-full",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef(({ className, children, ...props }, ref) => {
  const { collapsed } = React.useContext(SidebarContext)
  
  return (
    <div 
      ref={ref} 
      className={cn(
        "text-sm font-medium text-neutral-200",
        collapsed ? "sr-only" : "",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("w-full", className)} {...props}>
    {children}
  </div>
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
    {children}
  </div>
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("w-full", className)} {...props}>
    {children}
  </div>
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef(
  ({ className, isActive, children, ...props }, ref) => {
    const { collapsed } = React.useContext(SidebarContext)
    
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex w-full items-center rounded-md px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100",
          isActive && "bg-neutral-800 text-neutral-100",
          collapsed && "justify-center px-2",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
}
