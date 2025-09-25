'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Circle, 
  Award, 
  Target, 
  Leaf, 
  Plane, 
  Car, 
  Home, 
  Utensils, 
  MapPin 
} from 'lucide-react';

interface Tip {
  id: string;
  category: 'transport' | 'accommodation' | 'activities' | 'food' | 'planning';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  points: number;
  icon: any;
}

const tips: Tip[] = [
  {
    id: '1',
    category: 'transport',
    title: 'Choose Direct Flights',
    description: 'Takeoffs and landings produce the most emissions. Direct flights reduce your carbon footprint significantly.',
    impact: 'high',
    points: 20,
    icon: Plane,
  },
  {
    id: '2',
    category: 'transport',
    title: 'Use Public Transportation',
    description: 'Trains, buses, and metros have much lower per-person emissions than cars or flights.',
    impact: 'high',
    points: 25,
    icon: Car,
  },
  {
    id: '3',
    category: 'accommodation',
    title: 'Stay in Eco-Certified Hotels',
    description: 'Look for certifications like Green Key, LEED, or local eco-labels.',
    impact: 'medium',
    points: 15,
    icon: Home,
  },
  {
    id: '4',
    category: 'accommodation',
    title: 'Reuse Towels and Sheets',
    description: 'Reduce water and energy consumption by participating in hotel conservation programs.',
    impact: 'low',
    points: 5,
    icon: Home,
  },
  {
    id: '5',
    category: 'activities',
    title: 'Support Local Businesses',
    description: 'Choose locally-owned tours, restaurants, and shops to benefit the community.',
    impact: 'medium',
    points: 15,
    icon: MapPin,
  },
  {
    id: '6',
    category: 'activities',
    title: 'Respect Wildlife and Nature',
    description: 'Maintain safe distances from animals and follow Leave No Trace principles.',
    impact: 'high',
    points: 20,
    icon: Leaf,
  },
  {
    id: '7',
    category: 'food',
    title: 'Eat Local and Seasonal Foods',
    description: 'Reduce food miles and support local agriculture by choosing regional cuisines.',
    impact: 'medium',
    points: 10,
    icon: Utensils,
  },
  {
    id: '8',
    category: 'food',
    title: 'Reduce Meat Consumption',
    description: 'Try plant-based meals during your trip to lower your dietary carbon footprint.',
    impact: 'medium',
    points: 12,
    icon: Utensils,
  },
  {
    id: '9',
    category: 'planning',
    title: 'Travel During Off-Peak Seasons',
    description: 'Reduce overtourism pressure and often get better deals while supporting destinations year-round.',
    impact: 'medium',
    points: 15,
    icon: Target,
  },
  {
    id: '10',
    category: 'planning',
    title: 'Pack Light',
    description: 'Every kilogram counts! Lighter luggage means lower fuel consumption on flights.',
    impact: 'low',
    points: 8,
    icon: Target,
  },
];

const categories = [
  { id: 'all', name: 'All Tips', icon: Award },
  { id: 'transport', name: 'Transport', icon: Plane },
  { id: 'accommodation', name: 'Accommodation', icon: Home },
  { id: 'activities', name: 'Activities', icon: MapPin },
  { id: 'food', name: 'Food', icon: Utensils },
  { id: 'planning', name: 'Planning', icon: Target },
];

export default function EcoTips() {
  const [completedTips, setCompletedTips] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleTip = (tipId: string) => {
    const newCompleted = new Set(completedTips);
    if (newCompleted.has(tipId)) {
      newCompleted.delete(tipId);
    } else {
      newCompleted.add(tipId);
    }
    setCompletedTips(newCompleted);
  };

  const filteredTips = activeCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === activeCategory);

  const totalPoints = tips.reduce((sum, tip) => sum + tip.points, 0);
  const earnedPoints = tips
    .filter(tip => completedTips.has(tip.id))
    .reduce((sum, tip) => sum + tip.points, 0);

  const progress = (earnedPoints / totalPoints) * 100;

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getImpactText = (impact: string) => {
    switch (impact) {
      case 'high': return 'High Impact';
      case 'medium': return 'Medium Impact';
      case 'low': return 'Low Impact';
      default: return 'Unknown';
    }
  };

  return (
    <section id="tips" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold text-primary">
            Sustainable Travel Challenge
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Complete these eco-friendly travel practices and track your progress toward becoming a sustainable traveler.
          </p>
        </div>

        {/* Progress Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Award className="w-12 h-12 text-primary" />
              </div>
            </div>
            <CardTitle className="font-headline text-2xl">Your Eco Score</CardTitle>
            <CardDescription>
              {earnedPoints} / {totalPoints} points ({Math.round(progress)}% complete)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full h-3 mb-4" />
            <div className="flex justify-center gap-4 text-sm">
              <div className="text-center">
                <div className="font-bold text-2xl text-primary">{completedTips.size}</div>
                <div className="text-muted-foreground">Tips Completed</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-primary">{tips.length - completedTips.size}</div>
                <div className="text-muted-foreground">Tips Remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center gap-2"
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => {
            const isCompleted = completedTips.has(tip.id);
            const IconComponent = tip.icon;
            
            return (
              <Card 
                key={tip.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  isCompleted ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' : ''
                }`}
                onClick={() => toggleTip(tip.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary" className="text-xs">
                        +{tip.points} pts
                      </Badge>
                      <Badge className={`text-xs text-white ${getImpactColor(tip.impact)}`}>
                        {getImpactText(tip.impact)}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="font-headline text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievement Badges */}
        {progress >= 25 && (
          <div className="mt-12 text-center">
            <h3 className="font-headline text-2xl font-bold mb-4">Your Achievements</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {progress >= 25 && (
                <Badge className="text-lg py-2 px-4 bg-yellow-500 hover:bg-yellow-600">
                  🌱 Eco Beginner
                </Badge>
              )}
              {progress >= 50 && (
                <Badge className="text-lg py-2 px-4 bg-green-500 hover:bg-green-600">
                  🌿 Green Traveler
                </Badge>
              )}
              {progress >= 75 && (
                <Badge className="text-lg py-2 px-4 bg-blue-500 hover:bg-blue-600">
                  🌍 Planet Guardian
                </Badge>
              )}
              {progress >= 100 && (
                <Badge className="text-lg py-2 px-4 bg-purple-500 hover:bg-purple-600">
                  🏆 Sustainability Champion
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}