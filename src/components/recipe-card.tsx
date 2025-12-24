import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';

type RecipeCardProps = {
  recipeString: string;
};

export function RecipeCard({ recipeString }: RecipeCardProps) {
  return (
    <Card className="w-full overflow-hidden bg-card">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Generated Recipe</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-invert max-w-none">
        <ReactMarkdown>{recipeString}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}
