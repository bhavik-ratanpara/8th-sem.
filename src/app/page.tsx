
'use client';

import { useState, useEffect } from 'react';
import { createRecipeAction } from '@/app/actions';
import { RecipeForm } from '@/components/recipe-form';
import { RecipeDisplay } from '@/components/recipe-display';
import { type CreateRecipeInput, type CreateRecipeOutput } from '@/ai/schemas';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Lock, LogIn, ChefHat, Sparkles, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { DishSuggester } from '@/components/dish-suggester';
import { useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  const [recipe, setRecipe] = useState<CreateRecipeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [originalRecipeInput, setOriginalRecipeInput] = useState<CreateRecipeInput | null>(null);

  const { user, isUserLoading } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGenerateRecipe = async (input: CreateRecipeInput) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    
    if (!input.modifications) {
      setOriginalRecipeInput(input);
    }

    try {
      const newRecipe = await createRecipeAction(input);
      setRecipe(newRecipe);
      setTimeout(() => {
        document.getElementById('recipe-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (e: any) {
      setError(e.message || 'Academy Intelligence Error: Failed to generate masterpiece.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionSelect = (dishName: string) => {
    setSelectedDish(dishName);
    document.getElementById('recipe-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
        <div className="container mx-auto px-4 text-center relative z-10 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-[0.2em] border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4" />
            Premier Culinary Intelligence
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-bold mb-8 max-w-5xl mx-auto leading-[1.1] italic">
            Master the Art of <span className="text-primary not-italic">High Cuisine</span>
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            Enter the elite digital laboratory where professional chef knowledge meets high-precision AI. 
            Craft, refine, and master any masterpiece with absolute technical accuracy.
          </p>
          {!user && (
            <div className="mt-14 flex flex-wrap justify-center gap-6">
              <Button asChild className="btn-premium text-sm bg-primary hover:bg-primary/90 text-background h-14" size="lg">
                <Link href="/signup">Establish Chef Profile</Link>
              </Button>
              <Button asChild variant="outline" className="btn-premium text-sm border-primary/40 text-primary hover:bg-primary/5 h-14" size="lg">
                <Link href="/login">Return to Academy</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <main className="container mx-auto px-4 pb-32">
        <div className="max-w-5xl mx-auto">
          {isUserLoading ? (
            <div className="space-y-12">
              <Skeleton className="h-96 w-full rounded-2xl bg-card" />
              <Skeleton className="h-[600px] w-full rounded-2xl bg-card" />
            </div>
          ) : user ? (
            <div className="space-y-24">
              <DishSuggester onSuggestionSelect={handleSuggestionSelect} />

              <div id="recipe-form" className="scroll-mt-32">
                <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} selectedDishName={selectedDish} />
              </div>

              {error && (
                 <div className="animate-slide-up">
                    <Alert variant="destructive" className="rounded-xl border-destructive/50 bg-destructive/5">
                        <AlertCircle className="h-5 w-5" />
                        <AlertTitle className="font-headline text-xl italic">Academy Intelligence Alert</AlertTitle>
                        <AlertDescription className="text-base mt-2">
                            {error}
                        </AlertDescription>
                    </Alert>
                 </div>
              )}

              <div id="recipe-section" className="scroll-mt-32">
                <RecipeDisplay
                  recipe={recipe}
                  setRecipe={setRecipe}
                  isLoading={isLoading}
                  originalInput={originalRecipeInput}
                  onRegenerate={handleGenerateRecipe}
                />
              </div>
            </div>
          ) : (
            <Card className="academy-card border-dashed border-2 bg-card/40 backdrop-blur-xl py-16 px-8 text-center max-w-2xl mx-auto">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-6 rounded-full w-fit mb-8 border border-primary/20">
                  <Lock className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-4xl font-headline font-bold mb-4 italic">Academy Credential Required</CardTitle>
                <CardDescription className="text-xl font-medium">
                  Professional-grade recipes and academy intelligence are reserved for registered practitioners.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <BookOpen className="h-7 w-7 text-primary/60 mx-auto" />
                    <p className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Master Recipes</p>
                  </div>
                  <div className="space-y-3">
                    <Sparkles className="h-7 w-7 text-primary/60 mx-auto" />
                    <p className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Smart Curation</p>
                  </div>
                  <div className="space-y-3">
                    <ChefHat className="h-7 w-7 text-primary/60 mx-auto" />
                    <p className="font-bold text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Academy Tips</p>
                  </div>
                </div>
                <Button asChild className="btn-premium bg-primary text-background h-14 w-full" size="lg">
                  <Link href="/login">
                    <LogIn className="mr-3 h-5 w-5" />
                    Authenticate Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
