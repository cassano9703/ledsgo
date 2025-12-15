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
  signText: z.string().describe('El texto que se mostrará en el letrero LED.'),
  font: z.string().describe('La fuente del texto en el letrero LED.'),
  size: z.string().describe('El tamaño del letrero LED.'),
  color: z.string().describe('El color del letrero LED.'),
  additionalDetails: z.string().optional().describe('Cualquier detalle adicional sobre el diseño del letrero LED deseado.'),
});
export type DesignSuggestionInput = z.infer<typeof DesignSuggestionInputSchema>;

const DesignSuggestionOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('Un array de sugerencias de diseño para mejorar el diseño del letrero LED basadas en las tendencias actuales.'),
});
export type DesignSuggestionOutput = z.infer<typeof DesignSuggestionOutputSchema>;

export async function generateDesignSuggestion(input: DesignSuggestionInput): Promise<DesignSuggestionOutput> {
  return designSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'designSuggestionPrompt',
  input: {schema: DesignSuggestionInputSchema},
  output: {schema: DesignSuggestionOutputSchema},
  config: {
    model: 'googleai/gemini-2.5-flash',
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
       {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
  prompt: `Eres un experto en diseño de letreros LED, con un gran ojo para las tendencias de diseño actuales.

  Basado en el siguiente diseño de letrero LED, proporciona una lista de sugerencias para mejorar el diseño y hacerlo más atractivo y moderno. Ten en cuenta las tendencias de diseño actuales.

  Texto del Letrero: {{{signText}}}
  Fuente: {{{font}}}
  Tamaño: {{{size}}}
  Color: {{{color}}}
  {{#if additionalDetails}}
  Detalles Adicionales: {{{additionalDetails}}}
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
    const response = await prompt(sanitizedInput);
    return response.output!;
  }
);
