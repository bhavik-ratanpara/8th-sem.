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
The step-by-step instructions must be a numbered list in markdown format. Crucially, each step must be separated by a newline character (\\n).
For example: "1. Do this.\\n2. Do that.\\n3. Do another thing."
For ingredients, provide the name, quantity, and unit for each item.

Dish Name: {{{dishName}}}
Number of Servings: {{{servings}}}
State, Country: {{{location}}}
Language: {{{language}}}
Dietary Preference: {{{diet}}}
{{#if modifications}}
CRITICAL INSTRUCTION: The user has provided specific modifications. You MUST follow these instructions exactly as written. They are absolute requirements, not suggestions. Failure to adhere to these constraints will result in a failed task.
Constraints to follow: {{{modifications}}}
{{/if}}
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
    // Ensure the output includes the original servings count
    if (output) {
      output.servings = input.servings;
    }
    return output!;
  }
);
