import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

interface ThemePreset {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export default function ThemeSettings() {
  const { theme, updateTheme, isLoading } = useTheme();
  const [primaryColor, setPrimaryColor] = useState('#4A2C82');
  const [secondaryColor, setSecondaryColor] = useState('#00A4BD');
  const [accentColor, setAccentColor] = useState('#D4AF37');
  const [currentTheme, setCurrentTheme] = useState('default');
  const { toast } = useToast();

  // Predefined theme presets
  const themePresets: ThemePreset[] = [
    {
      name: 'Default Theme',
      primaryColor: '#4A2C82',
      secondaryColor: '#00A4BD',
      accentColor: '#D4AF37'
    },
    {
      name: 'Holiday Theme',
      primaryColor: '#B22222', // red
      secondaryColor: '#228B22', // green
      accentColor: '#E5C100' // gold
    },
    {
      name: 'Summer Vibes',
      primaryColor: '#0077B6', // blue
      secondaryColor: '#F4A261', // orange
      accentColor: '#FFD700' // yellow
    }
  ];

  // Update local state when theme context changes
  useEffect(() => {
    if (theme) {
      setPrimaryColor(theme.primaryColor);
      setSecondaryColor(theme.secondaryColor);
      setAccentColor(theme.accentColor);
      setCurrentTheme(theme.currentTheme);
    }
  }, [theme]);

  const handleSaveTheme = async () => {
    if (!primaryColor || !secondaryColor || !accentColor) {
      toast({
        title: "Validation error",
        description: "All color fields are required",
        variant: "destructive",
      });
      return;
    }

    await updateTheme({
      primaryColor,
      secondaryColor,
      accentColor,
      currentTheme
    });
  };

  const applyThemePreset = (preset: ThemePreset) => {
    setPrimaryColor(preset.primaryColor);
    setSecondaryColor(preset.secondaryColor);
    setAccentColor(preset.accentColor);
    setCurrentTheme(preset.name.toLowerCase().replace(' ', '-'));
  };

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Color Scheme</CardTitle>
          <CardDescription>
            Customize the website colors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  type="color" 
                  id="primary-color" 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 p-1 rounded overflow-hidden"
                />
                <Input 
                  type="text" 
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Main brand color used for header, buttons, and accents</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  type="color" 
                  id="secondary-color" 
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-10 h-10 p-1 rounded overflow-hidden"
                />
                <Input 
                  type="text" 
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Used for secondary buttons and accent elements</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex items-center space-x-2">
                <Input 
                  type="color" 
                  id="accent-color" 
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-10 h-10 p-1 rounded overflow-hidden"
                />
                <Input 
                  type="text" 
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">Used for highlights and decorative elements</p>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleSaveTheme}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Saving..." : "Save Color Settings"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Theme Presets</CardTitle>
          <CardDescription>
            Choose from predefined theme combinations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {themePresets.map((preset, index) => (
              <button 
                key={index}
                className="w-full flex items-center justify-between border rounded-lg p-4 hover:border-primary focus:outline-none focus:border-primary"
                onClick={() => applyThemePreset(preset)}
              >
                <span className="font-heading">{preset.name}</span>
                <div className="flex space-x-2">
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: preset.primaryColor }}
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: preset.secondaryColor }}
                  ></div>
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: preset.accentColor }}
                  ></div>
                </div>
              </button>
            ))}
            
            <div className="pt-4 text-center text-sm text-muted-foreground">
              <p>Click on a preset to apply it, then save your changes.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
