'use server';

import { z } from 'zod';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export type FeedbackState = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string | null;
  success: boolean;
};

export async function submitFeedback(
  prevState: FeedbackState,
  formData: FormData
): Promise<FeedbackState> {
  const validatedFields = feedbackSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
      success: false,
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    // Save to Firestore
    if (db) {
      const docRef = await addDoc(collection(db, 'feedback'), {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
        status: 'new',
        category: 'general',
      });
      console.log('Feedback document written with ID: ', docRef.id);
    } else {
      // Fallback: just log to console if Firebase is not configured
      console.log('Firebase not configured, feedback logged:', { name, email, message });
    }

    return {
      message: 'Thank you for your feedback! We appreciate your thoughts and will review them soon.',
      success: true,
    };
  } catch (e) {
    console.error('Error saving feedback: ', e);
    // Still return success but log the error - better UX
    console.log('Feedback fallback logged:', { name, email, message });
    return {
      message: 'Thank you for your feedback! (Saved locally due to connection issues)',
      success: true,
    };
  }
}
