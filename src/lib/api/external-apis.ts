// API utility functions for external data sources

export interface CarbonEstimate {
  distance_value: number;
  distance_unit: string;
  carbon_kg: number;
  carbon_lb: number;
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface CountryData {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  region: string;
  subregion: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  cca2: string;
  cca3: string;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author: string;
}

export interface AirQualityData {
  location: string;
  parameter: string;
  value: number;
  unit: string;
  date: {
    utc: string;
    local: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface SeaLevelData {
  time: string;
  value: number;
  unit: string;
}

// Carbon Interface API
export async function fetchCarbonFootprint(data: {
  type: 'vehicle' | 'flight';
  distance_value: number;
  distance_unit: 'km' | 'mi';
  vehicle_model_id?: string;
  departure_airport?: string;
  destination_airport?: string;
}): Promise<CarbonEstimate | null> {
  try {
    const response = await fetch('/api/carbon-footprint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch carbon footprint');
    }

    const result = await response.json();
    return result.data?.attributes || null;
  } catch (error) {
    console.error('Error fetching carbon footprint:', error);
    return null;
  }
}

// OpenWeatherMap API
export async function fetchWeatherData(city: string): Promise<WeatherData | null> {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

// REST Countries API
export async function fetchCountriesData(): Promise<CountryData[]> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,subregion,population,flags,cca2,cca3');
    
    if (!response.ok) {
      throw new Error('Failed to fetch countries data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching countries data:', error);
    return [];
  }
}

// News API
export async function fetchSustainabilityNews(): Promise<NewsArticle[]> {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=sustainable+tourism+OR+eco+travel+OR+climate+change+tourism&sortBy=publishedAt&language=en&pageSize=10&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// OpenAQ Air Quality API
export async function fetchAirQuality(city: string): Promise<AirQualityData[]> {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_OPENAQ_API_KEY;
    const response = await fetch(
      `https://api.openaq.org/v2/latest?city=${encodeURIComponent(city)}&parameter=pm25&limit=1`,
      {
        headers: {
          'X-API-Key': API_KEY || '',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch air quality data');
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return [];
  }
}

// Global Sea Level Data
export async function fetchGlobalSeaLevel(): Promise<SeaLevelData[]> {
  try {
    const response = await fetch(
      'https://d3qt3aobtsas2h.cloudfront.net/edge/ws/search/sealevelgovglobal?type=global'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch sea level data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching sea level data:', error);
    return [];
  }
}

// Sea Level by Coordinates
export async function fetchSeaLevelByCoordinates(lat: number, lon: number): Promise<SeaLevelData[]> {
  try {
    const response = await fetch(
      `https://d3qt3aobtsas2h.cloudfront.net/edge/ws/search/sealevelgovglobal?lat=${lat}&lon=${lon}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch sea level data by coordinates');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching sea level data by coordinates:', error);
    return [];
  }
}

// Helper function to get eco-friendly score for destinations
export async function getDestinationEcoScore(city: string, country: string) {
  try {
    const [weather, airQuality] = await Promise.all([
      fetchWeatherData(city),
      fetchAirQuality(city),
    ]);

    // Calculate a simple eco score based on air quality and other factors
    let ecoScore = 50; // Base score

    if (airQuality.length > 0) {
      const pm25 = airQuality[0].value;
      if (pm25 < 12) ecoScore += 30; // Good air quality
      else if (pm25 < 35) ecoScore += 15; // Moderate air quality
      else ecoScore -= 10; // Poor air quality
    }

    return {
      city,
      country,
      ecoScore: Math.max(0, Math.min(100, ecoScore)),
      weather,
      airQuality: airQuality[0] || null,
    };
  } catch (error) {
    console.error('Error calculating eco score:', error);
    return null;
  }
}