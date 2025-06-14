
import { useState, useRef, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Bot, Send, User as UserIcon, Sparkles, Code, FileText, Mail, Image as ImageIcon, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiClient, type AIMessage, generateImage } from '@/lib/ai/aiClient';
import { aiActions, executeAIAction, getActionsByCategory } from '@/lib/ai/aiActions';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isImage?: boolean;
  imageUrl?: string;
}

const AITools = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI assistant from Sankalp Tech. I can help you with code, documentation, email writing, image generation, and general tech questions. 

Available providers: ${aiClient.getAvailableProviders().join(', ') || 'None configured - please set your API keys'}

How can I assist you today?`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');

  const aiToolCategories = [
    {
      id: 'general',
      name: 'General Chat',
      icon: Bot,
      description: 'General AI assistance and conversation',
    },
    {
      id: 'code',
      name: 'Code Assistant',
      icon: Code,
      description: 'Help with coding, debugging, and development',
    },
    {
      id: 'documentation',
      name: 'Documentation',
      icon: FileText,
      description: 'Generate and review technical documentation',
    },
    {
      id: 'email',
      name: 'Email Writer',
      icon: Mail,
      description: 'Compose professional emails and communications',
    },
    {
      id: 'image',
      name: 'Image Generation',
      icon: ImageIcon,
      description: 'Generate images using DALL-E',
    },
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!aiClient.isAvailable()) {
      toast({
        title: 'AI Not Available',
        description: 'Please configure your AI API keys (VITE_OPENAI_API_KEY or VITE_GROQ_API_KEY) to use this feature.',
        variant: 'destructive',
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert messages to AI format
      const aiMessages: AIMessage[] = messages
        .filter(msg => !msg.isImage) // Exclude image messages for now
        .slice(-10) // Keep last 10 messages for context
        .map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        }));

      // Add system prompt based on category
      const systemPrompts = {
        general: 'You are a helpful AI assistant for Sankalp Tech & Solution Inc., a technology company focused on web development, AI automation, CRM systems, and business automation.',
        code: 'You are a senior software developer expert in React, Next.js, TypeScript, Tailwind CSS, and modern web development. Provide clear, practical coding solutions.',
        documentation: 'You are a technical writer. Create clear, comprehensive documentation with examples and best practices.',
        email: 'You are a professional communication assistant. Write clear, polite, and effective business emails.',
        image: 'You are helping with image generation requests.',
      };

      if (systemPrompts[activeCategory as keyof typeof systemPrompts]) {
        aiMessages.unshift({
          role: 'system',
          content: systemPrompts[activeCategory as keyof typeof systemPrompts],
        });
      }

      // Add the new user message
      aiMessages.push({
        role: 'user',
        content: input,
      });

      const response = await aiClient.askAI(aiMessages);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);

      toast({
        title: 'AI Response',
        description: `Response from ${response.provider} (${response.model})`,
      });

    } catch (error) {
      console.error('AI request failed:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to get AI response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageGeneration = async () => {
    if (!imagePrompt.trim()) return;

    setIsLoading(true);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `Generate image: ${imagePrompt}`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setImagePrompt('');

    try {
      const result = await generateImage(imagePrompt);
      
      const imageMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.revisedPrompt || imagePrompt,
        timestamp: new Date(),
        isImage: true,
        imageUrl: result.imageUrl,
      };

      setMessages(prev => [...prev, imageMessage]);

      toast({
        title: 'Image Generated',
        description: 'Your image has been created successfully!',
      });

    } catch (error) {
      console.error('Image generation failed:', error);
      toast({
        title: 'Image Generation Failed',
        description: error instanceof Error ? error.message : 'Failed to generate image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (actionId: string) => {
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
      const action = aiActions.find(a => a.id === actionId);
      if (!action) return;

      // Add user message showing the action
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: `Quick Action: ${action.name}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);

      const response = await executeAIAction(actionId);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);

      toast({
        title: 'Quick Action Completed',
        description: action.name,
      });

    } catch (error) {
      console.error('Quick action failed:', error);
      toast({
        title: 'Action Failed',
        description: error instanceof Error ? error.message : 'Failed to execute action.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (activeCategory === 'image') {
        handleImageGeneration();
      } else {
        handleSend();
      }
    }
  };

  const categoryActions = getActionsByCategory(activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Tools</h1>
        <p className="text-muted-foreground mt-2">
          Access powerful AI assistants powered by OpenAI and Groq
        </p>
        {!aiClient.isAvailable() && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">
              ⚠️ AI services not configured. Please set your API keys in environment variables.
            </p>
          </div>
        )}
      </div>

      {/* AI Tool Categories */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {aiToolCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                activeCategory === category.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm">{category.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">
                  {category.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      {categoryActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              One-click AI actions for common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {categoryActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  className="justify-start h-auto p-3"
                  onClick={() => handleQuickAction(action.id)}
                  disabled={isLoading}
                >
                  <div className="text-left">
                    <div className="flex items-center gap-2 font-medium">
                      <span>{action.icon}</span>
                      {action.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI Chat Assistant</CardTitle>
            </div>
            <Badge variant="outline">
              {aiToolCategories.find(c => c.id === activeCategory)?.name}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground ml-2' 
                          : 'bg-muted mr-2'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <UserIcon className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.isImage && message.imageUrl ? (
                        <div className="space-y-2">
                          <img 
                            src={message.imageUrl} 
                            alt="Generated image" 
                            className="max-w-full h-auto rounded-lg"
                          />
                          <div className="text-sm">
                            Generated image: {message.content}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      )}
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted mr-2 flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <Skeleton className="h-2 w-2 rounded-full animate-pulse" />
                        <Skeleton className="h-2 w-2 rounded-full animate-pulse delay-100" />
                        <Skeleton className="h-2 w-2 rounded-full animate-pulse delay-200" />
                      </div>
                      <div className="text-xs mt-2 text-muted-foreground">
                        AI is thinking...
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="border-t p-4">
            {activeCategory === 'image' ? (
              <div className="flex space-x-2">
                <Input
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe the image you want to generate..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleImageGeneration}
                  disabled={!imagePrompt.trim() || isLoading}
                  size="icon"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Ask your AI assistant about ${activeCategory === 'general' ? 'anything' : activeCategory}...`}
                  className="flex-1 min-h-[60px] max-h-[120px]"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="h-[60px] w-[60px]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITools;
