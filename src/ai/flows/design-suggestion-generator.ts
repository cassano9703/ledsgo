'use server';

/**
 * @fileOverview AI-powered design suggestion generator for LED signs.
 *
 * - generateDesignSuggestion - A function that generates design suggestions based on current trends.
 * - DesignSuggestionInput - The input type for the generateDesignSuggestion function.
 * - DesignSuggestionOutput - The return type for the generateDesignSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DesignSuggestionInputSchema = z.object({
  signText: z.string().describe('The text to be displayed on the LED sign.'),
  font: z.string().describe('The font of the text on the LED sign.'),
  size: z.string().describe('The size of the LED sign.'),
  color: z.string().describe('The color of the LED sign.'),
  additionalDetails: z.string().optional().describe('Any additional details about the desired LED sign design.'),
});
export type DesignSuggestionInput = z.infer<typeof DesignSuggestionInputSchema>;

const DesignSuggestionOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of design suggestions to improve the LED sign design based on current trends.'),
});
export type DesignSuggestionOutput = z.infer<typeof DesignSuggestionOutputSchema>;

export async function generateDesignSuggestion(input: DesignSuggestionInput): Promise<DesignSuggestionOutput> {
  return designSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'designSuggestionPrompt',
  input: {schema: DesignSuggestionInputSchema},
  output: {schema: DesignSuggestionOutputSchema},
  prompt: `You are an expert in LED sign design, with a keen eye for current design trends.

  Based on the following LED sign design, provide a list of suggestions to improve the design and make it more visually appealing and modern. Take current design trends into consideration.

  Sign Text: {{{signText}}}
  Font: {{{font}}}
  Size: {{{size}}}
  Color: {{{color}}}
  {{#if additionalDetails}}
  Additional Details: {{{additionalDetails}}}
  {{/if}}
  `,
});

const designSuggestionFlow = ai.defineFlow(
  {
    name: 'designSuggestionFlow',
    inputSchema: DesignSuggestionInputSchema,
    outputSchema: DesignSuggestionOutputSchema,
  },
  async input => {
    // Ensure we don't send empty strings for optional fields, which can confuse the model.
    const sanitizedInput = {
      ...input,
      additionalDetails: input.additionalDetails || undefined,
    };
    const {output} = await prompt(sanitizedInput);
    return output!;
  }
);
