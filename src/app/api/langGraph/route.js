// In your API route
import { streamText } from 'ai';

export async function POST(req) {
  const { messages, user_id, name } = await req.json();

  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("question", messages[messages.length - 1].content);
  formData.append("name", name);

  // Connect to your LangGraph backend
  const response = await fetch("http://0.0.0.0:8000/query", {
    method: "POST",
    body: formData,
  });

  const stream = await streamText(response.body); // SSE
  console.log(stream);
  return new Response(stream);
}