'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar, TrendingUp, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { getHardcodedSustainabilityNews, type HardcodedNewsArticle as NewsArticle } from '@/lib/hardcoded-data';

const categoryColors = {
  policy: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  technology: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  destinations: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  research: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  general: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};

const categoryLabels = {
  policy: 'Policy',
  technology: 'Technology',
  destinations: 'Destinations',
  research: 'Research',
  general: 'General',
};

// Function to categorize articles based on content
function categorizeArticle(article: NewsArticle): keyof typeof categoryColors {
  const title = article.title?.toLowerCase() || '';
  const description = article.description?.toLowerCase() || '';
  const content = `${title} ${description}`;

  if (content.includes('policy') || content.includes('government') || content.includes('regulation')) {
    return 'policy';
  }
  if (content.includes('technology') || content.includes('innovation') || content.includes('electric')) {
    return 'technology';
  }
  if (content.includes('destination') || content.includes('travel') || content.includes('tourism')) {
    return 'destinations';
  }
  if (content.includes('research') || content.includes('study') || content.includes('scientist')) {
    return 'research';
  }
  return 'general';
}

export default function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNews() {
      try {
        setIsLoading(true);
        const newsData = await getHardcodedSustainabilityNews();
        setArticles(newsData);
        setError(null);
      } catch (err) {
        setError('Failed to load news articles');
        console.error('Error loading news:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <section id="news" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold text-primary">
              Latest in Sustainable Tourism
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Stay updated with the latest developments in sustainable travel, climate policy, and green technology.
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Loading latest news...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="news" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold text-primary">
              Latest in Sustainable Tourism
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
              Stay updated with the latest developments in sustainable travel, climate policy, and green technology.
            </p>
          </div>
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const trendingArticles = articles.slice(0, 2);
  const regularArticles = articles.slice(2);

  return (
    <section id="news" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold text-primary">
            Latest in Sustainable Tourism
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Stay updated with the latest developments in sustainable travel, climate policy, and green technology.
          </p>
        </div>

        {/* Trending Articles */}
        {trendingArticles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h3 className="font-headline text-2xl font-bold">Trending Now</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trendingArticles.map((article, index) => {
                const category = categorizeArticle(article);
                return (
                  <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-primary/20">
                    <div className="relative">
                      {article.urlToImage ? (
                        <Image
                          src={article.urlToImage}
                          alt={article.title}
                          width={600}
                          height={250}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=600&h=250&fit=crop';
                          }}
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                          <TrendingUp className="w-16 h-16 text-primary/30" />
                        </div>
                      )}
                      <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={categoryColors[category]}>
                          {categoryLabels[category]}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(article.publishedAt)}
                        </div>
                      </div>
                      <CardTitle className="font-headline text-xl line-clamp-2">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-base line-clamp-3">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {article.source.name}
                        </span>
                        <Button asChild variant="outline" size="sm">
                          <a href={article.url} target="_blank" rel="noopener noreferrer">
                            Read More
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        {regularArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article, index) => {
              const category = categorizeArticle(article);
              return (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    {article.urlToImage ? (
                      <Image
                        src={article.urlToImage}
                        alt={article.title}
                        width={400}
                        height={200}
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=200&fit=crop';
                        }}
                      />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <TrendingUp className="w-12 h-12 text-primary/30" />
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={categoryColors[category]}>
                        {categoryLabels[category]}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(article.publishedAt)}
                      </div>
                    </div>
                    <CardTitle className="font-headline text-lg line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {article.source.name}
                      </span>
                      <Button asChild variant="outline" size="sm">
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                          Read More
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Newsletter Signup */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <h3 className="font-headline text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get the latest news about sustainable tourism, climate change, and eco-friendly travel tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}