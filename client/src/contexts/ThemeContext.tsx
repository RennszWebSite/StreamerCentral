import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest } from '../lib/queryClient';
import { ThemeSettings } from '@shared/schema';
import { toast } from '@/hooks/use-toast';

// Define theme context type
interface ThemeContextType {
  theme: ThemeSettings | null;
  updateTheme: (newTheme: ThemeSettings) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

// Default theme settings
const defaultTheme: ThemeSettings = {
  primaryColor: '#4A2C82',
  secondaryColor: '#00A4BD',
  accentColor: '#D4AF37',
  currentTheme: 'default'
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: async () => {},
  isLoading: false,
  error: null
});

// Theme provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeSettings | null>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch theme on mount
  useEffect(() => {
    async function fetchTheme() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/settings/theme');
        
        if (!response.ok) {
          throw new Error('Failed to fetch theme settings');
        }
        
        const themeData = await response.json();
        setTheme(themeData);
        setError(null);
      } catch (err) {
        console.error('Error fetching theme:', err);
        setTheme(defaultTheme);
        setError('Failed to load theme settings');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTheme();
  }, []);

  // Update theme function with localStorage persistence
  const updateTheme = async (newTheme: ThemeSettings) => {
    try {
      setIsLoading(true);
      const response = await apiRequest('PUT', '/api/settings/theme', newTheme);
      
      if (!response.ok) {
        throw new Error('Failed to update theme settings');
      }
      
      // Store theme in localStorage
      localStorage.setItem('theme', JSON.stringify(newTheme));
      
      setTheme(newTheme);
      toast({
        title: "Theme updated",
        description: "Theme settings have been updated successfully",
      });
    } catch (err) {
      console.error('Error updating theme:', err);
      setError('Failed to update theme settings');
      toast({
        title: "Update failed",
        description: "Failed to update theme settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  // Create context value
  const value = {
    theme,
    updateTheme,
    isLoading,
    error
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme() {
  return useContext(ThemeContext);
}
