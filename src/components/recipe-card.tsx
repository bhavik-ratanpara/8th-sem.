'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import { type CreateRecipeOutput, type Ingredient } from '@/ai/schemas';
import { Button } from './ui/button';
import { Trash2, RefreshCw, Minus, Plus, Users, UtensilsCrossed, Clock, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';

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
    const displayQuantity = newQuantity % 1 !== 0 ? newQuantity.toFixed(2) : newQuantity;
    return `${displayQuantity} ${ingredient.unit || ''}`;
  };

  return (
    <div className="saas-card overflow-hidden bg-card border-border">
      <CardHeader className="p-8 md:p-10 bg-secondary/30 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
               <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/5 rounded-full px-3">Recipe Guide</Badge>
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">{recipe.title}</CardTitle>
            <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
              {recipe.description}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1.5 h-12 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-secondary"
              onClick={() => onServingsChange(Math.max(1, servings - 1))}
              disabled={servings <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 px-3 min-w-[70px] justify-center border-x border-border/50">
              <span className="text-base font-bold text-foreground">{servings}</span>
              <span className="text-[13px] text-muted-foreground font-medium">Servings</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-secondary"
              onClick={() => onServingsChange(servings + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Ingredients Column */}
        <div className="lg:col-span-4 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-border bg-secondary/10">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-8">Essential Ingredients</h3>
          <ul className="space-y-5">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start justify-between group py-2 border-b border-border/30 last:border-0">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-foreground">{ingredient.name}</div>
                  <div className="text-[13px] text-muted-foreground font-medium">
                    {scaleIngredient(ingredient)}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all hover:text-destructive hover:bg-destructive/10" 
                  onClick={() => onIngredientRemove(ingredient)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Column */}
        <div className="lg:col-span-8 p-8 md:p-10 bg-card">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-8">Culinary Instructions</h3>
          <div className="prose prose-sm dark:prose-invert prose-slate max-w-none prose-p:text-foreground/90 prose-p:leading-loose prose-li:text-foreground/90 prose-li:leading-loose prose-li:mb-4 marker:text-primary">
            <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
          </div>
        </div>
      </div>

      {ingredientsChanged && (
        <div className="p-6 bg-primary/5 border-t border-border">
          <Button onClick={onRegenerate} disabled={isRegenerating} className="w-full h-12 text-sm font-semibold bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-primary/90">
            {isRegenerating ? (
              <>
                <RefreshCw className="mr-3 h-4 w-4 animate-spin" />
                Refining Culinary Plan...
              </>
            ) : (
              'Apply Modifications'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}