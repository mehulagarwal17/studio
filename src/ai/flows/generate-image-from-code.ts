'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating an image from a code snippet.
 *
 * It takes a piece of code and generates a creative, visual representation of its logic or purpose.
 *
 * @interface GenerateImageFromCodeInput - Defines the input schema for the flow.
 * @interface GenerateImageFromCodeOutput - Defines the output schema for the flow.
 * @function generateImageFromCode - The main function that triggers the flow and returns the image data.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageFromCodeInputSchema = z.object({
  code: z.string().describe('The code snippet to visualize.'),
});
export type GenerateImageFromCodeInput = z.infer<
  typeof GenerateImageFromCodeInputSchema
>;

const GenerateImageFromCodeOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe('The data URI of the generated image.'),
});
export type GenerateImageFromCodeOutput = z.infer<
  typeof GenerateImageFromCodeOutputSchema
>;

export async function generateImageFromCode(
  input: GenerateImageFromCodeInput
): Promise<GenerateImageFromCodeOutput> {
  return generateImageFromCodeFlow(input);
}

const generateImageFromCodeFlow = ai.defineFlow(
  {
    name: 'generateImageFromCodeFlow',
    inputSchema: GenerateImageFromCodeInputSchema,
    outputSchema: GenerateImageFromCodeOutputSchema,
  },
  async ({ code }) => {
    const prompt = `
      Based on the following code, generate a visually compelling and artistic image that represents the code's core logic, purpose, or a creative metaphor for what it does.
      Think about data structures, algorithms, and the overall goal of the code.

      For example:
      - For sorting algorithms, you could show chaotic elements becoming ordered.
      - For recursive functions like factorial, you could create a spiral or nested pattern.
      - For a data fetching script, you could show data flowing from a cloud to a destination.

      Do not include any text, letters, or numbers in the image. The image should be purely symbolic and artistic.

      Code:
      \`\`\`
      ${code}
      \`\`\`
    `;

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image-preview',
      prompt: prompt,
      config: {
        responseModalities: ['IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed to return a URL.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
