'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { signIn as apiSignIn, signUp as apiSignUp, signOut as apiSignOut, onAuthStateChanged, SignUpCredentials, Credentials } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (credentials: Credentials) => Promise<User>;
  signUp: (credentials: SignUpCredentials) => Promise<User>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (credentials: Credentials) => {
    setLoading(true);
    try {
      const loggedInUser = await apiSignIn(credentials);
      setUser(loggedInUser);
      return loggedInUser;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    setLoading(true);
    try {
      const newUser = await apiSignUp(credentials);
      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await apiSignOut();
      setUser(null);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
