import { config } from 'dotenv';
config();

import '@/ai/flows/create-recipe-flow.ts';
import '@/ai/flows/regenerate-instructions-flow.ts';
import '@/ai/flows/suggest-dishes-flow.ts';
