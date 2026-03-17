'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Utensils, MapPin, Languages, Users, Vegan, Beef, Sparkles } from 'lucide-react';
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
  dishName: z.string().min(1, 'Dish name is required.'),
  servings: z.coerce.number().min(1, 'Minimum 1 serving.'),
  location: z.string().min(1, 'Location is required.'),
  language: z.string().min(1, 'Language is required.'),
  diet: z.enum(['Vegetarian', 'Non-Vegetarian'], { required_error: 'Diet is required.' }),
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
    <div className="saas-card p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Generate Recipe</h2>
            <p className="text-sm text-muted-foreground">Configure the parameters for your culinary output.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="dishName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] font-medium text-muted-foreground">Dish Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Beef Bourguignon" className="input-saas" {...field} />
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
                  <FormLabel className="text-[13px] font-medium text-muted-foreground">Servings</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="4" className="input-saas" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} value={field.value ?? ''} />
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
                  <FormLabel className="text-[13px] font-medium text-muted-foreground">Location Context</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. France" className="input-saas" {...field} />
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
                  <FormLabel className="text-[13px] font-medium text-muted-foreground">Output Language</FormLabel>
                  <FormControl>
                    <Input placeholder="English" className="input-saas" {...field} />
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
              <FormItem className="space-y-4">
                <FormLabel className="text-[13px] font-medium text-muted-foreground">Dietary Focus</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <FormItem className="flex items-center space-x-2 border rounded-md px-4 py-3 flex-1 cursor-pointer hover:bg-muted/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="Vegetarian" />
                      </FormControl>
                      <FormLabel className="font-medium text-sm cursor-pointer flex items-center gap-2">
                        <Vegan className="w-4 h-4 text-muted-foreground" /> Vegetarian
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 border rounded-md px-4 py-3 flex-1 cursor-pointer hover:bg-muted/50 transition-colors">
                      <FormControl>
                        <RadioGroupItem value="Non-Vegetarian" />
                      </FormControl>
                      <FormLabel className="font-medium text-sm cursor-pointer flex items-center gap-2">
                        <Beef className="w-4 h-4 text-muted-foreground" /> Non-Vegetarian
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground h-11 font-medium">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Generate Recipe'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}