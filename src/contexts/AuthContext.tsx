import React, { createContext, useState, useEffect, ReactNode } from "react";
import { authAPI } from "../lib/api"; // your API
import { User } from "../types"; // your user type

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: { message: string } | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: "user" | "worker"
  ) => Promise<{ error: { message: string } | null }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      localStorage.removeItem("auth_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const signIn = async (
    email: string,
    password: string
  ): Promise<{ error: { message: string } | null }> => {
    try {
      const response = await authAPI.signIn(email, password);
      localStorage.setItem("auth_token", response.token);
      await checkAuthStatus();
      return { error: null };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: { message: error.message } };
      }
      return { error: { message: "Sign in failed" } };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: "user" | "worker"
  ): Promise<{ error: { message: string } | null }> => {
    try {
      const response = await authAPI.signUp(email, password, fullName, role);
      localStorage.setItem("auth_token", response.token);
      await checkAuthStatus();
      return { error: null };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { error: { message: error.message } };
      }
      return { error: { message: "Sign up failed" } };
    }
  };

  const signOut = async (): Promise<void> => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
