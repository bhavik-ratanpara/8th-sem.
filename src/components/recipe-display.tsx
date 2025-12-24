import { ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';
import { RecipeCard } from './recipe-card';

type RecipeDisplayProps = {
  recipes: string[];
  isLoading: boolean;
  error: string | null;
};

const RecipeSkeleton = () => (
  <Card className="overflow-hidden">
    <CardHeader>
      <Skeleton className="h-7 w-3/4 rounded-md" />
    </CardHeader>
    <CardContent className="space-y-6">
      <div>
        <Skeleton className="h-5 w-1/4 mb-3 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
        </div>
      </div>
      <Separator />
      <div>
        <Skeleton className="h-5 w-1/3 mb-3 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export function RecipeDisplay({ recipes, isLoading, error }: RecipeDisplayProps) {
  if (isLoading) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-headline font-semibold text-center">Finding the best recipes for you...</h2>
        <RecipeSkeleton />
        <RecipeSkeleton />
      </div>
    );
  }

  if (error && recipes.length === 0) {
    return (
      <div className="text-center py-10 px-4 border border-dashed rounded-lg">
        <p className="text-destructive font-semibold">{error}</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-10 px-4 border border-dashed rounded-lg bg-card">
        <ChefHat className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Your recipe suggestions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-headline font-bold text-center">Your Recipes</h2>
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipeString={recipe} />
      ))}
    </div>
  );
}
