'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { suggestDishesAction } from '@/app/actions';
import { type SuggestDishesOutput } from '@/ai/schemas';
import { Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  thoughts: z.string().min(10, "Please tell us a bit more about what you're feeling or craving."),
});

type DishSuggesterProps = {
  onSuggestionSelect: (dishName: string) => void;
};

export function DishSuggester({ onSuggestionSelect }: DishSuggesterProps) {
  const [suggestions, setSuggestions] = useState<SuggestDishesOutput['suggestions'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      thoughts: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const result = await suggestDishesAction(values);
      setSuggestions(result.suggestions);
    } catch (e: any) {
      setError(e.message || 'Failed to get suggestions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (dishName: string) => {
    onSuggestionSelect(dishName);
    setSuggestions(null); // Clear suggestions after selection
    form.reset(); // Reset the textarea
  };

  return (
    <section className="bg-card p-6 md:p-8 rounded-lg shadow-lg border border-border mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-xl md:text-2xl font-headline font-bold">NEED INSPIRATION?</h2>
      </div>
      <p className="text-muted-foreground -mt-2 mb-6 text-sm md:text-base">
        Tell us what's on your mind, and we'll suggest a few dishes for you!
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="thoughts"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are you craving or how are you feeling?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'A cozy meal for a rainy day' or 'Something quick and healthy after a workout'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting Ideas...
              </>
            ) : (
              'Suggest Dishes'
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <div className="mt-4">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        </div>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="mt-6">
          <h3 className="font-headline text-lg mb-4">Here are a few ideas. Click one to create the recipe!</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion) => (
              <Card
                key={suggestion.dish_name}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleSuggestionClick(suggestion.dish_name)}
              >
                <CardContent className="p-4">
                  <h4 className="font-bold">{suggestion.dish_name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                  <p className="text-xs text-muted-foreground mt-2 font-bold uppercase tracking-wider">Difficulty: {suggestion.difficulty}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
