
'use client';

import { initializeFirebase } from '@/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';

const { firestore: db } = initializeFirebase();

export interface SavedRecipe {
  id?: string;
  recipeName: string;
  cuisine: string;
  servings: number;
  dietType: string;
  language: string;
  ingredients: string[];
  steps: string[];
  generatedAt?: any;
  isFavourite: boolean;
}

// Save a recipe to Firestore
export async function saveRecipe(
  userId: string,
  recipe: SavedRecipe
): Promise<string> {
  const ref = collection(db, 'users', userId, 'savedRecipes');
  const docRef = await addDoc(ref, {
    ...recipe,
    generatedAt: serverTimestamp(),
    isFavourite: false,
  });
  return docRef.id;
}

// Get all saved recipes for a user
export async function getSavedRecipes(
  userId: string
): Promise<SavedRecipe[]> {
  const ref = collection(db, 'users', userId, 'savedRecipes');
  const q = query(ref, orderBy('generatedAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as SavedRecipe[];
}

// Delete a recipe
export async function deleteRecipe(
  userId: string,
  recipeId: string
): Promise<void> {
  const ref = doc(db, 'users', userId, 'savedRecipes', recipeId);
  await deleteDoc(ref);
}

// Toggle favourite
export async function toggleFavourite(
  userId: string,
  recipeId: string,
  current: boolean
): Promise<void> {
  const ref = doc(db, 'users', userId, 'savedRecipes', recipeId);
  await updateDoc(ref, { isFavourite: !current });
}
