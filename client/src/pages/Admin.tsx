
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StreamControl from '../components/admin/StreamControl';
import AnnouncementManager from '../components/admin/AnnouncementManager';
import ThemeSettings from '../components/admin/ThemeSettings';
import { useToast } from '@/hooks/use-toast';

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const secretKey = searchParams.get('secret');
  const isAdmin = secretKey === 'rennszadmin2024';

  useEffect(() => {
    if (!isAdmin) {
      setLocation('/');
      toast({
        title: "Access denied",
        description: "Invalid access key",
        variant: "destructive",
      });
    }
  }, [isAdmin, setLocation, toast]);

  if (!isAdmin) {
    return null;
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
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/50 border border-gold/30">
            <TabsTrigger value="stream" className="data-[state=active]:bg-gold data-[state=active]:text-black">Live Stream</TabsTrigger>
            <TabsTrigger value="announcements" className="data-[state=active]:bg-gold data-[state=active]:text-black">Announcements</TabsTrigger>
            <TabsTrigger value="theme" className="data-[state=active]:bg-gold data-[state=active]:text-black">Theme Settings</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
}
