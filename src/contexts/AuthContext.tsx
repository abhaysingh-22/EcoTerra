'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  preferences?: {
    preferredTransport?: string;
    sustainabilityGoals?: string[];
    carbonBudget?: number;
  };
  stats?: {
    totalTrips: number;
    totalCarbonSaved: number;
    totalDistance: number;
  };
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error('useAuth must be used within an AuthProvider');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, displayName: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
      
      // Create user profile in Firestore
      const userProfileData: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName,
        preferences: {
          sustainabilityGoals: [],
          carbonBudget: 1000, // Default 1000kg CO2 per year
        },
        stats: {
          totalTrips: 0,
          totalCarbonSaved: 0,
          totalDistance: 0,
        },
      };
      
      // For demo purposes, we'll just set the profile locally
      setUserProfile(userProfileData);
      console.log('User profile created for demo:', userProfileData);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      
      // For demo purposes, create a local profile
      const userProfileData: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || 'User',
        photoURL: user.photoURL || undefined,
        preferences: {
          sustainabilityGoals: [],
          carbonBudget: 1000,
        },
        stats: {
          totalTrips: 0,
          totalCarbonSaved: 0,
          totalDistance: 0,
        },
      };
      
      setUserProfile(userProfileData);
      console.log('Google user profile created for demo:', userProfileData);
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser || !userProfile) return;
    
    try {
      const updatedProfile = { ...userProfile, ...data };
      setUserProfile(updatedProfile as UserProfile);
      console.log('User profile updated for demo:', updatedProfile);
    } catch (error) {
      console.error('Update profile error:', error);
    }
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    try {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        
        if (user) {
          // For demo purposes, create a basic profile
          const basicProfile: UserProfile = {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || 'User',
            photoURL: user.photoURL || undefined,
            preferences: {
              sustainabilityGoals: [],
              carbonBudget: 1000,
            },
            stats: {
              totalTrips: 0,
              totalCarbonSaved: 0,
              totalDistance: 0,
            },
          };
          setUserProfile(basicProfile);
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
      });
    } catch (error) {
      console.error('Error setting up auth state listener:', error);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    updateUserProfile,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}