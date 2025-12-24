'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createRecipeAction } from '@/app/actions';
import { Icons } from '@/components/icons';
import { RecipeForm } from '@/components/recipe-form';
import { RecipeDisplay } from '@/components/recipe-display';
import { type CreateRecipeInput } from '@/ai/flows/create-recipe-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [recipe, setRecipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleGenerateRecipe = async (input: CreateRecipeInput) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
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

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="py-12">
        <div className="container mx-auto px-4 text-center">
          <Icons.Logo className="w-20 h-20 mx-auto mb-4 text-primary" />
          <h1 className="text-5xl md:text-6xl font-headline font-bold">
            COOKING LAB
          </h1>
          <p className="text-muted-foreground mt-2 text-lg max-w-2xl mx-auto">
            Your personal AI chef. Create any recipe, for any number of people, from anywhere in the world.
          </p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <section className="bg-card p-6 md:p-8 rounded-lg shadow-lg border border-border">
            <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} />
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
            <RecipeDisplay recipe={recipe} isLoading={isLoading} />
          </section>
        </div>
      </main>

      <footer className="text-center p-6 text-muted-foreground text-sm">
        <p>&copy; {currentYear} Cooking Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
