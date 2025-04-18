
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StreamControl from '../components/admin/StreamControl';
import AnnouncementManager from '../components/admin/AnnouncementManager';
import ThemeSettings from '../components/admin/ThemeSettings';

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(true);
  
  const isAdmin = isAuthenticated;
  const ADMIN_PASSWORD = 'RennszAdmin2024!';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setShowPasswordPrompt(false);
    } else {
      toast({
        title: "Access denied",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  if (!isAdmin && showPasswordPrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/95">
        <form onSubmit={handlePasswordSubmit} className="w-full max-w-md p-8 border border-gold/30 rounded-lg">
          <h2 className="text-2xl font-heading mb-6 gold-gradient">Admin Access</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 bg-black border border-gold/50 rounded text-white"
            placeholder="Enter admin password"
          />
          <button type="submit" className="w-full p-2 bg-gold text-black rounded hover:bg-gold/90">
            Access Admin Panel
          </button>
        </form>
      </div>
    );
  }

  const handleLogout = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--dark-bg)' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold gold-gradient inline-block">Admin Panel</h1>
            <p className="text-gold-light">Manage your website content and settings</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              className="bg-black border border-gold/50 text-gold hover:bg-gold hover:text-black"
              onClick={() => setLocation('/')}
            >
              View Site
            </Button>
            <Button 
              className="bg-black border border-red-800/50 text-red-400 hover:bg-red-950/30" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="stream" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-black/50 border border-gold/30">
            <TabsTrigger value="stream" className="data-[state=active]:bg-gold data-[state=active]:text-black">Live Stream</TabsTrigger>
            <TabsTrigger value="announcements" className="data-[state=active]:bg-gold data-[state=active]:text-black">Announcements</TabsTrigger>
            <TabsTrigger value="theme" className="data-[state=active]:bg-gold data-[state=active]:text-black">Theme Settings</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gold data-[state=active]:text-black">Security</TabsTrigger>
            <TabsTrigger value="socials" className="data-[state=active]:bg-gold data-[state=active]:text-black">Social Links</TabsTrigger>
          </TabsList>

          <TabsContent value="stream">
            <StreamControl />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementManager />
          </TabsContent>

          <TabsContent value="theme">
            <ThemeSettings />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="socials">
            <SocialSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
