import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, distance_value, distance_unit, vehicle_model_id, departure_airport, destination_airport } = body;

    const response = await fetch('https://www.carboninterface.com/api/v1/estimates', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CARBON_INTERFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        distance_value,
        distance_unit,
        ...(type === 'vehicle' && vehicle_model_id && { vehicle_model_id }),
        ...(type === 'flight' && departure_airport && destination_airport && {
          legs: [{ departure_airport, destination_airport }],
        }),
      }),
    });

    if (!response.ok) {
      throw new Error(`Carbon Interface API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Carbon footprint API error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate carbon footprint' },
      { status: 500 }
    );
  }
}