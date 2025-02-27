import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { NextResponse } from 'next/server';

export const maxDuration = 30;

// Collection of markdown-formatted dummy responses
const dummyResponses = [
  {
    content: `## Welcome to Onboarding! 👋
    
It's great to have you join our team. I'm Axel, your AI onboarding assistant.

Here's what I can help you with:
* Setting up your development environment
* Accessing company resources
* Understanding company policies
* Completing required documentation

What would you like to know about first?`
  },
  {
    content: `### Development Environment Setup

To get your development environment ready:

1. **Install Required Tools**
   - Visual Studio Code
   - Node.js v18+
   - Git

2. **Clone the Repository**
   \`\`\`bash
   git clone https://github.com/company/main-repo.git
   cd main-repo
   npm install
   \`\`\`

3. **Set Environment Variables**
   Create a \`.env.local\` file with:
   \`\`\`
   API_KEY=dev_123456
   DATABASE_URL=localhost:5432
   \`\`\`

Need help with any of these steps?`
  },
  {
    content: `### Team Meeting Schedule

Here's your meeting schedule for this week:

| Meeting | Time | Location |
|---------|------|----------|
| Team Welcome | Mon 9:00 AM | Zoom Room 1 |
| Technical Onboarding | Tue 2:00 PM | Slack Huddle |
| Project Overview | Wed 11:00 AM | Meeting Room 3 |
| HR Check-in | Fri 10:30 AM | HR Office |

All calendar invites have been sent to your email. Would you like me to send you the Zoom links?`
  },
  {
    content: `### Required Documentation

Please submit the following documents to HR:

- [x] Employment contract (signed)
- [ ] Tax information form
- [ ] Direct deposit details
- [ ] Emergency contact information

You can upload these through the HR portal at **[hr.company.com/onboarding](https://hr.company.com/onboarding)** using your company credentials.

The deadline for submission is **Friday, March 22nd**. Let me know if you have any questions!`
  },
  {
    content: `### Company Resources

Here are some helpful resources:

* 📚 **Company Wiki**: [wiki.company.com](https://wiki.company.com)
* 💬 **Slack Channels**: #general, #engineering, #random
* 🔧 **Tech Support**: [support.company.com](https://support.company.com)
* 🗓️ **Booking Meeting Rooms**: [rooms.company.com](https://rooms.company.com)

Our IT department is also available at help@company.com if you need any assistance.`
  },
  {
    content: `### First Week Tips

Some helpful tips for your first week:

> 💡 **Pro Tip**: Set up your development environment on day one.

> 💡 **Pro Tip**: Add all team members to your Slack connections.

> 💡 **Pro Tip**: Review the product documentation before your first meeting.

> 💡 **Pro Tip**: Schedule 1:1s with your immediate team members.

Would you like me to help you schedule these 1:1 meetings?`
  }
];

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    // Get the last user message
    const userMessage = messages[messages.length - 1];
    
    // Add a small artificial delay (300-800ms) to simulate processing
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));
    
    // Select a random response from our collection
    const response = dummyResponses[Math.floor(Math.random() * dummyResponses.length)];
    
    return NextResponse.json({
      role: "assistant",
      content: response.content
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

