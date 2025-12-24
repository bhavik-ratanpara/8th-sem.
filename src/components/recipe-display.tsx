'use client';

import { ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { RecipeCard } from './recipe-card';
import { useEffect, useState } from 'react';
import { type CreateRecipeOutput, type Ingredient } from '@/ai/schemas';
import { regenerateInstructionsAction } from '@/app/actions';

type RecipeDisplayProps = {
  recipe: CreateRecipeOutput | null;
  setRecipe: (recipe: CreateRecipeOutput | null) => void;
  isLoading: boolean;
};

const RecipeSkeleton = () => (
  <Card className="overflow-hidden">
    <CardHeader>
      <Skeleton className="h-8 w-1/2 rounded-md" />
    </CardHeader>
    <CardContent className="space-y-6">
       <div className="space-y-2">
          <Skeleton className="h-4 w-1/4 rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
        </div>
       <div className="space-y-2">
          <Skeleton className="h-4 w-1/3 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
        </div>
    </CardContent>
  </Card>
);

export function RecipeDisplay({ recipe, setRecipe, isLoading }: RecipeDisplayProps) {
  const [displayedRecipe, setDisplayedRecipe] = useState<CreateRecipeOutput | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [ingredientsChanged, setIngredientsChanged] = useState(false);
  const [servings, setServings] = useState(1);

  useEffect(() => {
    if (recipe) {
      setDisplayedRecipe(recipe);
      setServings(recipe.servings);
      setIngredientsChanged(false);
    } else {
      setDisplayedRecipe(null);
    }
  }, [recipe]);

  const handleIngredientRemove = (ingredientToRemove: Ingredient) => {
    if (!displayedRecipe) return;

    const newIngredients = displayedRecipe.ingredients.filter(
      (ingredient) => ingredient.name !== ingredientToRemove.name
    );
    setDisplayedRecipe({ ...displayedRecipe, ingredients: newIngredients });
    setIngredientsChanged(true);
  };
  
  const handleRegenerate = async () => {
    if (!displayedRecipe) return;
    setIsRegenerating(true);
    try {
        const newInstructions = await regenerateInstructionsAction({
            dishName: displayedRecipe.title,
            ingredients: displayedRecipe.ingredients.map(i => i.name),
        });
        setDisplayedRecipe({ ...displayedRecipe, instructions: newInstructions });
        setIngredientsChanged(false);
    } catch (error) {
        console.error("Failed to regenerate instructions", error);
        // Optionally, show an error to the user
    } finally {
        setIsRegenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-headline font-semibold text-center text-primary">Crafting your recipe...</h2>
        <RecipeSkeleton />
      </div>
    );
  }

  if (!displayedRecipe) {
    return (
       <div className="text-center py-10 px-4 border-2 border-dashed border-border rounded-lg bg-card/50">
        <ChefHat className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Your generated recipe will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <RecipeCard 
        recipe={displayedRecipe} 
        onIngredientRemove={handleIngredientRemove}
        onRegenerate={handleRegenerate}
        isRegenerating={isRegenerating}
        ingredientsChanged={ingredientsChanged}
        servings={servings}
        onServingsChange={setServings}
      />
    </div>
  );
}
