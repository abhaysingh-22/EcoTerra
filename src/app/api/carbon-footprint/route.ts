import { NextRequest, NextResponse } from 'next/server';
import { calculateCarbonFootprint } from '@/lib/hardcoded-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, distance_value, distance_unit, passengers = 1, travelMode } = body;

    // Validate input
    if (!type || !distance_value || !distance_unit) {
      return NextResponse.json(
        { error: 'Missing required fields: type, distance_value, distance_unit' },
        { status: 400 }
      );
    }

    // Add a small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));

    // Use hardcoded calculation
    const result = calculateCarbonFootprint({
      type: type as 'vehicle' | 'flight',
      distance_value: parseFloat(distance_value),
      distance_unit: distance_unit as 'km' | 'mi',
      vehicle_model: travelMode || type,
    });

    // Apply passenger multiplier
    const finalResult = {
      ...result,
      carbon_kg: result.carbon_kg * passengers,
      carbon_lb: result.carbon_lb * passengers,
    };

    // Format response to match Carbon Interface API structure
    const apiResponse = {
      data: {
        id: `estimate_${Date.now()}`,
        type: 'estimate',
        attributes: {
          distance_value: finalResult.distance_value,
          distance_unit: finalResult.distance_unit,
          carbon_g: finalResult.carbon_kg * 1000,
          carbon_lb: finalResult.carbon_lb,
          carbon_kg: finalResult.carbon_kg,
          carbon_mt: finalResult.carbon_kg / 1000,
          estimated_at: new Date().toISOString(),
        },
      },
    };

    return NextResponse.json(apiResponse);
    
  } catch (error) {
    console.error('Carbon footprint calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate carbon footprint' },
      { status: 500 }
    );
  }
}