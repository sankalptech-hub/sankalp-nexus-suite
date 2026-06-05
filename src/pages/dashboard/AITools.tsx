import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Code, FileText, Mail, Image as ImageIcon, Sparkles, PenTool, HelpCircle, Search, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { aiClient, type AIMessage, generateImage } from '@/lib/ai/aiClient';
import { aiActions, executeAIAction } from '@/lib/ai/aiActions';

// Import existing modular components
import { AIToolbar } from '@/components/ai/AIToolbar';
import { AIChatHistory, type Message } from '@/components/ai/AIChatHistory';
import { AIInputBox } from '@/components/ai/AIInputBox';
import { AISettingsModal, type AISettings } from '@/components/ai/AISettingsModal';
import { ConversationHistory } from '@/components/ai/ConversationHistory';
import { BlogWriter } from '@/components/ai/BlogWriter';

// Import onboarding components
import { WelcomeModal } from '@/components/ai/WelcomeModal';
import { OnboardingTour } from '@/components/ai/OnboardingTour';
import { HelpCenter } from '@/components/ai/HelpCenter';

// Import new enhanced components
import { ToolDescriptions } from '@/components/ai/ToolDescriptions';
import { SearchableTools } from '@/components/ai/SearchableTools';
import { ToolNavigation } from '@/components/ai/ToolNavigation';

/**
 * AITools Page - Enhanced with better descriptions and search functionality
 */
const AITools = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI assistant from Sankalp Tech, powered by Groq for fast, efficient responses. I can help you with code, documentation, email writing, image generation, blog writing, and general tech questions. 

Available providers: ${aiClient.getAvailableProviders().join(', ') || 'None configured - please set your API keys'}

How can I assist you today?`,
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  const [currentView, setCurrentView] = useState<'overview' | 'search' | 'chat'>('overview');
  const [aiSettings, setAISettings] = useState<AISettings>({
    model: 'llama3-8b-8192',
    temperature: 0.7,
    provider: 'auto',
  });

  // Onboarding state
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const aiToolCategories = [
    {
      id: 'general',
      name: 'General Chat',
      icon: Bot,
      description: 'General AI assistance and conversation',
      detailedDescription: 'Get help with general questions, brainstorming, research, and everyday tasks. Perfect for quick questions and exploratory conversations.',
    },
    {
      id: 'code',
      name: 'Code Assistant',
      icon: Code,
      description: 'Help with coding, debugging, and development',
      detailedDescription: 'Expert assistance with programming languages, code review, debugging, architecture decisions, and development best practices.',
    },
    {
      id: 'documentation',
      name: 'Documentation',
      icon: FileText,
      description: 'Generate and review technical documentation',
      detailedDescription: 'Create comprehensive technical docs, API documentation, user guides, and project documentation with proper structure and clarity.',
    },
    {
      id: 'email',
      name: 'Email Writer',
      icon: Mail,
      description: 'Compose professional emails and communications',
      detailedDescription: 'Draft professional emails, business communications, proposals, and correspondence with appropriate tone and formatting.',
    },
    {
      id: 'blog',
      name: 'Blog Writer',
      icon: PenTool,
      description: 'Generate engaging blog posts and articles',
      detailedDescription: 'Create compelling blog content, articles, and marketing copy with SEO optimization and engaging storytelling.',
    },
    {
      id: 'image',
      name: 'Image Generation',
      icon: ImageIcon,
      description: 'Generate images using DALL-E',
      detailedDescription: 'Create custom images, illustrations, and visual content using AI. Perfect for marketing materials, presentations, and creative projects.',
    },
  ];

  // Check if user is new and show welcome modal
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('ai-tools-welcome-seen');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

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

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    localStorage.setItem('ai-tools-welcome-seen', 'true');
  };

  const handleStartTour = () => {
    setShowWelcome(false);
    setShowTour(true);
    localStorage.setItem('ai-tools-welcome-seen', 'true');
  };

  const handleTourComplete = () => {
    setShowTour(false);
    toast({
      title: 'Welcome!',
      description: 'You\'re all set to start using our AI tools. Happy creating!',
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
      const aiMessages: AIMessage[] = messages
        .filter(msg => !msg.isImage)
        .slice(-10)
        .map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        }));

      const systemPrompts = {
        general: 'You are a helpful AI assistant for Sankalp Tech, a technology company focused on web development, AI automation, CRM systems, and business automation.',
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
    setCurrentView('chat');
    toast({
      title: 'Conversation Loaded',
      description: 'Previous conversation restored',
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentView('chat');
  };

  // If the active category is 'blog', render the Blog Writer component
  if (activeCategory === 'blog' && currentView === 'chat') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentView('overview')}
            >
              <Info className="h-4 w-4 mr-2" />
              Overview
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowHelp(true)}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
          </div>
        </div>

        <BlogWriter aiSettings={aiSettings} />

        {/* Onboarding Modals */}
        <WelcomeModal
          isOpen={showWelcome}
          onClose={handleWelcomeClose}
          onStartTour={handleStartTour}
        />
        <OnboardingTour
          isOpen={showTour}
          onClose={() => setShowTour(false)}
          onComplete={handleTourComplete}
        />
        <HelpCenter
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
        <Button
          variant="outline"
          onClick={() => setShowHelp(true)}
          className="flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          Help
        </Button>
      </div>

      {/* Simplified Tool Navigation */}
      <ToolNavigation
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
        isLoading={isLoading}
      />

      {/* Enhanced Navigation Tabs */}
      <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Tool Overview
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Tools
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ToolDescriptions
            activeCategory={activeCategory}
            onCategorySelect={handleCategorySelect}
          />
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <SearchableTools
            activeCategory={activeCategory}
            onCategorySelect={handleCategorySelect}
          />
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
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
        </TabsContent>
      </Tabs>

      {/* Onboarding Modals */}
      <WelcomeModal
        isOpen={showWelcome}
        onClose={handleWelcomeClose}
        onStartTour={handleStartTour}
      />
      <OnboardingTour
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        onComplete={handleTourComplete}
      />
      <HelpCenter
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
};

export default AITools;
