'use server';

/**
 * @fileOverview A conversational AI agent for the AI Mentor feature.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest user message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe('The AI\'s response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ history, message }) => {
    const { output } = await ai.generate({
      prompt: message,
      history: history.map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }],
      })),
      system:
        'You are an expert code tutor and AI assistant named CodeSight Mentor. Your goal is to help users understand code, learn programming concepts, and debug their work. Be friendly, encouraging, and provide clear, concise explanations.',
    });

    return {
      response: output.message.content[0].text,
    };
  }
);
