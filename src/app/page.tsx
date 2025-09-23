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
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ecoFriendlyDestinations } from '@/lib/eco-destinations';
import CarbonCalculator from '@/components/carbon-calculator';
import DestinationRecommender from '@/components/destination-recommender';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-banner');
  const himalayasImage = PlaceHolderImages.find((img) => img.id === 'himalayas');
  const maldivesImage = PlaceHolderImages.find((img) => img.id === 'maldives');
  const europeImage = PlaceHolderImages.find((img) => img.id === 'europe-heatwave');

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        <section
          id="home"
          className="relative flex h-[60vh] min-h-[500px] w-full items-center justify-center text-center text-white"
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="relative z-20 container mx-auto px-4">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">
              EcoTerra Journeys
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl">
              Travel responsibly and discover the world&apos;s most beautiful eco-friendly destinations.
              Understand your impact and make a positive change.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="font-headline">
                <a href="#calculator">Calculate Footprint</a>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-headline">
                <a href="#destinations">Explore Destinations</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="education" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-4xl font-bold text-primary">
                Climate Change &amp; Tourism: A Fragile Balance
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Climate change poses a significant threat to the tourism industry and the natural wonders we
                love to explore. Understanding its effects is the first step towards responsible travel.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <Thermometer className="w-10 h-10 text-primary mb-2" />
                  <CardTitle className="font-headline">Global Warming</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Rising temperatures are melting glaciers in destinations like the Himalayas,
                    endangering unique ecosystems and local water supplies.
                  </p>
                  {himalayasImage && (
                    <Image
                      src={himalayasImage.imageUrl}
                      alt={himalayasImage.description}
                      width={600}
                      height={400}
                      className="rounded-lg mt-4 aspect-video object-cover"
                      data-ai-hint={himalayasImage.imageHint}
                    />
                  )}
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <Waves className="w-10 h-10 text-primary mb-2" />
                  <CardTitle className="font-headline">Sea Level Rise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Low-lying islands like the Maldives face an existential threat from rising seas, which
                    could submerge beaches and coastal communities.
                  </p>
                  {maldivesImage && (
                    <Image
                      src={maldivesImage.imageUrl}
                      alt={maldivesImage.description}
                      width={600}
                      height={400}
                      className="rounded-lg mt-4 aspect-video object-cover"
                      data-ai-hint={maldivesImage.imageHint}
                    />
                  )}
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CloudLightning className="w-10 h-10 text-primary mb-2" />
                  <CardTitle className="font-headline">Extreme Weather</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Increased frequency of heatwaves in Europe and stronger hurricanes worldwide disrupt
                    travel and endanger both tourists and local populations.
                  </p>
                  {europeImage && (
                    <Image
                      src={europeImage.imageUrl}
                      alt={europeImage.description}
                      width={600}
                      height={400}
                      className="rounded-lg mt-4 aspect-video object-cover"
                      data-ai-hint={europeImage.imageHint}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="impacts" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-4xl font-bold text-primary">A Rippling Effect</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                The consequences of climate change extend across environmental, economic, and social spheres.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-headline">
                  <Globe className="w-6 h-6 mr-3 text-primary" />
                  Environmental Impacts
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pl-11">
                  Coral bleaching, loss of biodiversity, soil degradation, and water shortages are
                  devastating natural habitats and the wildlife that depends on them.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-headline">
                  <Trees className="w-6 h-6 mr-3 text-primary" />
                  Tourism Industry Effects
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pl-11">
                  Damage to infrastructure, shorter winter sport seasons, and the loss of natural
                  attractions threaten the viability of many tourism-dependent economies.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-headline">
                  <Users className="w-6 h-6 mr-3 text-primary" />
                  Impact on Local Communities
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pl-11">
                  Communities that rely on tourism face loss of income, displacement due to environmental
                  changes, and threats to their cultural heritage.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="destinations" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-4xl font-bold text-primary">Explore Sustainably</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Discover destinations that are leading the way in sustainable tourism and conservation efforts.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {ecoFriendlyDestinations.map((destination) => {
                const destinationImage = PlaceHolderImages.find((img) => img.id === destination.imageId);
                return (
                  <Card key={destination.name} className="flex flex-col md:flex-row overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {destinationImage && (
                      <div className="md:w-1/3 w-full">
                        <Image
                          src={destinationImage.imageUrl}
                          alt={destination.name}
                          width={400}
                          height={500}
                          className="w-full h-full object-cover"
                          data-ai-hint={destinationImage.imageHint}
                        />
                      </div>
                    )}
                    <div className="md:w-2/3 w-full">
                      <CardHeader>
                        <CardTitle className="font-headline text-2xl">{destination.name}</CardTitle>
                        <CardDescription>Best Season: {destination.bestSeason}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-muted-foreground">{destination.description}</p>
                        <div className="flex items-start gap-2">
                          <Sprout className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                          <p className="text-sm">
                            <span className="font-semibold">Sustainable Practices: </span>
                            {destination.sustainablePractices}
                          </p>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="calculator" className="py-16 md:py-24 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <CarbonCalculator />
            <DestinationRecommender />
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
