// Hardcoded data to replace external API calls

export interface HardcodedCarbonEstimate {
  distance_value: number;
  distance_unit: string;
  carbon_kg: number;
  carbon_lb: number;
}

export interface HardcodedWeatherData {
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

export interface HardcodedCountryData {
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

export interface HardcodedNewsArticle {
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

// Hardcoded carbon calculation function
export function calculateCarbonFootprint(data: {
  type: 'vehicle' | 'flight';
  distance_value: number;
  distance_unit: 'km' | 'mi';
  vehicle_model?: string;
}): HardcodedCarbonEstimate {
  let carbonPerKm = 0;
  
  // Convert distance to km if needed
  const distanceKm = data.distance_unit === 'mi' ? data.distance_value * 1.60934 : data.distance_value;
  
  // Carbon emission factors (kg CO2 per km)
  switch (data.type) {
    case 'flight':
      carbonPerKm = 0.255; // Average for commercial flights
      break;
    case 'vehicle':
      if (data.vehicle_model?.toLowerCase().includes('electric')) {
        carbonPerKm = 0.05; // Electric vehicles
      } else if (data.vehicle_model?.toLowerCase().includes('hybrid')) {
        carbonPerKm = 0.12; // Hybrid vehicles
      } else {
        carbonPerKm = 0.171; // Average gasoline car
      }
      break;
    default:
      carbonPerKm = 0.1; // Default value
  }
  
  const carbonKg = distanceKm * carbonPerKm;
  const carbonLb = carbonKg * 2.20462;
  
  return {
    distance_value: distanceKm,
    distance_unit: 'km',
    carbon_kg: parseFloat(carbonKg.toFixed(2)),
    carbon_lb: parseFloat(carbonLb.toFixed(2)),
  };
}

// Hardcoded weather data for popular cities
export const hardcodedWeatherData: Record<string, HardcodedWeatherData> = {
  'london': {
    name: 'London',
    main: { temp: 15, feels_like: 13, humidity: 72 },
    weather: [{ main: 'Clouds', description: 'partly cloudy', icon: '02d' }],
    wind: { speed: 3.5 }
  },
  'paris': {
    name: 'Paris',
    main: { temp: 18, feels_like: 16, humidity: 65 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 2.8 }
  },
  'tokyo': {
    name: 'Tokyo',
    main: { temp: 22, feels_like: 24, humidity: 78 },
    weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
    wind: { speed: 1.9 }
  },
  'new york': {
    name: 'New York',
    main: { temp: 20, feels_like: 19, humidity: 58 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 4.2 }
  },
  'berlin': {
    name: 'Berlin',
    main: { temp: 16, feels_like: 14, humidity: 68 },
    weather: [{ main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
    wind: { speed: 3.1 }
  },
  'amsterdam': {
    name: 'Amsterdam',
    main: { temp: 14, feels_like: 12, humidity: 75 },
    weather: [{ main: 'Rain', description: 'light rain', icon: '10d' }],
    wind: { speed: 4.8 }
  },
  'barcelona': {
    name: 'Barcelona',
    main: { temp: 24, feels_like: 25, humidity: 62 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 2.3 }
  },
  'rome': {
    name: 'Rome',
    main: { temp: 26, feels_like: 28, humidity: 55 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    wind: { speed: 1.7 }
  }
};

// Hardcoded countries data (subset for demo)
export const hardcodedCountriesData: HardcodedCountryData[] = [
  {
    name: { common: 'France', official: 'French Republic' },
    capital: ['Paris'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 67391582,
    flags: { png: 'https://flagcdn.com/w320/fr.png', svg: 'https://flagcdn.com/fr.svg' },
    cca2: 'FR',
    cca3: 'FRA'
  },
  {
    name: { common: 'United Kingdom', official: 'United Kingdom of Great Britain and Northern Ireland' },
    capital: ['London'],
    region: 'Europe',
    subregion: 'Northern Europe',
    population: 67886011,
    flags: { png: 'https://flagcdn.com/w320/gb.png', svg: 'https://flagcdn.com/gb.svg' },
    cca2: 'GB',
    cca3: 'GBR'
  },
  {
    name: { common: 'Germany', official: 'Federal Republic of Germany' },
    capital: ['Berlin'],
    region: 'Europe',
    subregion: 'Central Europe',
    population: 83240525,
    flags: { png: 'https://flagcdn.com/w320/de.png', svg: 'https://flagcdn.com/de.svg' },
    cca2: 'DE',
    cca3: 'DEU'
  },
  {
    name: { common: 'Netherlands', official: 'Kingdom of the Netherlands' },
    capital: ['Amsterdam'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 17441139,
    flags: { png: 'https://flagcdn.com/w320/nl.png', svg: 'https://flagcdn.com/nl.svg' },
    cca2: 'NL',
    cca3: 'NLD'
  },
  {
    name: { common: 'Spain', official: 'Kingdom of Spain' },
    capital: ['Madrid'],
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 47351567,
    flags: { png: 'https://flagcdn.com/w320/es.png', svg: 'https://flagcdn.com/es.svg' },
    cca2: 'ES',
    cca3: 'ESP'
  },
  {
    name: { common: 'Italy', official: 'Italian Republic' },
    capital: ['Rome'],
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 59554023,
    flags: { png: 'https://flagcdn.com/w320/it.png', svg: 'https://flagcdn.com/it.svg' },
    cca2: 'IT',
    cca3: 'ITA'
  },
  {
    name: { common: 'Japan', official: 'Japan' },
    capital: ['Tokyo'],
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 125836021,
    flags: { png: 'https://flagcdn.com/w320/jp.png', svg: 'https://flagcdn.com/jp.svg' },
    cca2: 'JP',
    cca3: 'JPN'
  },
  {
    name: { common: 'United States', official: 'United States of America' },
    capital: ['Washington, D.C.'],
    region: 'Americas',
    subregion: 'North America',
    population: 329484123,
    flags: { png: 'https://flagcdn.com/w320/us.png', svg: 'https://flagcdn.com/us.svg' },
    cca2: 'US',
    cca3: 'USA'
  }
];

// Hardcoded sustainability news
export const hardcodedSustainabilityNews: HardcodedNewsArticle[] = [
  {
    title: 'European Cities Lead in Sustainable Tourism Initiatives',
    description: 'Major European cities are implementing innovative green tourism programs to reduce carbon footprints while maintaining visitor satisfaction.',
    url: 'https://example.com/sustainable-tourism-europe',
    urlToImage: 'https://images.unsplash.com/photo-1539650116574-75c0c6d36eac?w=800',
    publishedAt: '2025-09-20T10:30:00Z',
    source: { name: 'Green Travel Today' },
    author: 'Sarah Johnson'
  },
  {
    title: 'Electric Aviation Takes Flight: New Zero-Emission Aircraft Testing',
    description: 'Revolutionary electric aircraft technology could transform short-haul flights, reducing aviation emissions by up to 90%.',
    url: 'https://example.com/electric-aviation',
    urlToImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    publishedAt: '2025-09-19T14:15:00Z',
    source: { name: 'Aviation Green' },
    author: 'Michael Chen'
  },
  {
    title: 'Rail Networks Expand Across Europe for Climate-Friendly Travel',
    description: 'New high-speed rail connections make train travel more convenient and attractive than flying for many European routes.',
    url: 'https://example.com/european-rail-expansion',
    urlToImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    publishedAt: '2025-09-18T09:45:00Z',
    source: { name: 'Railway Times' },
    author: 'Emma Rodriguez'
  },
  {
    title: 'Eco-Hotels Set New Standards for Sustainable Hospitality',
    description: 'Leading hotel chains are achieving carbon neutrality through renewable energy, waste reduction, and local sourcing programs.',
    url: 'https://example.com/eco-hotels-standards',
    urlToImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    publishedAt: '2025-09-17T16:20:00Z',
    source: { name: 'Hospitality Green' },
    author: 'David Park'
  },
  {
    title: 'Carbon Offset Programs: What Travelers Need to Know',
    description: 'A comprehensive guide to choosing effective carbon offset programs and understanding their real environmental impact.',
    url: 'https://example.com/carbon-offset-guide',
    urlToImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    publishedAt: '2025-09-16T11:30:00Z',
    source: { name: 'Climate Action News' },
    author: 'Lisa Thompson'
  },
  {
    title: 'Local Tourism Booms as Travelers Seek Nearby Adventures',
    description: 'The trend toward local and regional travel is reducing transportation emissions while supporting local economies.',
    url: 'https://example.com/local-tourism-boom',
    urlToImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    publishedAt: '2025-09-15T13:10:00Z',
    source: { name: 'Travel Weekly' },
    author: 'James Wilson'
  }
];

// Hardcoded air quality data
export const hardcodedAirQualityData = {
  'london': { location: 'London', parameter: 'pm25', value: 15.2, unit: 'μg/m³', date: { utc: '2025-09-25T10:00:00Z', local: '2025-09-25T11:00:00+01:00' }, coordinates: { latitude: 51.5074, longitude: -0.1278 } },
  'paris': { location: 'Paris', parameter: 'pm25', value: 18.7, unit: 'μg/m³', date: { utc: '2025-09-25T10:00:00Z', local: '2025-09-25T12:00:00+02:00' }, coordinates: { latitude: 48.8566, longitude: 2.3522 } },
  'tokyo': { location: 'Tokyo', parameter: 'pm25', value: 12.3, unit: 'μg/m³', date: { utc: '2025-09-25T10:00:00Z', local: '2025-09-25T19:00:00+09:00' }, coordinates: { latitude: 35.6762, longitude: 139.6503 } },
  'new york': { location: 'New York', parameter: 'pm25', value: 14.8, unit: 'μg/m³', date: { utc: '2025-09-25T10:00:00Z', local: '2025-09-25T06:00:00-04:00' }, coordinates: { latitude: 40.7128, longitude: -74.0060 } },
  'berlin': { location: 'Berlin', parameter: 'pm25', value: 16.5, unit: 'μg/m³', date: { utc: '2025-09-25T10:00:00Z', local: '2025-09-25T12:00:00+02:00' }, coordinates: { latitude: 52.5200, longitude: 13.4050 } },
  'amsterdam': { location: 'Amsterdam', parameter: 'pm25', value: 13.9, unit: 'μg/m³', date: { utc: '2025-09-25T10:00:00Z', local: '2025-09-25T12:00:00+02:00' }, coordinates: { latitude: 52.3676, longitude: 4.9041 } },
  'barcelona': { location: 'Barcelona', parameter: 'pm25', value: 20.1, unit: 'μg/m³', date: { utc: '2025-09-25T10:00:00Z', local: '2025-09-25T12:00:00+02:00' }, coordinates: { latitude: 41.3851, longitude: 2.1734 } },
  'rome': { location: 'Rome', parameter: 'pm25', value: 22.4, unit: 'μg/m³', date: { utc: '2025-09-25T10:00:00Z', local: '2025-09-25T12:00:00+02:00' }, coordinates: { latitude: 41.9028, longitude: 12.4964 } }
};

// Hardcoded sea level data
export const hardcodedSeaLevelData = [
  { time: '2025-09-25', value: 3.3, unit: 'mm/year' },
  { time: '2025-09-24', value: 3.2, unit: 'mm/year' },
  { time: '2025-09-23', value: 3.4, unit: 'mm/year' },
];

// Helper functions to simulate API responses
export function getHardcodedWeatherData(city: string): HardcodedWeatherData | null {
  const normalizedCity = city.toLowerCase();
  return hardcodedWeatherData[normalizedCity] || null;
}

export function getHardcodedAirQualityData(city: string) {
  const normalizedCity = city.toLowerCase() as keyof typeof hardcodedAirQualityData;
  return hardcodedAirQualityData[normalizedCity] ? [hardcodedAirQualityData[normalizedCity]] : [];
}

export function getHardcodedCountriesData(): HardcodedCountryData[] {
  return hardcodedCountriesData;
}

export function getHardcodedSustainabilityNews(): HardcodedNewsArticle[] {
  return hardcodedSustainabilityNews;
}

export function getHardcodedSeaLevelData() {
  return hardcodedSeaLevelData;
}

// Helper function to get eco-friendly score for destinations
export function getDestinationEcoScore(city: string, country: string) {
  const weather = getHardcodedWeatherData(city);
  const airQuality = getHardcodedAirQualityData(city);

  // Calculate a simple eco score based on air quality and other factors
  let ecoScore = 50; // Base score

  if (airQuality.length > 0) {
    const pm25 = airQuality[0].value;
    if (pm25 < 12) ecoScore += 30; // Good air quality
    else if (pm25 < 35) ecoScore += 15; // Moderate air quality
    else ecoScore -= 10; // Poor air quality
  }

  // Bonus for European cities (better rail infrastructure)
  const europeanCities = ['london', 'paris', 'berlin', 'amsterdam', 'barcelona', 'rome'];
  if (europeanCities.includes(city.toLowerCase())) {
    ecoScore += 20;
  }

  return {
    city,
    country,
    ecoScore: Math.max(0, Math.min(100, ecoScore)),
    weather,
    airQuality: airQuality[0] || null,
  };
}