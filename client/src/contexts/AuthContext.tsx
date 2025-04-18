import React, { createContext, useContext, useState, ReactNode } from 'react';
import { login as apiLogin } from '../lib/auth';
import { toast } from "@/hooks/use-toast";

// Define the context type
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {}
});

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username: string, password: string) => {
    try {
      const result = await apiLogin(username, password);
      
      if (result.success) {
        setIsAuthenticated(true);
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: result.message || "Invalid username or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  // Create the value object
  const value = {
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
