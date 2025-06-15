
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  HelpCircle, 
  Book, 
  Video, 
  MessageSquare, 
  Settings,
  Code,
  Mail,
  FileText,
  Image as ImageIcon,
  Bot
} from 'lucide-react';

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tutorials = [
    {
      id: 'getting-started',
      title: 'Getting Started with AI Tools',
      description: 'Learn the basics of using our AI assistant',
      category: 'Basics',
      icon: Bot,
      content: [
        'Choose an AI tool category that matches your task',
        'Configure your AI settings for optimal results',
        'Start with simple questions to get familiar',
        'Use quick actions for common workflows',
        'Save important conversations for later'
      ]
    },
    {
      id: 'code-assistant',
      title: 'Using the Code Assistant',
      description: 'Get help with programming and debugging',
      category: 'Development',
      icon: Code,
      content: [
        'Select "Code Assistant" from the categories',
        'Paste your code for review and suggestions',
        'Ask specific questions about errors or bugs',
        'Request explanations for complex code',
        'Get help with best practices and optimization'
      ]
    },
    {
      id: 'email-writer',
      title: 'Professional Email Writing',
      description: 'Compose effective business communications',
      category: 'Communication',
      icon: Mail,
      content: [
        'Switch to "Email Writer" category',
        'Provide context about your email purpose',
        'Specify the tone (formal, casual, urgent)',
        'Include key points you want to cover',
        'Review and customize the generated email'
      ]
    },
    {
      id: 'documentation',
      title: 'Creating Documentation',
      description: 'Generate clear technical documentation',
      category: 'Documentation',
      icon: FileText,
      content: [
        'Select "Documentation" category',
        'Provide your code or system overview',
        'Specify the type of documentation needed',
        'Include target audience information',
        'Request specific sections or formats'
      ]
    },
    {
      id: 'image-generation',
      title: 'AI Image Generation',
      description: 'Create images using DALL-E',
      category: 'Creative',
      icon: ImageIcon,
      content: [
        'Switch to "Image Generation" category',
        'Write detailed, descriptive prompts',
        'Include style, mood, and composition details',
        'Specify dimensions and quality preferences',
        'Iterate on prompts for better results'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How do I configure my API keys?',
      answer: 'API keys are configured via environment variables. Set VITE_OPENAI_API_KEY for OpenAI access and VITE_GROQ_API_KEY for Groq access.',
      category: 'Setup'
    },
    {
      question: 'Which AI model should I choose?',
      answer: 'For speed, use Groq models. For advanced reasoning, use OpenAI GPT-4. For general tasks, GPT-3.5 offers a good balance.',
      category: 'Models'
    },
    {
      question: 'How does conversation history work?',
      answer: 'Conversations are automatically saved locally and organized by category. You can load previous conversations anytime.',
      category: 'Features'
    },
    {
      question: 'What is temperature in AI settings?',
      answer: 'Temperature controls randomness. Lower values (0.1-0.3) for consistent outputs, higher values (0.7-1.0) for creative responses.',
      category: 'Settings'
    },
    {
      question: 'Can I export my conversations?',
      answer: 'Yes, you can save conversations through the conversation history feature and export them for documentation or sharing.',
      category: 'Features'
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Help Center
          </DialogTitle>
          <DialogDescription>
            Find tutorials, guides, and answers to common questions
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Tabs defaultValue="tutorials" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tutorials" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Tutorials
              </TabsTrigger>
              <TabsTrigger value="faqs" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="tips" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Tips & Tricks
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tutorials" className="mt-4 max-h-[400px] overflow-y-auto">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredTutorials.map((tutorial) => {
                  const Icon = tutorial.icon;
                  return (
                    <div key={tutorial.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{tutorial.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {tutorial.description}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {tutorial.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {tutorial.content.map((step, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-muted-foreground mt-1">
                              {index + 1}.
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="faqs" className="mt-4 max-h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{faq.question}</h3>
                      <Badge variant="outline" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tips" className="mt-4 max-h-[400px] overflow-y-auto">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold">💡 Pro Tips for Better Results</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Be specific in your prompts for more accurate responses</li>
                    <li>• Use the appropriate category for your task type</li>
                    <li>• Adjust temperature based on your needs (creative vs. precise)</li>
                    <li>• Save important conversations for future reference</li>
                    <li>• Try different models if you're not satisfied with results</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold">🔧 Troubleshooting</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Check API key configuration if AI is unavailable</li>
                    <li>• Try refreshing if responses seem slow</li>
                    <li>• Clear conversation history if context gets confused</li>
                    <li>• Use simpler language if getting unexpected results</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold">⚡ Quick Shortcuts</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Use quick actions for common tasks</li>
                    <li>• Switch categories without losing your chat</li>
                    <li>• Copy responses for use in other applications</li>
                    <li>• Export conversations as documentation</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
