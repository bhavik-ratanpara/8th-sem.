import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';
import { type CreateRecipeOutput, type Ingredient } from '@/ai/schemas';
import { Button } from './ui/button';
import { Trash2, RefreshCw, Minus, Plus, Users } from 'lucide-react';
import { Input } from './ui/input';

type RecipeCardProps = {
  recipe: CreateRecipeOutput;
  onIngredientRemove: (ingredient: Ingredient) => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
  ingredientsChanged: boolean;
  servings: number;
  onServingsChange: (servings: number) => void;
};

export function RecipeCard({
  recipe,
  onIngredientRemove,
  onRegenerate,
  isRegenerating,
  ingredientsChanged,
  servings,
  onServingsChange
}: RecipeCardProps) {

  const scaleIngredient = (ingredient: Ingredient) => {
    const scaleFactor = servings / recipe.servings;
    const newQuantity = ingredient.quantity * scaleFactor;

    // Round to 2 decimal places if it's a float
    const displayQuantity = newQuantity % 1 !== 0 ? newQuantity.toFixed(2) : newQuantity;

    return `${displayQuantity} ${ingredient.unit || ''}`;
  };

  return (
    <Card className="w-full overflow-hidden bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{recipe.title}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline text-xl">Ingredients</h3>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onServingsChange(Math.max(1, servings - 1))}
                disabled={servings <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-bold text-lg w-12 text-center">{servings}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onServingsChange(servings + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center justify-between group">
                <span>- {ingredient.name} ({scaleIngredient(ingredient)})</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onIngredientRemove(ingredient)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <Separator />
        <div>
          <h3 className="font-headline text-xl mb-2">Instructions</h3>
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
          </div>
        </div>
      </CardContent>
      {ingredientsChanged && (
        <CardFooter>
            <Button onClick={onRegenerate} disabled={isRegenerating} className="w-full">
                {isRegenerating ? (
                    <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Regenerating...
                    </>
                ) : (
                    <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate Instructions
                    </>
                )}
            </Button>
        </CardFooter>
      )}
    </Card>
  );
}
