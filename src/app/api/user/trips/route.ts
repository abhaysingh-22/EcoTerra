import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// GET /api/user/trips - Get user's carbon footprint history
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    // Create query for user's trips
    let q = query(
      collection(db, 'carbonFootprints'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    // Add limit if specified
    if (limitParam) {
      q = query(q, limit(parseInt(limitParam)));
    }

    const querySnapshot = await getDocs(q);
    const trips = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toDate?.() || data.timestamp,
      };
    });

    // Calculate summary statistics
    const summary = {
      totalTrips: trips.length,
      totalEmissions: trips.reduce((sum, trip: any) => sum + (trip.emission || 0), 0),
      totalDistance: trips.reduce((sum, trip: any) => sum + (trip.distance || 0), 0),
      averageEmission: trips.length > 0 ? trips.reduce((sum, trip: any) => sum + (trip.emission || 0), 0) / trips.length : 0,
      transportModes: trips.reduce((acc, trip: any) => {
        acc[trip.mode] = (acc[trip.mode] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };

    return NextResponse.json({
      trips,
      summary,
      count: trips.length,
    });
  } catch (error) {
    console.error('Error fetching user trips:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}