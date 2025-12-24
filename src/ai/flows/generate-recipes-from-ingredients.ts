'use server';

/**
 * @fileOverview Generates recipes based on a list of ingredients provided by the user.
 *
 * - generateRecipes - A function that takes a list of ingredients and returns recipe suggestions.
 * - GenerateRecipesInput - The input type for the generateRecipes function.
 * - GenerateRecipesOutput - The return type for the generateRecipes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipesInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has available.'),
});

export type GenerateRecipesInput = z.infer<typeof GenerateRecipesInputSchema>;

const GenerateRecipesOutputSchema = z.object({
  recipes: z
    .array(z.string())
    .describe('An array of recipe suggestions based on the provided ingredients.'),
});

export type GenerateRecipesOutput = z.infer<typeof GenerateRecipesOutputSchema>;

export async function generateRecipes(input: GenerateRecipesInput): Promise<GenerateRecipesOutput> {
  return generateRecipesFlow(input);
}

const generateRecipesPrompt = ai.definePrompt({
  name: 'generateRecipesPrompt',
  input: {schema: GenerateRecipesInputSchema},
  output: {schema: GenerateRecipesOutputSchema},
  prompt: `You are a helpful recipe assistant. Given the following ingredients, suggest some recipes that the user can make.

Ingredients: {{{ingredients}}}

Recipes:`,
});

const generateRecipesFlow = ai.defineFlow(
  {
    name: 'generateRecipesFlow',
    inputSchema: GenerateRecipesInputSchema,
    outputSchema: GenerateRecipesOutputSchema,
  },
  async input => {
    const {output} = await generateRecipesPrompt(input);
    return output!;
  }
);
