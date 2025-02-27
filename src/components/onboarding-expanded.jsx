"use client"

import * as React from "react"
import { ArrowLeft, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for onboarding steps
const onboardingSteps = [
  {
    id: 1,
    title: "Create your account",
    description:
      "Set up your profile and preferences to get the most out of your experience. Customize your settings to match your workflow and make the platform work for you.",
    tasks: [
      { id: 1, title: "Fill in your personal information", completed: true },
      { id: 2, title: "Upload a profile picture", completed: false },
      { id: 3, title: "Set your notification preferences", completed: false },
      { id: 4, title: "Complete your bio", completed: false },
      { id: 5, title: "Set up two-factor authentication", completed: false },
    ],
  },
  {
    id: 2,
    title: "Connect your data sources",
    description:
      "Link your accounts to import data from various sources. This will help you centralize your information and make it easier to manage your workflow.",
    tasks: [
      { id: 1, title: "Connect your Google account", completed: false },
      { id: 2, title: "Import contacts", completed: false },
      { id: 3, title: "Set up data sync schedule", completed: false },
      { id: 4, title: "Configure data retention policies", completed: false },
      { id: 5, title: "Set up backup preferences", completed: false },
    ],
  },
  {
    id: 3,
    title: "Customize your workspace",
    description:
      "Make the platform work for you by customizing your workspace. Choose themes, layouts, and widgets that match your preferences and workflow.",
    tasks: [
      { id: 1, title: "Choose a theme", completed: false },
      { id: 2, title: "Set up your dashboard", completed: false },
      { id: 3, title: "Create your first project", completed: false },
      { id: 4, title: "Customize your sidebar", completed: false },
      { id: 5, title: "Set up keyboard shortcuts", completed: false },
    ],
  },
  {
    id: 4,
    title: "Invite your team",
    description:
      "Collaborate with your colleagues by inviting them to your workspace. Set up permissions and roles to ensure everyone has the right access.",
    tasks: [
      { id: 1, title: "Send invitations", completed: false },
      { id: 2, title: "Set up team permissions", completed: false },
      { id: 3, title: "Create your first shared project", completed: false },
      { id: 4, title: "Set up team channels", completed: false },
      { id: 5, title: "Configure team notifications", completed: false },
    ],
  },
]

export function OnboardingExpanded({ onClose }) {
  const [selectedStep, setSelectedStep] = React.useState(onboardingSteps[0].id.toString())

  const currentStep = onboardingSteps.find((step) => step.id.toString() === selectedStep)

  return (
    <div className="flex h-full w-full flex-col bg-neutral-900 text-white">
      <div className="flex items-center justify-between border-b border-neutral-800 p-4">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-xl font-semibold">Onboarding Guide</h1>
        <div className="w-24" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar for step selection */}
        <div className="w-64 border-r border-neutral-800">
          <ScrollArea className="h-full">
            <div className="p-4">
              <h2 className="mb-4 font-medium">Steps</h2>
              <div className="space-y-1">
                {onboardingSteps.map((step) => (
                  <Button
                    key={step.id}
                    variant={selectedStep === step.id.toString() ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedStep(step.id.toString())}
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-cyan-500 mr-2 text-xs">
                      {step.id}
                    </div>
                    <span>{step.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main content area */}
        {currentStep && (
          <div className="flex-1 overflow-auto bg-neutral-900 text-white">
            <div className="mx-auto max-w-3xl p-8">
              <h1 className="mb-2 text-3xl font-bold text-white">{currentStep.title}</h1>
              <p className="mb-8 text-lg text-neutral-400">{currentStep.description}</p>

              <Tabs defaultValue="tasks">
                <TabsList className="mb-4 bg-neutral-800">
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="tasks">
                  <div className="rounded-lg border border-neutral-700 p-6">
                    <h3 className="mb-4 text-lg font-medium">Tasks to complete</h3>
                    <Separator className="mb-4 bg-neutral-700" />
                    <div className="space-y-4">
                      {currentStep.tasks.map((task) => (
                        <div key={task.id} className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${task.completed ? "bg-cyan-500 text-black" : "border border-neutral-500"}`}
                          >
                            {task.completed && <Check className="h-3 w-3" />}
                          </div>
                          <div>
                            <p className={`font-medium ${task.completed ? "text-neutral-500" : "text-white"}`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-neutral-400">
                              Complete this task to progress in your onboarding journey.
                            </p>
                          </div>
                          <Button 
                            variant={task.completed ? "outline" : "default"} 
                            size="sm" 
                            className={`ml-auto ${task.completed ? "" : "bg-cyan-500 hover:bg-cyan-600 text-black"}`}
                          >
                            {task.completed ? "Completed" : "Start"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resources">
                  <div className="rounded-lg border border-neutral-700 p-6">
                    <h3 className="mb-4 text-lg font-medium">Helpful Resources</h3>
                    <Separator className="mb-4 bg-neutral-700" />
                    <div className="space-y-4">
                      <div className="rounded-md border border-neutral-700 p-4">
                        <h4 className="font-medium">Getting Started Guide</h4>
                        <p className="text-sm text-neutral-400">A comprehensive guide to help you get started.</p>
                        <Button variant="link" className="mt-2 h-auto p-0 text-cyan-400 hover:text-cyan-300">
                          View Guide
                        </Button>
                      </div>
                      <div className="rounded-md border border-neutral-700 p-4">
                        <h4 className="font-medium">Video Tutorial</h4>
                        <p className="text-sm text-neutral-400">Watch a step-by-step video tutorial.</p>
                        <Button variant="link" className="mt-2 h-auto p-0 text-cyan-400 hover:text-cyan-300">
                          Watch Video
                        </Button>
                      </div>
                      <div className="rounded-md border border-neutral-700 p-4">
                        <h4 className="font-medium">Documentation</h4>
                        <p className="text-sm text-neutral-400">Read the detailed documentation.</p>
                        <Button variant="link" className="mt-2 h-auto p-0 text-cyan-400 hover:text-cyan-300">
                          Read Docs
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="faq">
                  <div className="rounded-lg border border-neutral-700 p-6">
                    <h3 className="mb-4 text-lg font-medium">Frequently Asked Questions</h3>
                    <Separator className="mb-4 bg-neutral-700" />
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">How long does this step usually take?</h4>
                        <p className="text-sm text-neutral-400">
                          Most users complete this step in about 10-15 minutes.
                        </p>
                      </div>
                      <Separator className="bg-neutral-700" />
                      <div>
                        <h4 className="font-medium">Can I skip this step and come back later?</h4>
                        <p className="text-sm text-neutral-400">
                          Yes, you can skip this step and return to it later from your dashboard.
                        </p>
                      </div>
                      <Separator className="bg-neutral-700" />
                      <div>
                        <h4 className="font-medium">What happens after I complete all tasks?</h4>
                        <p className="text-sm text-neutral-400">
                          You'll unlock additional features and move to the next step in your onboarding journey.
                        </p>
                      </div>
                      <Separator className="bg-neutral-700" />
                      <div>
                        <h4 className="font-medium">I need help with a specific task</h4>
                        <p className="text-sm text-neutral-400">
                          Contact our support team for personalized assistance.
                        </p>
                        <Button variant="link" className="mt-2 h-auto p-0 text-cyan-400 hover:text-cyan-300">
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
