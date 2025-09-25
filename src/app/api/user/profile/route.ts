import { NextRequest, NextResponse } from 'next/server';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// GET /api/user/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: userDoc.data() });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/user/profile - Create or update user profile
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const userData = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    // Validate required fields
    if (!userData.email || !userData.displayName) {
      return NextResponse.json({ error: 'Email and display name are required' }, { status: 400 });
    }

    const userProfileData = {
      uid: userId,
      email: userData.email,
      displayName: userData.displayName,
      photoURL: userData.photoURL || null,
      preferences: userData.preferences || {
        sustainabilityGoals: [],
        carbonBudget: 1000,
        preferredTransport: 'train',
      },
      stats: userData.stats || {
        totalTrips: 0,
        totalCarbonSaved: 0,
        totalDistance: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'users', userId), userProfileData, { merge: true });

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      user: userProfileData 
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/user/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const updateData = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 401 });
    }

    // Add updatedAt timestamp
    const updates = {
      ...updateData,
      updatedAt: new Date(),
    };

    await updateDoc(doc(db, 'users', userId), updates);

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      updates 
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}