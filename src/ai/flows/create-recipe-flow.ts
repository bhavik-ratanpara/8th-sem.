'use server';

/**
 * @fileOverview A recipe generation AI agent.
 *
 * - createRecipe - A function that handles the recipe creation process.
 */

import {ai} from '@/ai/genkit';
import { CreateRecipeInputSchema, CreateRecipeOutputSchema, type CreateRecipeInput, type CreateRecipeOutput } from '@/ai/schemas';

export async function createRecipe(input: CreateRecipeInput): Promise<CreateRecipeOutput> {
  return createRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createRecipePrompt',
  input: {schema: CreateRecipeInputSchema},
  output: {schema: CreateRecipeOutputSchema},
  prompt: `You are an expert chef. Create a recipe for the following dish. 
  
The entire output, including the title, description, ingredients, and instructions, must be in the specified language.
The step-by-step instructions must be a numbered list in markdown format. Each step must be on a new line (e.g., 1. Chop vegetables.\\n2. Heat oil.).

Dish Name: {{{dishName}}}
Number of Servings: {{{servings}}}
State, Country: {{{location}}}
Language: {{{language}}}
Dietary Preference: {{{diet}}}
`,
});

const createRecipeFlow = ai.defineFlow(
  {
    name: 'createRecipeFlow',
    inputSchema: CreateRecipeInputSchema,
    outputSchema: CreateRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
