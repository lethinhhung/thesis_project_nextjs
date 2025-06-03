import { Document } from "./document";

export interface Message {
  role: string;
  content: string;
  documents?: [Document];
}

export interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string; // Optional: if the message is from a tool
  tool_call_id?: string; // Optional: if the message is a tool call response
  // Add other relevant fields if your LLM API uses them
}
