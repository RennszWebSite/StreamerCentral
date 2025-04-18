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
  const { isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/');
      toast({
        title: "Access denied",
        description: "You need to be logged in to access the admin panel",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, setLocation, toast]);

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary">Admin Panel</h1>
            <p className="text-gray-500">Manage your website content and settings</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setLocation('/')}
            >
              View Site
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="stream" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="stream">Live Stream</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="theme">Theme Settings</TabsTrigger>
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
