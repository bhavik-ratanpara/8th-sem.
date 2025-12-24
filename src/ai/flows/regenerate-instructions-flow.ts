'use server';

/**
 * @fileOverview An AI agent for regenerating recipe instructions.
 *
 * - regenerateInstructions - A function that handles regenerating instructions.
 */

import {ai} from '@/ai/genkit';
import { RegenerateInstructionsInputSchema, RegenerateInstructionsOutputSchema, type RegenerateInstructionsInput, type RegenerateInstructionsOutput } from '@/ai/schemas';


export async function regenerateInstructions(input: RegenerateInstructionsInput): Promise<RegenerateInstructionsOutput> {
  return regenerateInstructionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regenerateInstructionsPrompt',
  input: {schema: RegenerateInstructionsInputSchema},
  output: {schema: RegenerateInstructionsOutputSchema},
  prompt: `You are an expert chef. The user has removed some ingredients from a recipe and needs new instructions.

Dish Name: {{{dishName}}}
Remaining Ingredients: 
{{#each ingredients}}
- {{{this}}}
{{/each}}

Please generate new step-by-step instructions for the dish using only the remaining ingredients. Provide the instructions in markdown format.
`,
});

const regenerateInstructionsFlow = ai.defineFlow(
  {
    name: 'regenerateInstructionsFlow',
    inputSchema: RegenerateInstructionsInputSchema,
    outputSchema: RegenerateInstructionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
