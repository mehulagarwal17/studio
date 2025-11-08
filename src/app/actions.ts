'use server';

import {
  explainCodeStep,
  ExplainCodeStepInput,
} from '@/ai/flows/explain-code-step';
import { provideContextualGuidance } from '@/ai/flows/provide-contextual-guidance';
import { generateImageFromCode } from '@/ai/flows/generate-image-from-code';
import { chat, ChatInput } from '@/ai/flows/chat';
import { ExecutionStep } from '@/lib/types';

export async function getExplanation(
  step: ExecutionStep,
  code: string
): Promise<string> {
  try {
    const activeFrame = step.callStack[step.callStack.length - 1];
    if (!activeFrame) {
      return 'Execution has not started or has finished.';
    }

    const variables = {
      ...step.globals,
      ...activeFrame.locals,
    };

    // The AI doesn't need to see the function reference object.
    if (variables.factorial) delete variables.factorial;

    const input: ExplainCodeStepInput = {
      codeSnippet: code,
      lineNumber: step.highlightedLine,
      callStack: step.callStack.map((frame) => frame.name),
      variables: variables,
      output: step.output,
    };

    const result = await explainCodeStep(input);
    return result.explanation;
  } catch (error) {
    console.error('Error getting explanation:', error);
    return 'Could not get explanation for this step.';
  }
}

export async function getContextualGuidance(code: string): Promise<string[]> {
  try {
    const result = await provideContextualGuidance({
      code,
      language: 'Python',
    });
    return result.suggestions;
  } catch (error) {
    console.error('Error getting contextual guidance:', error);
    return ['Could not analyze code. Please try again.'];
  }
}

export async function getImageFromCode(code: string): Promise<string> {
  try {
    const result = await generateImageFromCode({ code });
    return result.imageUrl;
  } catch (error) {
    console.error('Error generating image from code:', error);
    // You might want a default or placeholder image URL here
    return '';
  }
}

export async function getChatbotResponse(input: ChatInput): Promise<string> {
  try {
    const result = await chat(input);
    return result.response;
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
