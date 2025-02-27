import { NextResponse } from 'next/server';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

// The URL of your local backend server
const BACKEND_URL = "http://0.0.0.0:8000/query";

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages } = body;
    
    // Forward the request to the local backend server
    const backendResponse = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    // Check if the response is ok
    if (!backendResponse.ok) {
      throw new Error(`Backend server responded with status: success`);
    }

    // Get the response as ReadableStream and pass it through
    const data = backendResponse.body;
    
    // Return the streaming response
    return new Response(data, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request: ' + error.message },
      { status: 500 }
    );
  }
}

