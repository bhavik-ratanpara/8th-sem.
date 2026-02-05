'use client';

import { useState, useEffect } from 'react';
import { createRecipeAction } from '@/app/actions';
import { Icons } from '@/components/icons';
import { RecipeForm } from '@/components/recipe-form';
import { RecipeDisplay } from '@/components/recipe-display';
import { type CreateRecipeInput, type CreateRecipeOutput } from '@/ai/schemas';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { DishSuggester } from '@/components/dish-suggester';

export default function Home() {
  const [recipe, setRecipe] = useState<CreateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [originalRecipeInput, setOriginalRecipeInput] = useState<CreateRecipeInput | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setIsClient(true);
  }, []);

  const handleGenerateRecipe = async (input: CreateRecipeInput) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    
    // Only save the base recipe details on the very first request.
    // Regeneration requests will have the `modifications` property.
    if (!input.modifications) {
      setOriginalRecipeInput(input);
    }

    try {
      const newRecipe = await createRecipeAction(input);
      setRecipe(newRecipe);
    } catch (e: any) {
      const errorMessage = e.message || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionSelect = (dishName: string) => {
    setSelectedDish(dishName);
    // Scroll to the recipe form
    document.getElementById('recipe-form')?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <header className="py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <Icons.Logo className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl md:text-5xl font-headline font-bold wave-text">
            {'COOKING LAB'.split('').map((letter, index) => (
              <span key={index}>{letter === ' ' ? '\u00A0' : letter}</span>
            ))}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-2xl mx-auto">
            Your personal AI chef. Create any recipe, for any number of people, from anywhere in the world.
          </p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">

          {isClient ? (
              <DishSuggester onSuggestionSelect={handleSuggestionSelect} />
            ) : (
              <Skeleton className="h-72 w-full mb-8" />
          )}

          <section id="recipe-form" className="bg-card p-6 md:p-8 rounded-lg shadow-lg border border-border">
            {isClient ? (
              <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} selectedDishName={selectedDish} />
            ) : (
              <div className="space-y-6">
                <Skeleton className="h-8 w-1/3" />
                <div className="grid md:grid-cols-2 gap-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}
          </section>

          {error && (
             <div className="mt-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
             </div>
          )}

          <section className="mt-8">
            <RecipeDisplay
              recipe={recipe}
              setRecipe={setRecipe}
              isLoading={isLoading}
              originalInput={originalRecipeInput}
              onRegenerate={handleGenerateRecipe}
            />
          </section>
        </div>
      </main>

      <footer className="text-center p-6 text-muted-foreground text-sm">
        <p>&copy; {currentYear} Cooking Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
