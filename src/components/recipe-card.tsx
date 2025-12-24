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
import { type CreateRecipeOutput } from '@/ai/schemas';
import { Button } from './ui/button';
import { Trash2, RefreshCw } from 'lucide-react';

type RecipeCardProps = {
  recipe: CreateRecipeOutput;
  onIngredientRemove: (ingredient: string) => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
  ingredientsChanged: boolean;
};

export function RecipeCard({ recipe, onIngredientRemove, onRegenerate, isRegenerating, ingredientsChanged }: RecipeCardProps) {
  return (
    <Card className="w-full overflow-hidden bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{recipe.title}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-headline text-xl mb-2">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center justify-between group">
                <span>- {ingredient}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100" onClick={() => onIngredientRemove(ingredient)}>
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
