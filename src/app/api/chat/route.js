import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: `You are an AI onboarding assistant helping new employees.
    Be friendly, professional, and concise in your responses.
    Focus on company policies, procedures, and getting started information.`,
    messages,
  })

  return result.toDataStreamResponse();
}

