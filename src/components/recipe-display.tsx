import { ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { RecipeCard } from './recipe-card';
import { useEffect, useState } from 'react';

type RecipeDisplayProps = {
  recipe: string | null;
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

export function RecipeDisplay({ recipe, isLoading }: RecipeDisplayProps) {
  const [displayedRecipe, setDisplayedRecipe] = useState('');
  
  useEffect(() => {
    if (!recipe) return;

    let charIndex = 0;
    setDisplayedRecipe('');

    const intervalId = setInterval(() => {
      setDisplayedRecipe(prev => prev + recipe[charIndex]);
      charIndex++;
      if (charIndex >= recipe.length) {
        clearInterval(intervalId);
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [recipe]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-headline font-semibold text-center text-primary">Crafting your recipe...</h2>
        <RecipeSkeleton />
      </div>
    );
  }

  if (!recipe) {
    return (
       <div className="text-center py-10 px-4 border-2 border-dashed border-border rounded-lg bg-card/50">
        <ChefHat className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Your generated recipe will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <RecipeCard recipeString={displayedRecipe} />
    </div>
  );
}
