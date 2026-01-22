'use server';

/**
 * @fileOverview An AI agent for suggesting dishes based on user thoughts.
 *
 * - suggestDishes - A function that suggests dishes.
 */
import {ai} from '@/ai/genkit';
import { SuggestDishesInputSchema, SuggestDishesOutputSchema, type SuggestDishesInput, type SuggestDishesOutput } from '@/ai/schemas';

export async function suggestDishes(input: SuggestDishesInput): Promise<SuggestDishesOutput> {
  return suggestDishesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDishesPrompt',
  input: {schema: SuggestDishesInputSchema},
  output: {schema: SuggestDishesOutputSchema},
  prompt: `
ROLE:
You are an intelligent Culinary AI Assistant. Your goal is to interpret the user's abstract thoughts, current mood, weather context, or vague cravings and suggest 4 to 5 distinct, real dish names that match their intent.

INPUT:
The user will provide a statement. It could be ingredients, a mood (e.g., "I'm sad"), a situation (e.g., "Late night snack"), or specific constraints.

TASK:
1. Analyze the user's input for emotional context, available time, and flavor profile.
2. Brainstorm 4-5 creative and suitable dishes.
3. For each dish, provide the exact Name and a very short "Why this matches" description.

OUTPUT FORMAT:
Strictly return a JSON object with a "suggestions" array. Do not include markdown formatting like \`\`\`json.
{
  "suggestions": [
    {
      "dish_name": "Name of the Dish",
      "description": "A short, appetizing one-line description of why this fits the user's thought.",
      "difficulty": "Easy/Medium/Hard"
    }
    // ... 4 to 5 items total
  ]
}

USER INPUT:
"{{{thoughts}}}"
`,
});

const suggestDishesFlow = ai.defineFlow(
  {
    name: 'suggestDishesFlow',
    inputSchema: SuggestDishesInputSchema,
    outputSchema: SuggestDishesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
