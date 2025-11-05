'use server';

/**
 * @fileOverview An AI agent that provides contextual guidance for code, highlighting potential errors or areas for improvement and linking to relevant documentation or learning resources.
 *
 * - provideContextualGuidance - A function that provides contextual guidance for code.
 * - ProvideContextualGuidanceInput - The input type for the provideContextualGuidance function.
 * - ProvideContextualGuidanceOutput - The return type for the provideContextualGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideContextualGuidanceInputSchema = z.object({
  code: z.string().describe('The code to analyze.'),
  language: z.string().describe('The programming language of the code.'),
});
export type ProvideContextualGuidanceInput = z.infer<
  typeof ProvideContextualGuidanceInputSchema
>;

const ProvideContextualGuidanceOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'A list of suggestions for improving the code, including potential errors, areas for improvement, and links to relevant documentation or learning resources.'
    ),
});
export type ProvideContextualGuidanceOutput = z.infer<
  typeof ProvideContextualGuidanceOutputSchema
>;

export async function provideContextualGuidance(
  input: ProvideContextualGuidanceInput
): Promise<ProvideContextualGuidanceOutput> {
  return provideContextualGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideContextualGuidancePrompt',
  input: {schema: ProvideContextualGuidanceInputSchema},
  output: {schema: ProvideContextualGuidanceOutputSchema},
  prompt: `You are an AI code assistant that analyzes code and provides contextual guidance.

  Your task is to identify potential errors, areas for improvement, and link to relevant documentation or learning resources for the given code.

  Consider common mistakes, best practices, and potential security vulnerabilities.

  Provide suggestions in a clear and concise manner.

  Language: {{{language}}}
  Code: {{{code}}}

  Suggestions:
  `,
});

const provideContextualGuidanceFlow = ai.defineFlow(
  {
    name: 'provideContextualGuidanceFlow',
    inputSchema: ProvideContextualGuidanceInputSchema,
    outputSchema: ProvideContextualGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
