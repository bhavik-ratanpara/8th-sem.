'use server';

import { generateRecipes } from '@/ai/flows/generate-recipes-from-ingredients';
import { z } from 'zod';

const IngredientsSchema = z.string().min(3, 'Please enter at least one ingredient.').max(500, 'Ingredient list is too long.');

export async function getRecipesAction(ingredients: string): Promise<string[]> {
  const validationResult = IngredientsSchema.safeParse(ingredients);

  if (!validationResult.success) {
    throw new Error(validationResult.error.errors[0].message);
  }

  try {
    const result = await generateRecipes({ ingredients: validationResult.data });
    return result.recipes || [];
  } catch (error) {
    console.error('Error generating recipes:', error);
    // Return a user-friendly error message
    throw new Error('Failed to connect to the recipe service. Please try again later.');
  }
}
