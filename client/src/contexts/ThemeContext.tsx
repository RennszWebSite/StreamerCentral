import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiRequest } from '../lib/queryClient';
import { ThemeSettings } from '@shared/schema';
import { toast } from '@/hooks/use-toast';

interface ThemeContextType {
  theme: ThemeSettings | null;
  updateTheme: (newTheme: ThemeSettings) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: ThemeSettings = {
  primaryColor: '#4A2C82',
  secondaryColor: '#00A4BD',
  accentColor: '#D4AF37',
  currentTheme: 'default'
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const updateTheme = async (newTheme: ThemeSettings) => {
    try {
      setIsLoading(true);
      const response = await apiRequest('PUT', '/api/settings/theme', newTheme);
      
      if (!response.ok) {
        throw new Error('Failed to update theme settings');
      }
      
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

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, isLoading, error }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
