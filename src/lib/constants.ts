export const co2Emissions = {
  flight: 0.255, // kg CO2 per km (updated for more accuracy)
  train: 0.014,  // kg CO2 per km
  car: 0.171,    // kg CO2 per km
  bus: 0.032,    // kg CO2 per km
} as const;

export const travelModes = ['Flight', 'Train', 'Car', 'Bus'] as const;
export type TravelMode = typeof travelModes[number];

export const weatherOptions = ['Any', 'Sunny', 'Rainy', 'Snowy'] as const;
export const seasonOptions = ['Any', 'Spring', 'Summer', 'Autumn', 'Winter'] as const;
