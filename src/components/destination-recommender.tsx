'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RecommendEcoFriendlyDestinationsInput,
  RecommendEcoFriendlyDestinationsOutput,
  recommendEcoFriendlyDestinations,
} from '@/ai/flows/recommend-eco-friendly-destinations';
import { seasonOptions, travelModes, weatherOptions } from '@/lib/constants';
import { Loader2, Sparkles, Sprout } from 'lucide-react';

const formSchema = z.object({
  travelMode: z.enum(travelModes),
  distance: z.coerce.number().positive(),
  weatherPreference: z.string().optional(),
  seasonPreference: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function DestinationRecommender() {
  const [recommendations, setRecommendations] =
    useState<RecommendEcoFriendlyDestinationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelMode: 'Train',
      distance: 500,
      weatherPreference: 'Any',
      seasonPreference: 'Any'
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    const input: RecommendEcoFriendlyDestinationsInput = {
        ...values,
        weatherPreference: values.weatherPreference === 'Any' ? undefined : values.weatherPreference,
        seasonPreference: values.seasonPreference === 'Any' ? undefined : values.seasonPreference,
    };

    try {
      const result = await recommendEcoFriendlyDestinations(input);
      setRecommendations(result);
    } catch (e) {
      setError('Sorry, we couldn\'t generate recommendations at this time. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-headline text-4xl font-bold">Find Your Next Green Getaway</h2>
      <p className="mt-4 text-lg text-accent-foreground/80">
        Let our AI travel expert suggest sustainable destinations tailored to your travel style.
      </p>
      <Card className="mt-8 bg-background/80 border-border">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="travelMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Travel Mode</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a mode" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {travelModes.map((mode) => (
                            <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Distance (km)</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weatherPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weather</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {weatherOptions.map((opt) => (<SelectItem key={opt} value={opt}>{opt}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="seasonPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Season</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {seasonOptions.map((opt) => (<SelectItem key={opt} value={opt}>{opt}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full font-headline">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Get Recommendations
              </Button>
            </form>
          </Form>

          {isLoading && <div className="text-center mt-6"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>}
          {error && <p className="mt-6 text-destructive text-center">{error}</p>}
          
          {recommendations && recommendations.recommendations.length > 0 && (
            <div className="mt-6 space-y-4">
              {recommendations.recommendations.map((rec, index) => (
                <Card key={index} className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{rec.destinationName}</CardTitle>
                    <p className="text-sm text-muted-foreground">Best Season: {rec.bestSeason}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{rec.description}</p>
                    <div className="flex items-start gap-2 text-sm">
                      <Sprout className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <span className="font-semibold">Sustainable Practices: </span>
                        {rec.sustainablePractices}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
