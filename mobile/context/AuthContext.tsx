import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';

type User = {
  id: string;
  username: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Load auth state
    AsyncStorage.getItem('user').then((userData) => {
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inAdminGroup = segments[0] === '(admin)';
    const inUserGroup = segments[0] === '(user)';

    // Redirect back to / if logout happened or no user for admin
    if (!user && inAdminGroup) {
      router.replace('/');
      return;
    }

    // AUTO-REDIRECT LOGIC: Only if we are at root/login but ALREADY have a user
    if (user && user.role) {
      if (!segments[0] || inAuthGroup) {
        if (user.role === 'admin') {
          router.replace('/(admin)/dashboard');
        } else if (user.role === 'user') {
          router.replace('/(user)/menu');
        }
      }
    }
  }, [user, segments, isLoading]);

  const signIn = async (userData: User) => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      // Wait for state to settle before navigating away to prevent race conditions with useEffect
      setTimeout(() => {
        router.replace('/');
      }, 0);
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
