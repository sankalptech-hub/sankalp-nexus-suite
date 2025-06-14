import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Code, FileText, Mail, Image as ImageIcon, Sparkles, PenTool } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiClient, type AIMessage, generateImage } from '@/lib/ai/aiClient';
import { aiActions, executeAIAction } from '@/lib/ai/aiActions';

// Import our modular components
import { AIToolbar } from '@/components/ai/AIToolbar';
import { AIChatHistory, type Message } from '@/components/ai/AIChatHistory';
import { AIInputBox } from '@/components/ai/AIInputBox';
import { AISettingsModal, type AISettings } from '@/components/ai/AISettingsModal';
import { ConversationHistory } from '@/components/ai/ConversationHistory';
import { BlogWriter } from '@/components/ai/BlogWriter';

/**
 * AITools Page
 * Main container for the AI assistant interface
 * Integrates all AI components and manages state
 */
const AITools = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI assistant from Sankalp Tech. I can help you with code, documentation, email writing, image generation, blog writing, and general tech questions. 

Available providers: ${aiClient.getAvailableProviders().join(', ') || 'None configured - please set your API keys'}

How can I assist you today?`,
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  const [aiSettings, setAISettings] = useState<AISettings>({
    model: 'gpt-4o-mini',
    temperature: 0.7,
    provider: 'auto',
  });

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
      id: 'blog',
      name: 'Blog Writer',
      icon: PenTool,
      description: 'Generate engaging blog posts and articles',
    },
    {
      id: 'image',
      name: 'Image Generation',
      icon: ImageIcon,
      description: 'Generate images using DALL-E',
    },
  ];

  // Load AI settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('ai-settings');
    if (savedSettings) {
      try {
        setAISettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to load AI settings:', error);
      }
    }
  }, []);

  // Save AI settings to localStorage
  const handleSettingsChange = (settings: AISettings) => {
    setAISettings(settings);
    localStorage.setItem('ai-settings', JSON.stringify(settings));
    toast({
      title: 'Settings Updated',
      description: 'AI preferences saved successfully',
    });
  };

  const handleSendMessage = async (input: string) => {
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
        blog: 'You are a content writer. Create engaging blog posts and articles.',
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

      const response = await aiClient.askAI(aiMessages, {
        model: aiSettings.model,
        temperature: aiSettings.temperature,
        provider: aiSettings.provider,
      });
      
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

  const handleImageGeneration = async (imagePrompt: string) => {
    setIsLoading(true);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `Generate image: ${imagePrompt}`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

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

  const handleLoadConversation = (loadedMessages: Message[]) => {
    setMessages(loadedMessages);
    toast({
      title: 'Conversation Loaded',
      description: 'Previous conversation restored',
    });
  };

  // If the active category is 'blog', render the Blog Writer component
  if (activeCategory === 'blog') {
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
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

        {/* Blog Writer Component */}
        <BlogWriter aiSettings={aiSettings} />
      </div>
    );
  }

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
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

      {/* Quick Actions Toolbar */}
      <AIToolbar 
        activeCategory={activeCategory}
        onQuickAction={handleQuickAction}
        isLoading={isLoading}
      />

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI Chat Assistant</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {aiToolCategories.find(c => c.id === activeCategory)?.name}
              </Badge>
              <ConversationHistory
                currentMessages={messages}
                currentCategory={activeCategory}
                onLoadConversation={handleLoadConversation}
              />
              <AISettingsModal
                settings={aiSettings}
                onSettingsChange={handleSettingsChange}
                availableProviders={aiClient.getAvailableProviders()}
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <AIChatHistory 
            messages={messages}
            isLoading={isLoading}
          />
          
          <AIInputBox
            activeCategory={activeCategory}
            onSendMessage={handleSendMessage}
            onGenerateImage={handleImageGeneration}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AITools;
