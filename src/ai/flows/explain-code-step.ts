'use server';

/**
 * @fileOverview This file defines a Genkit flow for explaining a single step of code execution.
 *
 * It takes the current state of the code (line number, variables, etc.) and generates
 * a human-readable explanation of what is happening in that step.
 *
 * @interface ExplainCodeStepInput - Defines the input schema for the explainCodeStep flow.
 * @interface ExplainCodeStepOutput - Defines the output schema for the explainCodeStep flow.
 * @function explainCodeStep - The main function that triggers the flow and returns the explanation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCodeStepInputSchema = z.object({
  lineNumber: z.number().describe('The current line number being executed.'),
  variables: z.record(z.any()).describe('A map of variable names to their current values.'),
  callStack: z.array(z.string()).describe('The current function call stack.'),
  output: z.string().describe('The console output or errors generated so far.'),
  codeSnippet: z.string().describe('The code snippet being executed.'),
});
export type ExplainCodeStepInput = z.infer<typeof ExplainCodeStepInputSchema>;

const ExplainCodeStepOutputSchema = z.object({
  explanation: z.string().describe('A human-readable explanation of the current code execution step.'),
});
export type ExplainCodeStepOutput = z.infer<typeof ExplainCodeStepOutputSchema>;

export async function explainCodeStep(input: ExplainCodeStepInput): Promise<ExplainCodeStepOutput> {
  return explainCodeStepFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainCodeStepPrompt',
  input: {schema: ExplainCodeStepInputSchema},
  output: {schema: ExplainCodeStepOutputSchema},
  prompt: `You are an expert code tutor, skilled at explaining code execution in simple terms.

  Given the following information about the current step of code execution, generate a concise and clear explanation of what is happening.

  Code Snippet:
  ```
  {{{codeSnippet}}}
  ```

  Line Number: {{{lineNumber}}}

  Variables: {{#each variables}}{{{@key}}} = {{{this}}}\n{{/each}}

  Call Stack: {{#each callStack}}{{{this}}}\n{{/each}}

  Console Output: {{{output}}}

  Explanation:`,
});

const explainCodeStepFlow = ai.defineFlow(
  {
    name: 'explainCodeStepFlow',
    inputSchema: ExplainCodeStepInputSchema,
    outputSchema: ExplainCodeStepOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
