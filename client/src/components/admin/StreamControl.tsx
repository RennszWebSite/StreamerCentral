import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { StreamSetting } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';

export default function StreamControl() {
  const [activeStream, setActiveStream] = useState<'rennsz' | 'rennszino'>('rennsz');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current stream setting
  const { data, isLoading, error } = useQuery<StreamSetting>({
    queryKey: ['/api/settings/stream']
  });
  
  // Set the active stream when data changes
  useEffect(() => {
    if (data) {
      setActiveStream(data.activeStream);
    }
  }, [data]);

  // Update stream setting mutation
  const mutation = useMutation({
    mutationFn: async (newSetting: StreamSetting) => {
      const response = await apiRequest('PUT', '/api/settings/stream', newSetting);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Stream updated",
        description: "The active stream has been updated successfully",
      });
      // Invalidate the stream settings query to refetch it
      queryClient.invalidateQueries({ queryKey: ['/api/settings/stream'] });
    },
    onError: (err) => {
      console.error('Error updating stream:', err);
      toast({
        title: "Update failed",
        description: "Failed to update the active stream",
        variant: "destructive",
      });
    }
  });

  const handleStreamChange = (value: 'rennsz' | 'rennszino') => {
    setActiveStream(value);
  };

  const saveStreamSetting = async () => {
    mutation.mutate({ activeStream });
  };

  if (error) {
    return (
      <Card className="bg-black border border-gold/30 text-white">
        <CardHeader>
          <CardTitle className="text-gold">Stream Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-400">
            Error loading stream settings. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black border border-gold/30 text-white">
      <CardHeader>
        <CardTitle className="text-gold">Live Stream Control</CardTitle>
        <CardDescription className="text-gold-light">
          Choose which stream should be displayed in the hero section
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <RadioGroup 
            value={activeStream} 
            onValueChange={(value) => handleStreamChange(value as 'rennsz' | 'rennszino')}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="border border-gold/20 bg-black/30 rounded-lg p-4 space-y-2 hover:border-gold/50 transition-colors">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rennsz" id="rennsz" className="text-gold border-gold" />
                <Label htmlFor="rennsz" className="font-semibold text-lg text-gold">IRL Travel Stream</Label>
              </div>
              <div className="pl-6">
                <p className="text-sm text-gold-light mb-1">Channel: RENNSZ</p>
                <p className="text-sm text-gold-light mb-1">URL: https://www.twitch.tv/rennsz</p>
                <p className="text-sm text-gold-light">Focus on travel and exploration content</p>
              </div>
            </div>
            
            <div className="border border-gold/20 bg-black/30 rounded-lg p-4 space-y-2 hover:border-gold/50 transition-colors">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rennszino" id="rennszino" className="text-gold border-gold" />
                <Label htmlFor="rennszino" className="font-semibold text-lg text-gold">Gaming Stream</Label>
              </div>
              <div className="pl-6">
                <p className="text-sm text-gold-light mb-1">Channel: RENNSZINO</p>
                <p className="text-sm text-gold-light mb-1">URL: https://www.twitch.tv/rennszino</p>
                <p className="text-sm text-gold-light">Gaming and relaxed conversation content</p>
              </div>
            </div>
          </RadioGroup>
          
          <Button 
            onClick={saveStreamSetting}
            disabled={isLoading || mutation.isPending}
            className="bg-gold text-black hover:bg-gold/90 w-full md:w-auto"
          >
            {mutation.isPending ? "Updating..." : "Update Stream"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
