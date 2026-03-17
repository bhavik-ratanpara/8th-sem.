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
    <div className="saas-card overflow-hidden">
      <CardHeader className="p-6 md:p-8 bg-muted/20 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">{recipe.title}</CardTitle>
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
              {recipe.description}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-background border border-border rounded-md p-1 h-9">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => onServingsChange(Math.max(1, servings - 1))}
              disabled={servings <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="flex items-center gap-1.5 px-1 min-w-[50px] justify-center">
              <span className="text-xs font-semibold">{servings}</span>
              <span className="text-[11px] text-muted-foreground uppercase font-bold tracking-tight">Servings</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => onServingsChange(servings + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Ingredients Column */}
        <div className="lg:col-span-4 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-border bg-card/30">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-muted-foreground mb-6">Ingredients</h3>
          <ul className="space-y-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start justify-between group">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">{ingredient.name}</div>
                  <div className="text-[12px] text-muted-foreground font-medium">
                    {scaleIngredient(ingredient)}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive" 
                  onClick={() => onIngredientRemove(ingredient)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Column */}
        <div className="lg:col-span-8 p-6 md:p-8">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-muted-foreground mb-6">Instructions</h3>
          <div className="prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-li:leading-relaxed prose-li:mb-2">
            <ReactMarkdown>{recipe.instructions}</ReactMarkdown>
          </div>
        </div>
      </div>

      {ingredientsChanged && (
        <div className="p-4 bg-primary/5 border-t border-border">
          <Button onClick={onRegenerate} disabled={isRegenerating} className="w-full h-10 text-sm font-medium bg-primary text-primary-foreground">
            {isRegenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refining...
              </>
            ) : (
              'Apply Changes'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}