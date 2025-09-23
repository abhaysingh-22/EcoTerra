'use server';

import { z } from 'zod';
// import { db } from './firebase'; // Uncomment when Firebase is configured
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
    // This is where you would add the data to Firestore.
    // Ensure your `src/lib/firebase.ts` is correctly configured.
    // const docRef = await addDoc(collection(db, 'feedback'), {
    //   name,
    //   email,
    //   message,
    //   createdAt: serverTimestamp(),
    // });
    // console.log('Document written with ID: ', docRef.id);

    console.log('Feedback submitted:', { name, email, message });

    return {
      message: 'Thank you for your feedback!',
      success: true,
    };
  } catch (e) {
    console.error('Error adding document: ', e);
    return {
      message: 'Something went wrong. Please try again.',
      success: false,
    };
  }
}
