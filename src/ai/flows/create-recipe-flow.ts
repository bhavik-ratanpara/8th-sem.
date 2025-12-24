'use server';

/**
 * @fileOverview A recipe generation AI agent.
 *
 * - createRecipe - A function that handles the recipe creation process.
 * - CreateRecipeInput - The input type for the createRecipe function.
 * - CreateRecipeOutput - The return type for the createRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateRecipeInputSchema = z.object({
  dishName: z.string().describe('The name of the dish to create a recipe for.'),
  servings: z.number().describe('The number of servings the recipe should be for.'),
  location: z.string().describe('The state and country to tailor the recipe to (e.g., for local ingredients).'),
  language: z.string().describe('The language the recipe should be written in.'),
  diet: z.enum(['Vegetarian', 'Non-Vegetarian']).describe('The dietary preference.'),
});
export type CreateRecipeInput = z.infer<typeof CreateRecipeInputSchema>;

const CreateRecipeOutputSchema = z.object({
  recipe: z.string().describe('The generated recipe in a markdown format, including title, ingredients, and instructions.'),
});
export type CreateRecipeOutput = z.infer<typeof CreateRecipeOutputSchema>;

export async function createRecipe(input: CreateRecipeInput): Promise<CreateRecipeOutput> {
  return createRecipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createRecipePrompt',
  input: {schema: CreateRecipeInputSchema},
  output: {schema: CreateRecipeOutputSchema},
  prompt: `You are an expert chef. Create a recipe for the following dish:

Dish Name: {{{dishName}}}
Number of Servings: {{{servings}}}
State, Country: {{{location}}}
Language: {{{language}}}
Dietary Preference: {{{diet}}}

Please provide the recipe in markdown format with a title, a list of ingredients, and step-by-step instructions.
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
