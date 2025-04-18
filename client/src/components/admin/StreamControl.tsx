import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { StreamSetting } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function StreamControl() {
  const [activeStream, setActiveStream] = useState<'rennsz' | 'rennszino'>('rennsz');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current stream setting
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/settings/stream'],
    onSuccess: (data: StreamSetting) => {
      setActiveStream(data.activeStream);
    }
  });

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
      <Card>
        <CardHeader>
          <CardTitle>Stream Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-destructive">
            Error loading stream settings. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Stream Control</CardTitle>
        <CardDescription>
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
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rennsz" id="rennsz" />
                <Label htmlFor="rennsz" className="font-semibold text-lg">IRL Travel Stream</Label>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground mb-1">Channel: RENNSZ</p>
                <p className="text-sm text-muted-foreground mb-1">URL: https://www.twitch.tv/rennsz</p>
                <p className="text-sm text-muted-foreground">Focus on travel and exploration content</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rennszino" id="rennszino" />
                <Label htmlFor="rennszino" className="font-semibold text-lg">Gaming Stream</Label>
              </div>
              <div className="pl-6">
                <p className="text-sm text-muted-foreground mb-1">Channel: RENNSZINO</p>
                <p className="text-sm text-muted-foreground mb-1">URL: https://www.twitch.tv/rennszino</p>
                <p className="text-sm text-muted-foreground">Gaming and relaxed conversation content</p>
              </div>
            </div>
          </RadioGroup>
          
          <Button 
            onClick={saveStreamSetting}
            disabled={isLoading || mutation.isPending}
            className="w-full md:w-auto"
          >
            {mutation.isPending ? "Updating..." : "Update Stream"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
