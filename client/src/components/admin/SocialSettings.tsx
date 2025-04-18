
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

interface Social {
  id: number;
  platform: string;
  url: string;
}

export default function SocialSettings() {
  const [socials, setSocials] = useState<Social[]>([]);
  const [newPlatform, setNewPlatform] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchSocials();
  }, []);

  const fetchSocials = async () => {
    try {
      const response = await fetch('/api/settings/socials');
      if (!response.ok) throw new Error('Failed to fetch socials');
      const data = await response.json();
      setSocials(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load social links",
        variant: "destructive",
      });
    }
  };

  const handleAddSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiRequest('POST', '/api/settings/socials', {
        platform: newPlatform,
        url: newUrl
      });

      if (!response.ok) throw new Error('Failed to add social');

      const newSocial = await response.json();
      setSocials([...socials, newSocial]);
      setNewPlatform('');
      setNewUrl('');
      
      toast({
        title: "Social added",
        description: "New social link has been added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add social link",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSocial = async (id: number) => {
    try {
      const response = await apiRequest('DELETE', `/api/settings/socials/${id}`);
      if (!response.ok) throw new Error('Failed to delete social');
      
      setSocials(socials.filter(social => social.id !== id));
      toast({
        title: "Social deleted",
        description: "Social link has been removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete social link",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-black border border-gold/30 text-white">
      <CardHeader>
        <CardTitle className="text-gold">Social Links</CardTitle>
        <CardDescription className="text-gold-light">
          Manage your social media links
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddSocial} className="space-y-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Input
              id="platform"
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              placeholder="e.g. Twitter, Instagram"
              className="bg-black border-gold/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://"
              className="bg-black border-gold/50"
            />
          </div>
          <Button type="submit" className="w-full bg-gold text-black hover:bg-gold/90">
            Add Social Link
          </Button>
        </form>

        <div className="space-y-2">
          {socials.map(social => (
            <div key={social.id} className="flex items-center justify-between p-2 border border-gold/30 rounded">
              <div>
                <p className="font-medium">{social.platform}</p>
                <p className="text-sm text-gold-light">{social.url}</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => handleDeleteSocial(social.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
