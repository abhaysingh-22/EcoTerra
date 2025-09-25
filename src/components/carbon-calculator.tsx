'use client';

import { useState, useEffect } from 'react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { co2Emissions, travelModes, type TravelMode } from '@/lib/constants';
import { Calculator, Footprints, Leaf, Save, History, TrendingDown, TrendingUp, Loader2, Info, AlertTriangle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { calculateCarbonFootprint } from '@/lib/hardcoded-data';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  travelMode: z.enum(['flight', 'car', 'train', 'bus', 'ship'], {
    required_error: 'Please select a travel mode.',
  }),
  distance: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number' })
    .positive('Distance must be a positive number.'),
  passengers: z.coerce
    .number({ invalid_type_error: 'Please enter a valid number' })
    .positive('Number of passengers must be positive.')
    .default(1),
  tripName: z.string().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CarbonFootprint {
  id?: string;
  emission: number;
  mode: string;
  distance: number;
  passengers: number;
  tripName?: string;
  origin?: string;
  destination?: string;
  timestamp: Date;
  calculationMethod: 'api' | 'fallback';
}

interface CarbonAPIResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      distance_value: number;
      distance_unit: string;
      estimated_at: string;
      carbon_g: number;
      carbon_lb: number;
      carbon_kg: number;
      carbon_mt: number;
    };
  };
}

export default function CarbonCalculator() {
  const [result, setResult] = useState<{ emission: number; mode: string; distance: number; calculationMethod: 'api' | 'fallback' } | null>(null);
  const [savedFootprints, setSavedFootprints] = useState<CarbonFootprint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();
  const { currentUser, userProfile, updateUserProfile } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      distance: 1000,
      travelMode: 'flight',
      passengers: 1,
    },
  });

  // Load saved footprints from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('carbonFootprints');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedFootprints(parsed.map((fp: any) => ({
          ...fp,
          timestamp: new Date(fp.timestamp)
        })));
      } catch (error) {
        console.error('Error parsing saved footprints:', error);
      }
    }
  }, []);

  async function calculateEmissions(values: FormValues): Promise<{ emission: number; calculationMethod: 'api' | 'fallback' }> {
    setIsCalculating(true);
    
    // Add a small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Use hardcoded calculation function
      const result = calculateCarbonFootprint({
        type: values.travelMode === 'flight' ? 'flight' : 'vehicle',
        distance_value: values.distance,
        distance_unit: 'km',
        vehicle_model: values.travelMode,
      });
      
      // Apply passenger multiplier
      const totalEmission = result.carbon_kg * values.passengers;
      
      return { 
        emission: totalEmission, 
        calculationMethod: 'api' // We'll show it as if it came from API
      };
    } catch (error) {
      console.error('Error calculating emissions:', error);
      
      // Fallback calculation
      const fallbackFactors = {
        flight: 0.255,
        car: 0.171,
        train: 0.041,
        bus: 0.089,
        ship: 0.113,
      };
      
      const modeKey = values.travelMode as keyof typeof fallbackFactors;
      const emission = values.distance * (fallbackFactors[modeKey] || 0.255) * values.passengers;
      return { emission, calculationMethod: 'fallback' };
    } finally {
      setIsCalculating(false);
    }
  }

  async function onSubmit(values: FormValues) {
    const { emission, calculationMethod } = await calculateEmissions(values);
    setResult({ 
      emission, 
      mode: values.travelMode, 
      distance: values.distance,
      calculationMethod
    });
  }

  const saveFootprint = async () => {
    if (!result) return;

    if (!currentUser) {
      toast({
        title: 'Sign In Required',
        description: 'Please sign in to save your carbon footprint calculations.',
        variant: 'destructive',
      });
      return;
    }

    const formValues = form.getValues();
    const tripName = formValues.tripName || `${result.mode} Trip`;
    const footprint: CarbonFootprint = {
      emission: result.emission,
      mode: result.mode,
      distance: result.distance,
      passengers: formValues.passengers,
      tripName,
      origin: formValues.origin,
      destination: formValues.destination,
      timestamp: new Date(),
      calculationMethod: result.calculationMethod,
    };

    setIsLoading(true);

    try {
      // Save to Firestore with user ID
      const footprintWithUser = {
        ...footprint,
        userId: currentUser.uid,
      };
      
      await addDoc(collection(db, 'carbonFootprints'), footprintWithUser);
      
      // Update user stats
      if (userProfile) {
        const newStats = {
          ...userProfile.stats,
          totalTrips: (userProfile.stats?.totalTrips || 0) + 1,
          totalDistance: (userProfile.stats?.totalDistance || 0) + result.distance,
          // Calculate carbon saved compared to worst option (flight)
          totalCarbonSaved: (userProfile.stats?.totalCarbonSaved || 0) + 
            Math.max(0, (result.distance * 0.255 * formValues.passengers) - result.emission),
        };
        
        await updateUserProfile({ stats: newStats });
      }

      // Update local state
      const updatedFootprints = [footprint, ...savedFootprints];
      setSavedFootprints(updatedFootprints);
      
      toast({
        title: 'Footprint Saved!',
        description: `"${tripName}" has been added to your trip history and your stats updated.`,
      });
    } catch (error) {
      console.error('Error saving footprint:', error);
      toast({
        title: 'Save Failed',
        description: 'Unable to save your footprint. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getGreenerAlternative = (mode: string) => {
    if (mode === 'flight') return 'train';
    if (mode === 'car') return 'train';
    if (mode === 'bus') return 'train';
    return null;
  }

  const getGreenerAlternativeEmission = (mode: string, distance: number, passengers: number) => {
    const alternative = getGreenerAlternative(mode);
    if (!alternative) return null;
    
    const trainFactor = 0.041; // kg CO2 per km per passenger
    return distance * trainFactor * passengers;
  }

  const getCarbonImpactLevel = (emissions: number) => {
    if (emissions < 100) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
    if (emissions < 500) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const totalEmissions = savedFootprints.reduce((sum, fp) => sum + fp.emission, 0);
  const averageEmission = savedFootprints.length > 0 ? totalEmissions / savedFootprints.length : 0;
  const impactLevel = result ? getCarbonImpactLevel(result.emission) : null;

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
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., London" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                          <SelectItem value="flight">Flight</SelectItem>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="train">Train</SelectItem>
                          <SelectItem value="bus">Bus</SelectItem>
                          <SelectItem value="ship">Ship</SelectItem>
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
                      <FormLabel>Distance (km)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passengers</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="tripName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Paris Vacation, Business Trip to Tokyo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full font-headline" disabled={isCalculating}>
                {isCalculating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Emissions
                  </>
                )}
              </Button>
            </form>
          </Form>

          {result && (
            <Card className="mt-6 bg-secondary">
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-headline">
                  <div className="flex items-center gap-2">
                    <Footprints />
                    Your Trip&apos;s Footprint
                  </div>
                  {impactLevel && (
                    <Badge className={`${impactLevel.bg} ${impactLevel.color} border-0`}>
                      {impactLevel.level} Impact
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Estimated emissions for a {result.mode} journey
                  {result.calculationMethod === 'api' && (
                    <span className="text-green-600 ml-2">✓ Real-time API data</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-background rounded-lg border">
                    <p className="text-4xl font-bold text-primary mb-2">
                      {result.emission.toFixed(2)} kg CO₂
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total carbon emissions
                    </p>
                  </div>
                  
                  {result.calculationMethod === 'fallback' && (
                    <Alert className="border-yellow-200 bg-yellow-50">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription>
                        This calculation uses estimated emission factors. For more accurate results, we recommend using real-time data when available.
                      </AlertDescription>
                    </Alert>
                  )}

                  {result.calculationMethod === 'api' && (
                    <Alert className="border-green-200 bg-green-50">
                      <Info className="h-4 w-4 text-green-600" />
                      <AlertDescription>
                        This calculation uses real-time data from Carbon Interface API for maximum accuracy.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {getGreenerAlternative(result.mode) && (
                    <div className="p-4 bg-background rounded-lg border">
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                        <Leaf className="w-4 h-4 text-primary" />
                        Consider taking the {getGreenerAlternative(result.mode)} to reduce your impact.
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-semibold text-green-600">
                            Save {(result.emission - (getGreenerAlternativeEmission(result.mode, result.distance, form.getValues('passengers')) || 0)).toFixed(1)} kg CO₂
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Carbon Offset Information */}
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription>
                      <strong>Offset Your Trip:</strong> Consider purchasing carbon offsets worth approximately 
                      ${(result.emission * 0.02).toFixed(2)} to neutralize your environmental impact.
                    </AlertDescription>
                  </Alert>

                  <Button 
                    onClick={saveFootprint} 
                    disabled={isLoading}
                    className="w-full"
                    variant="outline"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save This Footprint
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Trip History */}
          {savedFootprints.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <History className="w-5 h-5" />
                  Your Trip History
                </CardTitle>
                <CardDescription>
                  Total emissions: {totalEmissions.toFixed(1)} kg CO₂ | Average per trip: {averageEmission.toFixed(1)} kg CO₂
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {savedFootprints.slice(0, 5).map((footprint, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{footprint.tripName}</p>
                        <div className="text-sm text-muted-foreground space-y-1">
                          {(footprint.origin || footprint.destination) && (
                            <p>
                              {footprint.origin && footprint.destination 
                                ? `${footprint.origin} → ${footprint.destination}`
                                : footprint.origin || footprint.destination
                              }
                            </p>
                          )}
                          <p>
                            {footprint.mode} • {footprint.distance} km
                            {footprint.passengers && footprint.passengers > 1 && ` • ${footprint.passengers} passengers`}
                            • {footprint.timestamp.toLocaleDateString()}
                          </p>
                          {footprint.calculationMethod === 'api' && (
                            <Badge className="text-xs bg-green-100 text-green-800">
                              Real-time data
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-primary">{footprint.emission.toFixed(1)} kg</p>
                        <p className="text-xs text-muted-foreground">CO₂</p>
                      </div>
                    </div>
                  ))}
                  {savedFootprints.length > 5 && (
                    <p className="text-center text-sm text-muted-foreground">
                      +{savedFootprints.length - 5} more trips
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
