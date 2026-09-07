import React, { createContext, useContext, useEffect, useState } from 'react';
import { DoctorUser } from '../types.ts';
import {
  apiGetMe,
  apiGoogleAuthSync,
  apiLogin,
  apiRegister,
  getStoredToken,
  removeStoredToken,
} from '../lib/api.ts';
import { isSupabaseConfigured, supabase } from '../lib/supabase.ts';

interface AuthContextType {
  user: DoctorUser | null;
  token: string | null;
  isLoading: boolean;
  isSupabaseOnline: boolean;
  loginWithPassword: (email: string, pass: string) => Promise<void>;
  registerDoctor: (email: string, pass: string, name: string, specialty?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DoctorUser | null>(null);
  const [token, setToken] = useState<string | null>(getStoredToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session on mount
  useEffect(() => {
    async function checkAuth() {
      const stored = getStoredToken();
      if (stored) {
        try {
          const userData = await apiGetMe();
          if (userData) {
            setUser(userData);
          } else {
            setToken(null);
          }
        } catch (e) {
          console.error('Session expired or invalid:', e);
          removeStoredToken();
          setToken(null);
        }
      } else {
        // Auto-login default demo doctor for quick evaluation if user hasn't logged in yet
        try {
          const res = await apiLogin('dr.minh@medlens.vn', 'Doctor@123');
          setUser(res.user);
          setToken(res.token);
        } catch (err) {
          // Ignore auto-seed fallback error
        }
      }
      setIsLoading(false);
    }
    checkAuth();

    // Listen to Supabase auth state change if configured
    if (isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const userData = await apiGetMe();
          if (userData) setUser(userData);
          setToken(session.access_token);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setToken(null);
          removeStoredToken();
        }
      });

      return () => {
        authListener?.subscription.unsubscribe();
      };
    }
  }, []);

  const loginWithPassword = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await apiLogin(email, pass);
      setUser(res.user);
      setToken(res.token);
    } finally {
      setIsLoading(false);
    }
  };

  const registerDoctor = async (email: string, pass: string, name: string, specialty?: string) => {
    setIsLoading(true);
    try {
      const res = await apiRegister(email, pass, name, specialty);
      setUser(res.user);
      setToken(res.token);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: window.location.origin },
        });
        if (error) throw error;
      } else {
        // Mock Google login
        const res = await apiGoogleAuthSync(
          'g_doc_' + Date.now(),
          'dr.google@hospital.vn',
          'BS. Google Clinician'
        );
        setUser(res.user);
        setToken(res.token);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (isSupabaseConfigured) {
      supabase.auth.signOut().catch(console.error);
    }
    removeStoredToken();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isSupabaseOnline: isSupabaseConfigured,
        loginWithPassword,
        registerDoctor,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
