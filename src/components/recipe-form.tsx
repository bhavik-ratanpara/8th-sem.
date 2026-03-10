
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Utensils, MapPin, Languages, Users, Vegan, Beef, Sparkles, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { type CreateRecipeInput } from '@/ai/schemas';
import { useEffect } from 'react';

const formSchema = z.object({
  dishName: z.string().min(1, 'Identify the master dish name.'),
  servings: z.coerce.number().min(1, 'Minimum 1 serving required.'),
  location: z.string().min(1, 'Regional context is required.'),
  language: z.string().min(1, 'Specify preferred language.'),
  diet: z.enum(['Vegetarian', 'Non-Vegetarian'], { required_error: 'Select dietary preference.' }),
});

type RecipeFormProps = {
  onSubmit: (values: CreateRecipeInput) => void;
  isLoading: boolean;
  selectedDishName?: string | null;
};

export function RecipeForm({ onSubmit, isLoading, selectedDishName }: RecipeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dishName: '',
      servings: undefined,
      location: '',
      language: 'English',
      diet: 'Vegetarian',
    },
  });
  
  useEffect(() => {
    if (selectedDishName) {
      form.setValue('dishName', selectedDishName);
    }
  }, [selectedDishName, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };

  return (
    <div className="academy-card p-10 md:p-14 animate-slide-up">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-12">
          <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-widest border border-primary/20">
                <ChefHat className="w-3.5 h-3.5" />
                Recipe Initialization
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold italic">Initialize Your Masterpiece</h2>
              <p className="text-muted-foreground text-base max-w-xl font-medium">
                Configure the technical parameters for your next culinary project. Our Academy intelligence will tailor the results to your exact specifications.
              </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <FormField
              control={form.control}
              name="dishName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    <Utensils size={12} className="text-primary" /> Master Dish Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Osso Buco alla Milanese" className="input-glow h-12 text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    <Users size={12} className="text-primary" /> Serving Count
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="4" className="input-glow h-12 text-base" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    <MapPin size={12} className="text-primary" /> Regional Origin
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Lombardy, Italy" className="input-glow h-12 text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    <Languages size={12} className="text-primary" /> Output Language
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="English" className="input-glow h-12 text-base" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="diet"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Dietary Specification</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 px-8 py-5 rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer flex-1 group">
                      <FormControl>
                        <RadioGroupItem value="Vegetarian" className="border-primary" />
                      </FormControl>
                      <FormLabel className="font-bold flex items-center gap-3 cursor-pointer text-sm">
                        <Vegan className="text-primary w-5 h-5" /> Vegetarian Focus
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 px-8 py-5 rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer flex-1 group">
                      <FormControl>
                        <RadioGroupItem value="Non-Vegetarian" className="border-primary" />
                      </FormControl>
                      <FormLabel className="font-bold flex items-center gap-3 cursor-pointer text-sm">
                        <Beef className="text-primary w-5 h-5" /> Comprehensive Diet
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="btn-premium w-full h-16 text-sm bg-primary hover:bg-primary/90 text-background">
            {isLoading ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Processing Academy Intelligence...
              </>
            ) : (
              <span className="flex items-center gap-2">Initialize Recipe Generation <Sparkles className="w-4 h-4" /></span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
