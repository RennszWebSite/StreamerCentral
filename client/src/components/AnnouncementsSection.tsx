import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Announcement } from '@shared/schema';

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        setLoading(true);
        const response = await fetch('/api/announcements');
        
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        
        const data = await response.json();
        setAnnouncements(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements');
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  // Get the featured announcement
  const featuredAnnouncement = announcements.find(a => a.isFeatured);
  // Get other announcements
  const otherAnnouncements = announcements.filter(a => !a.isFeatured);

  return (
    <section id="announcements" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-accent font-bold text-primary mb-2">Latest Announcements</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        {loading ? (
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-primary p-6">
              <Skeleton className="h-8 w-3/4 bg-white/20 mb-2" />
              <Skeleton className="h-16 w-full bg-white/20 mb-2" />
              <Skeleton className="h-4 w-1/4 bg-white/20" />
            </div>
            <div className="p-6 space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <Skeleton className="h-6 w-1/2 bg-gray-200 mb-2" />
                <Skeleton className="h-12 w-full bg-gray-200 mb-2" />
                <Skeleton className="h-4 w-1/4 bg-gray-200" />
              </div>
              <div className="border-b border-gray-200 pb-6">
                <Skeleton className="h-6 w-1/2 bg-gray-200 mb-2" />
                <Skeleton className="h-12 w-full bg-gray-200 mb-2" />
                <Skeleton className="h-4 w-1/4 bg-gray-200" />
              </div>
            </div>
          </div>
        ) : error ? (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6 text-center text-error">
              <p>{error}</p>
              <p>Please try again later.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl shadow-lg overflow-hidden">
            {/* Featured Announcement */}
            {featuredAnnouncement ? (
              <div className="bg-primary text-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold">{featuredAnnouncement.title}</h3>
                  <span className="text-sm bg-accent text-primary px-3 py-1 rounded-full font-heading font-semibold">Featured</span>
                </div>
                <p className="mt-2 text-gray-100">{featuredAnnouncement.content}</p>
                <div className="mt-3 text-sm text-gray-200">
                  Posted on {format(new Date(featuredAnnouncement.date), 'MMMM d, yyyy')}
                </div>
              </div>
            ) : (
              <div className="bg-primary text-white p-6">
                <p className="text-center">No featured announcements yet.</p>
              </div>
            )}
            
            {/* Other Announcements */}
            <div className="p-6 space-y-6">
              {otherAnnouncements.length > 0 ? (
                otherAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-heading font-semibold text-dark">{announcement.title}</h3>
                    <p className="mt-2 text-gray-600">{announcement.content}</p>
                    <div className="mt-3 text-sm text-gray-500">
                      Posted on {format(new Date(announcement.date), 'MMMM d, yyyy')}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No announcements available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
