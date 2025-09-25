'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  LogOut, 
  Settings, 
  Award, 
  TreePine, 
  Footprints, 
  MapPin, 
  Calendar,
  TrendingDown,
  Target,
  Leaf
} from 'lucide-react';

interface UserProfileProps {
  onClose?: () => void;
}

export default function UserProfile({ onClose }: UserProfileProps) {
  const { currentUser, userProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!currentUser || !userProfile) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    onClose?.();
  };

  const sustainabilityGoals = userProfile.preferences?.sustainabilityGoals || [];
  const carbonBudget = userProfile.preferences?.carbonBudget || 1000;
  const stats = userProfile.stats || { totalTrips: 0, totalCarbonSaved: 0, totalDistance: 0 };

  // Calculate progress towards carbon budget (assuming yearly budget)
  const currentCarbonUsage = Math.max(0, carbonBudget * 0.3); // Mock 30% usage
  const carbonProgress = (currentCarbonUsage / carbonBudget) * 100;

  // Mock achievements
  const achievements = [
    {
      id: 1,
      title: 'Eco Warrior',
      description: 'Saved 100kg of CO2',
      icon: TreePine,
      earned: stats.totalCarbonSaved >= 100,
      progress: Math.min(100, (stats.totalCarbonSaved / 100) * 100),
    },
    {
      id: 2,
      title: 'Green Explorer',
      description: 'Completed 10 sustainable trips',
      icon: MapPin,
      earned: stats.totalTrips >= 10,
      progress: Math.min(100, (stats.totalTrips / 10) * 100),
    },
    {
      id: 3,
      title: 'Carbon Conscious',
      description: 'Stayed under carbon budget for 3 months',
      icon: Target,
      earned: false,
      progress: 67,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              {userProfile.photoURL ? (
                <img 
                  src={userProfile.photoURL} 
                  alt={userProfile.displayName}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-primary" />
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">{userProfile.displayName}</CardTitle>
              <CardDescription>{userProfile.email}</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trips">Trips</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Carbon Budget Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Footprints className="w-5 h-5" />
                    Carbon Budget Progress
                  </CardTitle>
                  <CardDescription>
                    Your yearly carbon footprint goal: {carbonBudget}kg CO2
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Used: {currentCarbonUsage.toFixed(0)}kg</span>
                      <span>Remaining: {(carbonBudget - currentCarbonUsage).toFixed(0)}kg</span>
                    </div>
                    <Progress value={carbonProgress} className="h-3" />
                    <p className="text-sm text-muted-foreground">
                      {carbonProgress < 70 ? 
                        '🌱 Great job staying within your budget!' : 
                        '⚠️ You\'re approaching your carbon budget limit'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Travel Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-primary">{stats.totalTrips}</p>
                        <p className="text-sm text-muted-foreground">Trips Completed</p>
                      </div>
                      <MapPin className="w-8 h-8 text-primary/30" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{stats.totalCarbonSaved}kg</p>
                        <p className="text-sm text-muted-foreground">CO2 Saved</p>
                      </div>
                      <TrendingDown className="w-8 h-8 text-green-600/30" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{stats.totalDistance.toLocaleString()}km</p>
                        <p className="text-sm text-muted-foreground">Distance Traveled</p>
                      </div>
                      <Footprints className="w-8 h-8 text-blue-600/30" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trips" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trips</CardTitle>
                  <CardDescription>Your sustainable travel history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock trip data */}
                    {[
                      { id: 1, name: 'London to Paris', date: '2025-09-20', transport: 'Train', co2: 14.2, saved: 241 },
                      { id: 2, name: 'New York to Boston', date: '2025-09-15', transport: 'Bus', co2: 32.5, saved: 180 },
                      { id: 3, name: 'Berlin to Amsterdam', date: '2025-09-10', transport: 'Train', co2: 18.7, saved: 195 },
                    ].map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{trip.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {trip.date}
                            </span>
                            <Badge variant="outline">{trip.transport}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{trip.co2}kg CO2</p>
                          <p className="text-xs text-green-600">-{trip.saved}kg saved</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className={achievement.earned ? 'border-green-200 bg-green-50' : ''}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${achievement.earned ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <achievement.icon className={`w-6 h-6 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{achievement.progress.toFixed(0)}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-2" />
                          </div>
                          {achievement.earned && (
                            <Badge className="mt-2 bg-green-100 text-green-800">
                              <Award className="w-3 h-3 mr-1" />
                              Earned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Sustainability Goals
                  </CardTitle>
                  <CardDescription>
                    Track your environmental objectives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sustainabilityGoals.length === 0 ? (
                      <div className="text-center py-8">
                        <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No sustainability goals set yet.</p>
                        <Button className="mt-4" size="sm">
                          Set Your First Goal
                        </Button>
                      </div>
                    ) : (
                      sustainabilityGoals.map((goal, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <Badge variant="outline">{goal}</Badge>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}