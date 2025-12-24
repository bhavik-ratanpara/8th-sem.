'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getRecipesAction } from '@/app/actions';
import { Icons } from '@/components/icons';
import { IngredientForm } from '@/components/ingredient-form';
import { RecipeDisplay } from '@/components/recipe-display';

export default function Home() {
  const [recipes, setRecipes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateRecipes = async (ingredients: string) => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);
    try {
      const newRecipes = await getRecipesAction(ingredients);
      if (newRecipes.length === 0) {
        setError('No recipes found. Try adding more ingredients or changing your selection.');
      } else {
        setRecipes(newRecipes);
      }
    } catch (e: any) {
      const errorMessage = e.message || 'An unexpected error occurred.';
      setError(errorMessage);
      toast({
        title: 'Error Generating Recipes',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold flex items-center justify-center gap-3 text-foreground">
            <Icons.Logo className="w-10 h-10 md:w-12 md:h-12 text-primary" />
            FridgeRecipe
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Turn your ingredients into delicious meals.
          </p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <section className="bg-card p-6 md:p-8 rounded-lg shadow-sm border">
            <IngredientForm onSubmit={handleGenerateRecipes} isLoading={isLoading} />
          </section>

          <section className="mt-8">
            <RecipeDisplay recipes={recipes} isLoading={isLoading} error={error} />
          </section>
        </div>
      </main>

      <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} FridgeRecipe. All rights reserved.</p>
      </footer>
    </div>
  );
}
