
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Settings, Plus, Loader2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WebsiteConnection {
  id: string;
  name: string;
  url: string;
  type: 'custom' | 'wordpress' | 'headless';
  apiEndpoint: string;
  credentials: {
    apiKey?: string;
    username?: string;
    password?: string;
  };
}

interface BlogPost {
  title: string;
  content: string;
  wordCount: number;
  generatedAt: Date;
}

interface BlogPublisherProps {
  blogPost: BlogPost | null;
}

export const BlogPublisher = ({ blogPost }: BlogPublisherProps) => {
  const { toast } = useToast();
  const [websites, setWebsites] = useState<WebsiteConnection[]>([
    {
      id: 'sankalp-nexus',
      name: 'Sankalp Nexus Suite',
      url: 'https://sankalp-nexus-suite.vercel.app',
      type: 'custom',
      apiEndpoint: 'https://sankalp-nexus-suite.vercel.app/api/blog',
      credentials: {},
    }
  ]);
  
  const [selectedWebsite, setSelectedWebsite] = useState<string>('sankalp-nexus');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isAddingWebsite, setIsAddingWebsite] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  
  // New website form state
  const [newWebsite, setNewWebsite] = useState({
    name: '',
    url: '',
    type: 'custom' as const,
    apiEndpoint: '',
    apiKey: '',
    username: '',
    password: '',
  });

  const publishBlog = async () => {
    if (!blogPost) {
      toast({
        title: 'No Blog Post',
        description: 'Please generate a blog post before publishing.',
        variant: 'destructive',
      });
      return;
    }

    const website = websites.find(w => w.id === selectedWebsite);
    if (!website) {
      toast({
        title: 'Website Not Found',
        description: 'Please select a valid website to publish to.',
        variant: 'destructive',
      });
      return;
    }

    setIsPublishing(true);
    setPublishedUrl(null);

    try {
      // Prepare the blog post data
      const publishData = {
        title: blogPost.title,
        content: blogPost.content,
        excerpt: blogPost.content.substring(0, 200) + '...',
        status: 'publish',
        author: 'AI Blog Writer',
        tags: ['ai-generated', 'blog'],
        publishedAt: new Date().toISOString(),
      };

      // Make the API call to publish
      const response = await fetch(website.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(website.credentials.apiKey && {
            'Authorization': `Bearer ${website.credentials.apiKey}`
          }),
          ...(website.credentials.username && website.credentials.password && {
            'Authorization': `Basic ${btoa(`${website.credentials.username}:${website.credentials.password}`)}`
          }),
        },
        body: JSON.stringify(publishData),
      });

      if (!response.ok) {
        throw new Error(`Publishing failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const postUrl = result.url || result.permalink || `${website.url}/blog/${result.id || result.slug}`;
      
      setPublishedUrl(postUrl);
      
      toast({
        title: 'Blog Published Successfully!',
        description: `Your blog post has been published to ${website.name}`,
      });

    } catch (error) {
      console.error('Publishing failed:', error);
      toast({
        title: 'Publishing Failed',
        description: error instanceof Error ? error.message : 'Failed to publish blog post. Please check your website configuration.',
        variant: 'destructive',
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const addWebsite = () => {
    if (!newWebsite.name || !newWebsite.url || !newWebsite.apiEndpoint) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    const website: WebsiteConnection = {
      id: newWebsite.name.toLowerCase().replace(/\s+/g, '-'),
      name: newWebsite.name,
      url: newWebsite.url,
      type: newWebsite.type,
      apiEndpoint: newWebsite.apiEndpoint,
      credentials: {
        ...(newWebsite.apiKey && { apiKey: newWebsite.apiKey }),
        ...(newWebsite.username && { username: newWebsite.username }),
        ...(newWebsite.password && { password: newWebsite.password }),
      },
    };

    setWebsites(prev => [...prev, website]);
    setSelectedWebsite(website.id);
    setIsAddingWebsite(false);
    setNewWebsite({
      name: '',
      url: '',
      type: 'custom',
      apiEndpoint: '',
      apiKey: '',
      username: '',
      password: '',
    });

    toast({
      title: 'Website Added',
      description: `${website.name} has been added to your publishing destinations.`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Website Selection */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label htmlFor="website-select">Publish to Website</Label>
          <Select value={selectedWebsite} onValueChange={setSelectedWebsite}>
            <SelectTrigger>
              <SelectValue placeholder="Select a website" />
            </SelectTrigger>
            <SelectContent>
              {websites.map((website) => (
                <SelectItem key={website.id} value={website.id}>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {website.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={isAddingWebsite} onOpenChange={setIsAddingWebsite}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Website
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Publishing Destination</DialogTitle>
              <DialogDescription>
                Connect a new website or CMS to publish your blog posts.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="website-name">Website Name</Label>
                <Input
                  id="website-name"
                  value={newWebsite.name}
                  onChange={(e) => setNewWebsite(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Blog Website"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="website-url">Website URL</Label>
                <Input
                  id="website-url"
                  value={newWebsite.url}
                  onChange={(e) => setNewWebsite(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://myblog.com"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="website-type">Website Type</Label>
                <Select value={newWebsite.type} onValueChange={(value: 'custom' | 'wordpress' | 'headless') => setNewWebsite(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom API</SelectItem>
                    <SelectItem value="wordpress">WordPress</SelectItem>
                    <SelectItem value="headless">Headless CMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input
                  id="api-endpoint"
                  value={newWebsite.apiEndpoint}
                  onChange={(e) => setNewWebsite(prev => ({ ...prev, apiEndpoint: e.target.value }))}
                  placeholder="https://myblog.com/api/posts"
                />
              </div>
              
              {newWebsite.type === 'custom' && (
                <div className="grid gap-2">
                  <Label htmlFor="api-key">API Key (optional)</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={newWebsite.apiKey}
                    onChange={(e) => setNewWebsite(prev => ({ ...prev, apiKey: e.target.value }))}
                    placeholder="Your API key"
                  />
                </div>
              )}
              
              {newWebsite.type === 'wordpress' && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="wp-username">Username</Label>
                    <Input
                      id="wp-username"
                      value={newWebsite.username}
                      onChange={(e) => setNewWebsite(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="WordPress username"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="wp-password">App Password</Label>
                    <Input
                      id="wp-password"
                      type="password"
                      value={newWebsite.password}
                      onChange={(e) => setNewWebsite(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="WordPress app password"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingWebsite(false)}>
                Cancel
              </Button>
              <Button onClick={addWebsite}>
                Add Website
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Website Info */}
      {selectedWebsite && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <CardTitle className="text-sm">
                  {websites.find(w => w.id === selectedWebsite)?.name}
                </CardTitle>
              </div>
              <Badge variant="outline">
                {websites.find(w => w.id === selectedWebsite)?.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">
              {websites.find(w => w.id === selectedWebsite)?.url}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Publish Button */}
      <Button 
        onClick={publishBlog}
        disabled={!blogPost || isPublishing}
        className="w-full"
        size="lg"
      >
        {isPublishing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Globe className="h-4 w-4 mr-2" />
            Publish Blog Post
          </>
        )}
      </Button>

      {/* Success Message with Link */}
      {publishedUrl && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Blog Published Successfully!
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Your blog post is now live on your website.
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={publishedUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Post
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
