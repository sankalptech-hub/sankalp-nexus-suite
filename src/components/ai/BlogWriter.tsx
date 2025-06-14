import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PenTool, Copy, Download, Send, Globe, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiClient, type AIMessage } from '@/lib/ai/aiClient';
import type { AISettings } from './AISettingsModal';
import { BlogPublisher } from './BlogPublisher';

interface BlogWriterProps {
  aiSettings: AISettings;
}

interface BlogPost {
  title: string;
  content: string;
  wordCount: number;
  generatedAt: Date;
}

export const BlogWriter = ({ aiSettings }: BlogWriterProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  
  // Form state
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('professional');
  const [wordCount, setWordCount] = useState('800');

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual & Friendly' },
    { value: 'technical', label: 'Technical' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'creative', label: 'Creative' },
  ];

  const wordCountOptions = [
    { value: '500', label: '500 words' },
    { value: '800', label: '800 words' },
    { value: '1200', label: '1200 words' },
    { value: '1500', label: '1500+ words' },
  ];

  const generateBlogPost = async () => {
    if (!topic.trim()) {
      toast({
        title: 'Topic Required',
        description: 'Please enter a blog topic to generate content.',
        variant: 'destructive',
      });
      return;
    }

    if (!aiClient.isAvailable()) {
      toast({
        title: 'AI Not Available',
        description: 'Please configure your AI API keys to use this feature.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Construct the prompt for blog generation
      const systemPrompt = `You are a professional blog writer and content creator. Write engaging, well-structured blog posts that are informative, readable, and optimized for web content. Always include:
1. A compelling title
2. An engaging introduction
3. Well-organized sections with subheadings
4. A strong conclusion
5. Natural keyword integration when provided

Format the response as a complete blog post with proper markdown formatting for headings, emphasis, and structure.`;

      const userPrompt = `Write a ${tone} blog post about "${topic}".

Requirements:
- Target word count: approximately ${wordCount} words
- Target audience: ${audience || 'general audience'}
${keywords ? `- Include these keywords naturally: ${keywords}` : ''}
- Use markdown formatting for headings and emphasis
- Include an engaging title, introduction, main sections, and conclusion
- Make it informative, engaging, and valuable to readers

Topic: ${topic}`;

      const messages: AIMessage[] = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ];

      const response = await aiClient.askAI(messages, {
        model: aiSettings.model,
        temperature: aiSettings.temperature,
        provider: aiSettings.provider,
      });

      // Extract title from the content (look for the first # heading)
      const content = response.content;
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : topic;

      // Count words (approximate)
      const words = content.split(/\s+/).length;

      const newBlogPost: BlogPost = {
        title,
        content,
        wordCount: words,
        generatedAt: new Date(),
      };

      setBlogPost(newBlogPost);

      toast({
        title: 'Blog Post Generated',
        description: `Generated ${words} words using ${response.provider} (${response.model})`,
      });

    } catch (error) {
      console.error('Blog generation failed:', error);
      toast({
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Failed to generate blog post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!blogPost) return;
    
    try {
      await navigator.clipboard.writeText(blogPost.content);
      toast({
        title: 'Copied to Clipboard',
        description: 'Blog post content has been copied to your clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Copy Failed',
        description: 'Failed to copy content to clipboard.',
        variant: 'destructive',
      });
    }
  };

  const downloadAsMarkdown = () => {
    if (!blogPost) return;

    const blob = new Blob([blogPost.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${blogPost.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'Download Started',
      description: 'Your blog post is being downloaded as a Markdown file.',
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Blog Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            Blog Writer
          </CardTitle>
          <CardDescription>
            Generate engaging blog posts with AI assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Blog Topic *</Label>
            <Input
              id="topic"
              placeholder="e.g., Benefits of AI in Modern Web Development"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords (optional)</Label>
            <Input
              id="keywords"
              placeholder="e.g., AI, web development, automation"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated keywords to include naturally in the content
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience (optional)</Label>
            <Input
              id="audience"
              placeholder="e.g., software developers, business owners, beginners"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Length</Label>
              <Select value={wordCount} onValueChange={setWordCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {wordCountOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateBlogPost}
            disabled={isLoading || !topic.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Blog Post...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Generate Blog Post
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Blog Post Display */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generated Blog Post</CardTitle>
              {blogPost && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">
                    {blogPost.wordCount} words
                  </Badge>
                  <Badge variant="outline">
                    {blogPost.generatedAt.toLocaleTimeString()}
                  </Badge>
                </div>
              )}
            </div>
            
            {blogPost && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={downloadAsMarkdown}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {blogPost ? (
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="publish">Publish</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="mt-4">
                <ScrollArea className="h-[500px] w-full rounded border p-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {blogPost.content}
                    </pre>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="publish" className="mt-4">
                <ScrollArea className="h-[500px] w-full">
                  <BlogPublisher blogPost={blogPost} />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="h-[500px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <PenTool className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your generated blog post will appear here</p>
                <p className="text-sm">Fill out the form and click "Generate Blog Post" to start</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
