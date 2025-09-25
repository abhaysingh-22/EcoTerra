'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Globe, Thermometer, Droplets, Wind, Plane, Factory } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function StatisticsCharts() {
  // CO2 Emissions by Transport Mode (kg CO2 per 1000km)
  const transportEmissionsData = {
    labels: ['Flight', 'Car', 'Train', 'Bus'],
    datasets: [
      {
        label: 'CO2 Emissions (kg per 1000km)',
        data: [255, 171, 14, 32],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)', // Red for flight
          'rgba(245, 158, 11, 0.8)', // Orange for car
          'rgba(34, 197, 94, 0.8)', // Green for train
          'rgba(59, 130, 246, 0.8)', // Blue for bus
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Global Tourism Industry Impact
  const tourismImpactData = {
    labels: ['Transportation', 'Accommodation', 'Activities', 'Food & Dining'],
    datasets: [
      {
        label: 'Tourism Carbon Footprint (%)',
        data: [75, 15, 7, 3],
        backgroundColor: [
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
        ],
        borderColor: [
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(251, 191, 36, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Tourism emissions trend data
  const tourismTrendData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Global Tourism CO₂ Emissions (Mt)',
        data: [1650, 1720, 980, 1100, 1400, 1580, 1620],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
      },
    },
  };

  const stats = [
    {
      title: 'Global Temperature Rise',
      value: '+1.1°C',
      description: 'Since pre-industrial times',
      icon: Thermometer,
      trend: 'increasing',
    },
    {
      title: 'Tourism CO2 Emissions',
      value: '8%',
      description: 'Of global greenhouse gases',
      icon: Plane,
      trend: 'increasing',
    },
    {
      title: 'Tourism Growth Rate',
      value: '4%',
      description: 'Annual growth pre-pandemic',
      icon: TrendingUp,
      trend: 'increasing',
    },
    {
      title: 'Carbon Intensity',
      value: '0.79kg',
      description: 'CO2 per tourism dollar',
      icon: Factory,
      trend: 'stable',
    },
  ];

  return (
    <section id="statistics" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold text-primary">
            Climate Impact by Numbers
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Understanding the scale of tourism's environmental impact through comprehensive data and statistics.
          </p>
        </div>

        {/* Real-time Environmental Indicators - Simplified for now */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Sea Level Data */}
          <Card className="border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Droplets className="w-5 h-5 text-blue-600" />
                Sea Level Change
              </CardTitle>
              <CardDescription>Global sea level trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                +3.3 mm/year
              </div>
              <p className="text-sm text-muted-foreground">
                Current rate of sea level rise
              </p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">
                NOAA Data
              </Badge>
            </CardContent>
          </Card>

          {/* Air Quality Data */}
          <Card className="border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wind className="w-5 h-5 text-orange-600" />
                Air Quality (Global Avg)
              </CardTitle>
              <CardDescription>PM2.5 concentration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 mb-2">
                15.7 μg/m³
              </div>
              <div className="space-y-2">
                <Badge className="bg-yellow-100 text-yellow-800">
                  Moderate
                </Badge>
                <p className="text-sm text-muted-foreground">
                  WHO recommended: &lt;5 μg/m³
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Global Temperature */}
          <Card className="border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Thermometer className="w-5 h-5 text-red-600" />
                Global Temperature
              </CardTitle>
              <CardDescription>Temperature anomaly vs. baseline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 mb-2">
                +1.1°C
              </div>
              <p className="text-sm text-muted-foreground">
                Above pre-industrial levels
              </p>
              <Badge className="mt-2 bg-red-100 text-red-800">
                <TrendingUp className="w-3 h-3 mr-1" />
                Rising
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-headline text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </h3>
                <p className="font-semibold text-foreground mb-1">{stat.title}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="emissions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="emissions" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Emissions
            </TabsTrigger>
            <TabsTrigger value="transport" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Transport
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emissions" className="space-y-6">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-headline">CO2 Emissions by Transport Mode</CardTitle>
                <CardDescription>
                  Carbon footprint comparison per 1000km journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Bar data={transportEmissionsData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport" className="space-y-6">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-headline">Tourism Carbon Footprint Breakdown</CardTitle>
                <CardDescription>
                  Where tourism emissions come from
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Doughnut data={tourismImpactData} options={doughnutOptions} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-headline">Global Tourism Emissions Trend</CardTitle>
                <CardDescription>
                  Annual carbon emissions from tourism industry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line data={tourismTrendData} options={chartOptions} />
                </div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1.62Gt</div>
                    <div className="text-sm text-muted-foreground">2024 Emissions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">-6%</div>
                    <div className="text-sm text-muted-foreground">vs. 2019</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">8.8%</div>
                    <div className="text-sm text-muted-foreground">of Global Emissions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">+2.6%</div>
                    <div className="text-sm text-muted-foreground">vs. 2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Key Insights */}
        <Card className="mt-8 bg-secondary">
          <CardHeader>
            <CardTitle className="font-headline text-center">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-lg mb-2">Flying is the biggest contributor</h4>
                <p className="text-muted-foreground">
                  Air travel produces 18x more CO2 than train travel per kilometer
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Transportation dominates</h4>
                <p className="text-muted-foreground">
                  75% of tourism's carbon footprint comes from getting to destinations
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Small changes, big impact</h4>
                <p className="text-muted-foreground">
                  Choosing sustainable transport can reduce your footprint by up to 90%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}