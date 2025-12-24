import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from './ui/badge';
import { Utensils } from 'lucide-react';

type RecipeCardProps = {
  recipeString: string;
};

type ParsedRecipe = {
  title: string;
  ingredients: string[];
  instructions: string[];
};

// This parser assumes the AI returns a string with a specific format.
// e.g., "**Recipe Title**\n\n**Ingredients:**\n- item 1\n- item 2\n\n**Instructions:**\n1. step 1\n2. step 2"
function parseRecipeString(recipeString: string): ParsedRecipe {
  const cleanString = recipeString.trim();

  let title = 'Untitled Recipe';
  let ingredients: string[] = [];
  let instructions: string[] = [];

  const titleMatch = cleanString.match(/^\*\*(.*?)\*\*/);
  if (titleMatch) {
    title = titleMatch[1];
  }

  const ingredientsMatch = cleanString.match(/\*\*Ingredients:\*\*\n([\s\S]*?)(?=\n\n\*\*Instructions:\*\*|\n*$)/);
  if (ingredientsMatch) {
    ingredients = ingredientsMatch[1].split('\n').map(line => line.replace(/^- /, '').trim()).filter(Boolean);
  }
  
  const instructionsMatch = cleanString.match(/\*\*Instructions:\*\*\n([\s\S]*)/);
  if (instructionsMatch) {
    instructions = instructionsMatch[1].split('\n').map(line => line.replace(/^\d+\.\s/, '').trim()).filter(Boolean);
  }

  // Fallback if the format is slightly different
  if (ingredients.length === 0 && instructions.length === 0 && !titleMatch) {
      return { title: "Could not parse recipe", ingredients: [recipeString], instructions: [] };
  }


  return { title, ingredients, instructions };
}

export function RecipeCard({ recipeString }: RecipeCardProps) {
  const { title, ingredients, instructions } = parseRecipeString(recipeString);

  return (
    <Card className="w-full overflow-hidden transition-all hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-3">
          <Utensils className="h-6 w-6 text-primary" />
          {title}
        </CardTitle>
        {ingredients.length > 0 && 
            <CardDescription>{ingredients.length} ingredients</CardDescription>
        }
      </CardHeader>
      <CardContent>
        {ingredients.length > 0 && (
          <div className="mb-6">
            <h3 className="font-headline font-semibold text-lg mb-3">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {ingredients.length > 0 && instructions.length > 0 && <Separator className="my-6" />}
        
        {instructions.length > 0 && (
          <div>
            <h3 className="font-headline font-semibold text-lg mb-3">Instructions</h3>
            <ol className="list-decimal list-inside space-y-3">
              {instructions.map((step, i) => (
                <li key={i} className="pl-2">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
