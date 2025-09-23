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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { co2Emissions, travelModes } from '@/lib/constants';
import { Calculator, Footprints, Leaf } from 'lucide-react';

const formSchema = z.object({
  travelMode: z.enum(travelModes, {
    required_error: 'Please select a travel mode.',
  }),
  distance: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number' })
    .positive('Distance must be a positive number.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function CarbonCalculator() {
  const [result, setResult] = useState<{ emission: number; mode: string } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      distance: 1000,
      travelMode: 'Flight'
    },
  });

  function onSubmit(values: FormValues) {
    const emission = values.distance * co2Emissions[values.travelMode.toLowerCase() as keyof typeof co2Emissions];
    setResult({ emission, mode: values.travelMode });
  }

  const getGreenerAlternative = (mode: string) => {
    if (mode === 'Flight') return 'Train';
    if (mode === 'Car') return 'Train';
    return null;
  }

  return (
    <div>
      <h2 className="font-headline text-4xl font-bold">Calculate Your Carbon Footprint</h2>
      <p className="mt-4 text-lg text-accent-foreground/80">
        Use our simple tool to estimate the CO2 emissions of your journey and learn about greener
        alternatives.
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
                      <FormLabel>Mode of Transport</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {travelModes.map((mode) => (
                            <SelectItem key={mode} value={mode}>
                              {mode}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance (in km)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full font-headline">
                <Calculator className="mr-2 h-4 w-4" /> Calculate Emissions
              </Button>
            </form>
          </Form>

          {result && (
            <Card className="mt-6 bg-secondary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <Footprints /> Your Trip&apos;s Footprint
                </CardTitle>
                <CardDescription>Estimated emissions for a {result.mode.toLowerCase()} journey.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">
                  {result.emission.toFixed(2)} kg CO₂
                </p>
                {getGreenerAlternative(result.mode) && (
                   <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-primary" />
                    Consider taking the {getGreenerAlternative(result.mode)?.toLowerCase()} to reduce your impact.
                   </p>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
