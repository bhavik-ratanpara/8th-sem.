'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  ingredients: z.string().min(3, 'Please list at least one ingredient.').max(500, 'Ingredient list is too long.'),
});

type IngredientFormProps = {
  onSubmit: (ingredients: string) => void;
  isLoading: boolean;
};

export function IngredientForm({ onSubmit, isLoading }: IngredientFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ingredients: '' },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.ingredients);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-headline">What's in your fridge?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., chicken breast, broccoli, garlic, olive oil"
                  className="min-h-[120px] text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the ingredients you have on hand, separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Recipes'
          )}
        </Button>
      </form>
    </Form>
  );
}
