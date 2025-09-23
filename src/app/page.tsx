import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CloudLightning,
  Globe,
  Leaf,
  Mountain,
  Palmtree,
  Sprout,
  Thermometer,
  Trees,
  Users,
  Waves,
  ArrowDown,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ecoFriendlyDestinations } from '@/lib/eco-destinations';
import CarbonCalculator from '@/components/carbon-calculator';
import DestinationRecommender from '@/components/destination-recommender';
import StatisticsCharts from '@/components/statistics-charts';
import EcoTips from '@/components/eco-tips';
import NewsSection from '@/components/news-section';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import ClientOnly from '@/components/client-only';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-banner');
  const himalayasImage = PlaceHolderImages.find((img) => img.id === 'himalayas');
  const maldivesImage = PlaceHolderImages.find((img) => img.id === 'maldives');
  const europeImage = PlaceHolderImages.find((img) => img.id === 'europe-heatwave');

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        {/* Hero Section with enhanced animations */}
        <section
          id="home"
          className="relative flex h-screen min-h-[700px] w-full items-center justify-center text-center text-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10" />
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover transition-transform duration-[20s] ease-out hover:scale-105"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="relative z-20 container mx-auto px-4 animate-fade-in">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                <Leaf className="w-4 h-4" />
                Sustainable Tourism Platform
              </div>
            </div>
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-green-100 to-blue-100 bg-clip-text text-transparent">
              EcoTerra Journeys
            </h1>
            <p className="mt-4 max-w-4xl mx-auto text-xl md:text-2xl font-light leading-relaxed">
              Discover the world responsibly. Calculate your impact, find eco-friendly destinations, 
              and make every journey count for our planet&apos;s future.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="font-headline text-lg px-8 py-4 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                <a href="#calculator">Calculate Your Impact</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-headline text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <a href="#destinations">Explore Destinations</a>
              </Button>
            </div>
            <div className="mt-16 animate-bounce">
              <ArrowDown className="w-8 h-8 mx-auto text-white/70" />
            </div>
          </div>
        </section>

        {/* Climate Impact Section with improved cards */}
        <section id="education" className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Thermometer className="w-4 h-4 text-primary" />
                Climate Impact
              </div>
              <h2 className="font-headline text-5xl md:text-6xl font-bold text-primary mb-6">
                A Planet in Crisis
              </h2>
              <p className="mt-4 max-w-4xl mx-auto text-xl text-muted-foreground leading-relaxed">
                Climate change poses unprecedented challenges to tourism and the natural wonders we cherish. 
                Understanding these impacts is crucial for responsible travel decisions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl w-fit mb-4">
                    <Thermometer className="w-12 h-12 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Global Warming Crisis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Rising temperatures are melting glaciers in destinations like the Himalayas,
                    endangering unique ecosystems and threatening local water supplies that communities depend on.
                  </p>
                  {himalayasImage && (
                    <div className="relative overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={himalayasImage.imageUrl}
                        alt={himalayasImage.description}
                        width={600}
                        height={400}
                        className="w-full aspect-video object-cover"
                        data-ai-hint={himalayasImage.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl w-fit mb-4">
                    <Waves className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Rising Sea Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Low-lying islands like the Maldives face an existential threat from rising seas, which
                    could submerge pristine beaches and displace entire coastal communities.
                  </p>
                  {maldivesImage && (
                    <div className="relative overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={maldivesImage.imageUrl}
                        alt={maldivesImage.description}
                        width={600}
                        height={400}
                        className="w-full aspect-video object-cover"
                        data-ai-hint={maldivesImage.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl w-fit mb-4">
                    <CloudLightning className="w-12 h-12 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Extreme Weather Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Increased frequency of severe heatwaves in Europe and stronger hurricanes worldwide 
                    disrupt travel plans and endanger both tourists and local populations.
                  </p>
                  {europeImage && (
                    <div className="relative overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={europeImage.imageUrl}
                        alt={europeImage.description}
                        width={600}
                        height={400}
                        className="w-full aspect-video object-cover"
                        data-ai-hint={europeImage.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced Impacts Section */}
        <section id="impacts" className="py-20 md:py-32 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Globe className="w-4 h-4 text-primary" />
                Global Impact
              </div>
              <h2 className="font-headline text-5xl md:text-6xl font-bold text-primary mb-6">
                The Ripple Effect
              </h2>
              <p className="mt-4 max-w-4xl mx-auto text-xl text-muted-foreground leading-relaxed">
                Climate change creates cascading effects across environmental, economic, and social systems worldwide.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1" className="bg-card rounded-xl border-0 shadow-lg overflow-hidden">
                  <AccordionTrigger className="text-xl font-headline px-8 py-6 hover:bg-secondary/50 transition-colors duration-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-500/10 rounded-lg mr-4">
                        <Globe className="w-8 h-8 text-green-500" />
                      </div>
                      Environmental Devastation
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-muted-foreground px-8 pb-8 leading-relaxed">
                    Widespread coral bleaching destroys marine ecosystems, while biodiversity loss accelerates 
                    as species struggle to adapt. Soil degradation threatens agricultural regions, and water 
                    shortages become increasingly common in popular tourist destinations.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="bg-card rounded-xl border-0 shadow-lg overflow-hidden">
                  <AccordionTrigger className="text-xl font-headline px-8 py-6 hover:bg-secondary/50 transition-colors duration-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-500/10 rounded-lg mr-4">
                        <Trees className="w-8 h-8 text-blue-500" />
                      </div>
                      Tourism Industry Collapse
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-muted-foreground px-8 pb-8 leading-relaxed">
                    Critical infrastructure faces repeated damage from extreme weather events. Ski resorts 
                    experience dramatically shortened seasons due to reduced snowfall. Iconic natural attractions 
                    deteriorate or disappear entirely, threatening tourism-dependent economies worldwide.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="bg-card rounded-xl border-0 shadow-lg overflow-hidden">
                  <AccordionTrigger className="text-xl font-headline px-8 py-6 hover:bg-secondary/50 transition-colors duration-300">
                    <div className="flex items-center">
                      <div className="p-3 bg-orange-500/10 rounded-lg mr-4">
                        <Users className="w-8 h-8 text-orange-500" />
                      </div>
                      Communities in Crisis
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-lg text-muted-foreground px-8 pb-8 leading-relaxed">
                    Local communities face devastating income loss as tourism declines. Environmental displacement 
                    forces migration from traditional homelands. Cultural heritage sites and practices face 
                    irreversible damage, erasing centuries of human history and tradition.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Enhanced Destinations Section */}
        <section id="destinations" className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Mountain className="w-4 h-4 text-primary" />
                Sustainable Travel
              </div>
              <h2 className="font-headline text-5xl md:text-6xl font-bold text-primary mb-6">
                Explore Responsibly
              </h2>
              <p className="mt-4 max-w-4xl mx-auto text-xl text-muted-foreground leading-relaxed">
                Discover destinations pioneering sustainable tourism practices and leading conservation efforts 
                for future generations.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {ecoFriendlyDestinations.map((destination, index) => {
                const destinationImage = PlaceHolderImages.find((img) => img.id === destination.imageId);
                return (
                  <Card key={destination.name} className="group flex flex-col lg:flex-row overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
                    {destinationImage && (
                      <div className="lg:w-2/5 w-full relative overflow-hidden">
                        <Image
                          src={destinationImage.imageUrl}
                          alt={destination.name}
                          width={500}
                          height={400}
                          className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          data-ai-hint={destinationImage.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                    )}
                    <div className="lg:w-3/5 w-full flex flex-col">
                      <CardHeader className="flex-1">
                        <CardTitle className="font-headline text-2xl mb-2">{destination.name}</CardTitle>
                        <CardDescription className="text-lg">
                          <span className="font-semibold text-primary">Best Season:</span> {destination.bestSeason}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="mb-6 text-muted-foreground text-lg leading-relaxed">{destination.description}</p>
                        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                          <div className="flex items-start gap-3">
                            <Sprout className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-foreground mb-2">Sustainable Practices:</p>
                              <p className="text-muted-foreground">
                                {destination.sustainablePractices}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Calculator and AI Sections */}
        <section id="calculator" className="py-20 md:py-32 bg-gradient-to-br from-accent/20 via-primary/5 to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Leaf className="w-4 h-4 text-primary" />
                Impact Tools
              </div>
              <h2 className="font-headline text-5xl md:text-6xl font-bold text-primary mb-6">
                Measure & Discover
              </h2>
              <p className="mt-4 max-w-4xl mx-auto text-xl text-muted-foreground leading-relaxed">
                Calculate your travel&apos;s environmental impact and get AI-powered recommendations 
                for sustainable destinations.
              </p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 items-start">
              <ClientOnly>
                <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-xl">
                  <CarbonCalculator />
                </div>
              </ClientOnly>
              <ClientOnly>
                <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50 shadow-xl">
                  <DestinationRecommender />
                </div>
              </ClientOnly>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <ClientOnly>
          <StatisticsCharts />
        </ClientOnly>

        {/* Tips Section */}
        <ClientOnly>
          <EcoTips />
        </ClientOnly>

        {/* News Section */}
        <ClientOnly>
          <NewsSection />
        </ClientOnly>
      </main>
      <AppFooter />
    </div>
  );
}
