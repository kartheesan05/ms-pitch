"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, ChevronUp, Expand, MessageSquare, ChevronLeft } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample data for onboarding steps
const onboardingSteps = [
  {
    id: 1,
    title: "Create your account",
    description: "Set up your profile and preferences",
    tasks: [
      { id: 1, title: "Fill in your personal information", completed: true },
      { id: 2, title: "Upload a profile picture", completed: false },
      { id: 3, title: "Set your notification preferences", completed: false },
    ],
  },
  {
    id: 2,
    title: "Connect your data sources",
    description: "Link your accounts to import data",
    tasks: [
      { id: 1, title: "Connect your Google account", completed: false },
      { id: 2, title: "Import contacts", completed: false },
      { id: 3, title: "Set up data sync schedule", completed: false },
    ],
  },
  {
    id: 3,
    title: "Customize your workspace",
    description: "Make the platform work for you",
    tasks: [
      { id: 1, title: "Choose a theme", completed: false },
      { id: 2, title: "Set up your dashboard", completed: false },
      { id: 3, title: "Create your first project", completed: false },
    ],
  },
  {
    id: 4,
    title: "Invite your team",
    description: "Collaborate with your colleagues",
    tasks: [
      { id: 1, title: "Send invitations", completed: false },
      { id: 2, title: "Set up team permissions", completed: false },
      { id: 3, title: "Create your first shared project", completed: false },
    ],
  },
]

// Sample data for chat history
const chatHistory = [
  { id: 1, title: "Project kickoff discussion", date: "2 hours ago", unread: true },
  { id: 2, title: "Weekly team update", date: "Yesterday", unread: false },
  { id: 3, title: "Client feedback review", date: "2 days ago", unread: false },
  { id: 4, title: "Product roadmap planning", date: "3 days ago", unread: false },
  { id: 5, title: "Design review meeting", date: "1 week ago", unread: false },
  { id: 6, title: "Bug triage session", date: "1 week ago", unread: false },
  { id: 7, title: "Feature prioritization", date: "2 weeks ago", unread: false },
  { id: 8, title: "Quarterly planning", date: "1 month ago", unread: false },
]

export function AppSidebar({ isCollapsed, onToggle, onExpandOnboarding }) {
  const [showOnboarding, setShowOnboarding] = React.useState(true)
  const [showChatHistory, setShowChatHistory] = React.useState(true)
  const [expandedStep, setExpandedStep] = React.useState(null)
  const [selectedChat, setSelectedChat] = React.useState(null)

  React.useEffect(() => {
    const handleExpandOnboarding = () => {
      if (onExpandOnboarding) {
        onExpandOnboarding();
      }
    };

    window.addEventListener("expand-onboarding", handleExpandOnboarding);
    return () => {
      window.removeEventListener("expand-onboarding", handleExpandOnboarding);
    };
  }, [onExpandOnboarding]);

  if (isCollapsed) {
    return (
      <button
        type="button"
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-neutral-900 border-y border-r border-neutral-700 rounded-r-md p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 z-10"
        onClick={onToggle}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Show Sidebar</span>
      </button>
    );
  }

  return (
    <div className="h-full relative">
      {/* Toggle Button - Positioned on the right edge */}
      <button
        type="button"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-neutral-900 border border-neutral-700 rounded-full p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 z-10 shadow-md"
        onClick={onToggle}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Hide Sidebar</span>
      </button>

      <Sidebar className="border-r bg-neutral-900 border-neutral-700 text-white h-full">
        <SidebarContent>
          {/* Onboarding Section */}
          <SidebarGroup>
            <div className="flex items-center justify-between px-4 py-6">
              <SidebarGroupLabel className="flex items-center gap-2">
                <span>Onboarding</span>
                {showOnboarding && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2"
                    onClick={() => {
                      if (onExpandOnboarding) onExpandOnboarding();
                    }}
                  >
                    <Expand className="h-4 w-4" />
                    <span className="sr-only">Expand All</span>
                  </Button>
                )}
              </SidebarGroupLabel>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setShowOnboarding(!showOnboarding)}
              >
                {showOnboarding ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="sr-only">{showOnboarding ? "Hide" : "Show"} Onboarding</span>
              </Button>
            </div>

            {showOnboarding && (
              <SidebarGroupContent>
                <ScrollArea className="h-[30vh]">
                  <SidebarMenu>
                    {onboardingSteps.map((step) => (
                      <SidebarMenuItem key={step.id}>
                        <Collapsible
                          open={expandedStep === step.id}
                          onOpenChange={(open) => setExpandedStep(open ? step.id : null)}
                        >
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-cyan-500 text-xs">
                                  {step.id}
                                </div>
                                <span>{step.title}</span>
                              </div>
                              {expandedStep === step.id ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="px-4 py-2">
                            <p className="text-sm text-neutral-400 mb-2">{step.description}</p>
                            <ul className="space-y-1">
                              {step.tasks.map((task) => (
                                <li key={task.id} className="flex items-center gap-2 text-sm">
                                  <div
                                    className={`h-3 w-3 rounded-full ${
                                      task.completed ? "bg-cyan-500" : "border border-neutral-500"
                                    }`}
                                  />
                                  <span className={task.completed ? "line-through text-neutral-500" : ""}>
                                    {task.title}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </ScrollArea>
              </SidebarGroupContent>
            )}
          </SidebarGroup>

          <Separator className="my-2" />

          {/* Chat History Section */}
          <SidebarGroup>
            <div className="flex items-center justify-between px-4 py-2">
              <SidebarGroupLabel className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Chat History</span>
              </SidebarGroupLabel>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setShowChatHistory(!showChatHistory)}
              >
                {showChatHistory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="sr-only">{showChatHistory ? "Hide" : "Show"} Chat History</span>
              </Button>
            </div>

            {showChatHistory && (
              <SidebarGroupContent>
                <ScrollArea className="h-[calc(100vh-30vh-10rem)]">
                  <SidebarMenu>
                    {chatHistory.map((chat) => (
                      <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton isActive={selectedChat === chat.id} onClick={() => setSelectedChat(chat.id)}>
                          <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                              <span>{chat.title}</span>
                              {chat.unread && <Badge variant="secondary" className="h-1.5 w-1.5 rounded-full p-0" />}
                            </div>
                            <span className="text-xs text-neutral-500">{chat.date}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </ScrollArea>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

