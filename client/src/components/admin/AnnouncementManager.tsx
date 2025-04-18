import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Announcement, InsertAnnouncement } from '@shared/schema';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function AnnouncementManager() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch announcements
  const { data: announcements = [], isLoading } = useQuery<Announcement[]>({
    queryKey: ['/api/announcements'],
  });

  // Add announcement mutation
  const addMutation = useMutation({
    mutationFn: async (announcement: InsertAnnouncement) => {
      const response = await apiRequest('POST', '/api/announcements', announcement);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Announcement created",
        description: "Your announcement has been published",
      });
      // Reset form and refetch announcements
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['/api/announcements'] });
    },
    onError: (err) => {
      console.error('Error creating announcement:', err);
      toast({
        title: "Creation failed",
        description: "Failed to create announcement",
        variant: "destructive",
      });
    }
  });

  // Delete announcement mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/announcements/${id}`, undefined);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Announcement deleted",
        description: "The announcement has been removed",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/announcements'] });
    },
    onError: (err) => {
      console.error('Error deleting announcement:', err);
      toast({
        title: "Deletion failed",
        description: "Failed to delete announcement",
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setTitle('');
    setContent('');
    setIsFeatured(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Validation error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }
    
    addMutation.mutate({
      title,
      content,
      isFeatured
    });
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
  };

  const handleDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Announcement</CardTitle>
          <CardDescription>
            Create a new announcement to display on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter announcement content"
                rows={4}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={isFeatured}
                onCheckedChange={(checked) => setIsFeatured(checked === true)}
              />
              <Label htmlFor="featured">Feature this announcement</Label>
            </div>
            
            <Button 
              type="submit" 
              disabled={addMutation.isPending}
              className="w-full md:w-auto"
            >
              {addMutation.isPending ? "Creating..." : "Create Announcement"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Announcements</CardTitle>
          <CardDescription>
            View and delete existing announcements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center py-4">Loading announcements...</p>
          ) : announcements.length === 0 ? (
            <p className="text-center py-4">No announcements yet.</p>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className="border rounded-lg p-4 flex justify-between items-start"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold">{announcement.title}</h3>
                      {announcement.isFeatured && (
                        <span className="bg-accent text-primary text-xs px-2 py-0.5 rounded-full font-heading font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      Posted on {format(new Date(announcement.date), 'MMMM d, yyyy')}
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => confirmDelete(announcement.id)}
                        className="text-gray-400 hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the announcement. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
