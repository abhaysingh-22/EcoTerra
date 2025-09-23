'use server';
/**
 * @fileOverview Recommends eco-friendly travel destinations based on user preferences.
 *
 * - recommendEcoFriendlyDestinations - A function that provides eco-friendly destination recommendations.
 * - RecommendEcoFriendlyDestinationsInput - The input type for the recommendEcoFriendlyDestinations function.
 * - RecommendEcoFriendlyDestinationsOutput - The return type for the recommendEcoFriendlyDestinations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendEcoFriendlyDestinationsInputSchema = z.object({
  travelMode: z
    .string()
    .describe("The user's preferred mode of transportation (e.g., Flight, Train, Car)."),
  distance: z.number().describe('The distance the user intends to travel in kilometers.'),
  weatherPreference: z
    .string()
    .optional()
    .describe('The user\'s preferred weather conditions (e.g., Sunny, Rainy, Snowy).'),
  seasonPreference: z
    .string()
    .optional()
    .describe('The user\'s preferred season (e.g., Spring, Summer, Autumn, Winter).'),
});
export type RecommendEcoFriendlyDestinationsInput = z.infer<typeof RecommendEcoFriendlyDestinationsInputSchema>;

const DestinationSchema = z.object({
  destinationName: z.string().describe('The name of the eco-friendly destination.'),
  description: z.string().describe('A brief description of the destination and why it is eco-friendly.'),
  bestSeason: z.string().describe('The best season to visit the destination.'),
  sustainablePractices: z
    .string()
    .describe('Details about the sustainable practices implemented at the destination.'),
});

const RecommendEcoFriendlyDestinationsOutputSchema = z.object({
  recommendations: z.array(DestinationSchema).describe('A list of recommended eco-friendly destinations.'),
});
export type RecommendEcoFriendlyDestinationsOutput = z.infer<typeof RecommendEcoFriendlyDestinationsOutputSchema>;

export async function recommendEcoFriendlyDestinations(
  input: RecommendEcoFriendlyDestinationsInput
): Promise<RecommendEcoFriendlyDestinationsOutput> {
  return recommendEcoFriendlyDestinationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendEcoFriendlyDestinationsPrompt',
  input: {schema: RecommendEcoFriendlyDestinationsInputSchema},
  output: {schema: RecommendEcoFriendlyDestinationsOutputSchema},
  prompt: `You are an expert travel agent specializing in eco-friendly tourism.

  Based on the user's preferences for travel mode, distance, weather, and season, recommend some eco-friendly travel destinations. Include the best season to visit and sustainable practices for each destination.

  Travel Mode: {{{travelMode}}}
  Distance: {{{distance}}} km
  Weather Preference: {{{weatherPreference}}}
  Season Preference: {{{seasonPreference}}}

  Format your response as a JSON object with a 'recommendations' array. Each object in the array should include the destination name, a brief description of why it's eco-friendly, the best season to visit, and details about its sustainable practices.
  `,
});

const recommendEcoFriendlyDestinationsFlow = ai.defineFlow(
  {
    name: 'recommendEcoFriendlyDestinationsFlow',
    inputSchema: RecommendEcoFriendlyDestinationsInputSchema,
    outputSchema: RecommendEcoFriendlyDestinationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
