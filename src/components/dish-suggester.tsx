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
import { Loader2, Sparkles, ChefHat, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';

const formSchema = z.object({
  thoughts: z.string().min(10, "Provide a more descriptive context."),
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
      setError(e.message || 'Analysis failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (dishName: string) => {
    onSuggestionSelect(dishName);
    setSuggestions(null);
    form.reset();
  };

  return (
    <div className="space-y-8">
      <div className="saas-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Culinary Intelligence</h2>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="thoughts"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your context, mood, or available resources..."
                      className="input-saas h-24 bg-muted/30"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} variant="outline" className="w-full text-xs font-semibold h-9 uppercase tracking-wider">
              {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                'Run Analysis'
              )}
            </Button>
          </form>
        </Form>
      </div>

      {error && (
        <Alert variant="destructive" className="text-xs py-2 px-3 rounded-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Recommendations</h3>
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.dish_name}
                className="saas-card p-4 cursor-pointer hover:bg-muted/50 transition-colors group"
                onClick={() => handleSuggestionClick(suggestion.dish_name)}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">{suggestion.dish_name}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                    {suggestion.difficulty}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{suggestion.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}