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
      <Card className="bg-black border border-gold/30 text-white">
        <CardHeader>
          <CardTitle className="text-gold">Add New Announcement</CardTitle>
          <CardDescription className="text-gold-light">
            Create a new announcement to display on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gold">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
                className="bg-black border-gold/30 text-white focus:border-gold"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content" className="text-gold">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter announcement content"
                rows={4}
                className="bg-black border-gold/30 text-white focus:border-gold"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={isFeatured}
                onCheckedChange={(checked) => setIsFeatured(checked === true)}
                className="border-gold/50 data-[state=checked]:bg-gold data-[state=checked]:text-black"
              />
              <Label htmlFor="featured" className="text-gold-light">Feature this announcement</Label>
            </div>
            
            <Button 
              type="submit" 
              disabled={addMutation.isPending}
              className="bg-gold text-black hover:bg-gold/90 w-full md:w-auto"
            >
              {addMutation.isPending ? "Creating..." : "Create Announcement"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="bg-black border border-gold/30 text-white">
        <CardHeader>
          <CardTitle className="text-gold">Manage Announcements</CardTitle>
          <CardDescription className="text-gold-light">
            View and delete existing announcements
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center py-4 text-gold-light">Loading announcements...</p>
          ) : announcements.length === 0 ? (
            <p className="text-center py-4 text-gold-light">No announcements yet.</p>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className="border border-gold/20 bg-black/30 rounded-lg p-4 flex justify-between items-start hover:border-gold/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold text-gold">{announcement.title}</h3>
                      {announcement.isFeatured && (
                        <span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full font-heading font-semibold border border-gold/30">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white mt-1">{announcement.content}</p>
                    <div className="text-xs text-gold-light mt-1">
                      Posted on {format(new Date(announcement.date), 'MMMM d, yyyy')}
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => confirmDelete(announcement.id)}
                        className="text-gold/50 hover:text-red-400 hover:bg-transparent"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black border border-gold/30 text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-gold">Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gold-light">
                          This will permanently delete the announcement. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-black border border-gold/50 text-gold hover:bg-gold hover:text-black">Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleDelete}
                          className="bg-black border border-red-800/50 text-red-400 hover:bg-red-950/30"
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
