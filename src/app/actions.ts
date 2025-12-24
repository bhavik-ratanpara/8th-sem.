'use server';

import { createRecipe, type CreateRecipeInput } from '@/ai/flows/create-recipe-flow';
import { z } from 'zod';

const RecipeSchema = z.object({
    dishName: z.string().min(1, 'Dish name is required.'),
    servings: z.coerce.number().min(1, 'Number of servings must be at least 1.'),
    location: z.string().min(1, 'State, Country is required.'),
    language: z.string().min(1, 'Language is required.'),
    diet: z.enum(['Vegetarian', 'Non-Vegetarian']),
});

export async function createRecipeAction(input: CreateRecipeInput): Promise<string> {
  const validationResult = RecipeSchema.safeParse(input);

  if (!validationResult.success) {
    throw new Error(validationResult.error.errors.map(e => e.message).join(', '));
  }

  try {
    const result = await createRecipe(validationResult.data);
    return result.recipe;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw new Error('An unexpected error occurred while generating the recipe. Please try again later.');
  }
}
