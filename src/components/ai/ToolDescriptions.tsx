
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  Code, 
  FileText, 
  Mail, 
  Image as ImageIcon, 
  PenTool,
  Clock,
  Star,
  Users,
  Zap
} from 'lucide-react';

interface ToolFeature {
  name: string;
  description: string;
}

interface ToolCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  detailedDescription: string;
  features: ToolFeature[];
  useCases: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  popularity: number;
}

interface ToolDescriptionsProps {
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export const ToolDescriptions: React.FC<ToolDescriptionsProps> = ({
  activeCategory,
  onCategorySelect,
}) => {
  const toolCategories: ToolCategory[] = [
    {
      id: 'general',
      name: 'General Chat',
      icon: Bot,
      description: 'General AI assistance and conversation',
      detailedDescription: 'Your versatile AI companion for everyday questions, brainstorming sessions, research assistance, and general problem-solving. Perfect for exploring ideas, getting quick answers, and having productive conversations.',
      features: [
        { name: 'Natural Conversation', description: 'Engage in human-like dialogue' },
        { name: 'Multi-topic Support', description: 'Ask about anything from science to philosophy' },
        { name: 'Context Awareness', description: 'Maintains conversation context' },
        { name: 'Research Assistant', description: 'Help with fact-finding and analysis' },
      ],
      useCases: [
        'Brainstorming new ideas',
        'Getting explanations for complex topics',
        'Research and fact-checking',
        'Creative problem solving',
        'Learning new concepts'
      ],
      difficulty: 'Beginner',
      estimatedTime: '1-5 minutes',
      popularity: 95,
    },
    {
      id: 'code',
      name: 'Code Assistant',
      icon: Code,
      description: 'Expert programming help and development support',
      detailedDescription: 'Your dedicated coding companion with expertise in multiple programming languages, frameworks, and development practices. Get help with debugging, code reviews, architecture decisions, and learning new technologies.',
      features: [
        { name: 'Multi-language Support', description: 'JavaScript, Python, React, Node.js, and more' },
        { name: 'Code Review', description: 'Professional code analysis and suggestions' },
        { name: 'Debugging Help', description: 'Identify and fix errors quickly' },
        { name: 'Best Practices', description: 'Learn industry standards and patterns' },
        { name: 'Architecture Guidance', description: 'System design and structure advice' },
      ],
      useCases: [
        'Debugging complex errors',
        'Code optimization and refactoring',
        'Learning new programming languages',
        'Architecture and design patterns',
        'API integration guidance'
      ],
      difficulty: 'Intermediate',
      estimatedTime: '5-15 minutes',
      popularity: 88,
    },
    {
      id: 'documentation',
      name: 'Documentation',
      icon: FileText,
      description: 'Create comprehensive technical documentation',
      detailedDescription: 'Transform your code, APIs, and systems into clear, professional documentation. Generate user guides, technical specifications, API docs, and project documentation with proper structure and formatting.',
      features: [
        { name: 'API Documentation', description: 'Generate comprehensive API references' },
        { name: 'User Guides', description: 'Create step-by-step user manuals' },
        { name: 'Technical Specs', description: 'Detailed system specifications' },
        { name: 'Code Comments', description: 'Intelligent inline documentation' },
        { name: 'README Generation', description: 'Professional project descriptions' },
      ],
      useCases: [
        'API reference documentation',
        'User manual creation',
        'Project README files',
        'Technical specifications',
        'Code commenting and annotations'
      ],
      difficulty: 'Intermediate',
      estimatedTime: '10-30 minutes',
      popularity: 72,
    },
    {
      id: 'email',
      name: 'Email Writer',
      icon: Mail,
      description: 'Professional email and communication drafting',
      detailedDescription: 'Craft compelling, professional emails for any situation. From business proposals and client communications to follow-ups and newsletters, ensure your message is clear, persuasive, and appropriately toned.',
      features: [
        { name: 'Tone Adjustment', description: 'Formal, casual, urgent, or friendly tones' },
        { name: 'Template Library', description: 'Pre-built email templates' },
        { name: 'Subject Line Optimization', description: 'Compelling and clear subject lines' },
        { name: 'Call-to-Action', description: 'Effective CTAs that drive results' },
        { name: 'Multi-language Support', description: 'Professional emails in various languages' },
      ],
      useCases: [
        'Business proposals and pitches',
        'Client communication and follow-ups',
        'Marketing and newsletter content',
        'Internal team communications',
        'Customer service responses'
      ],
      difficulty: 'Beginner',
      estimatedTime: '3-10 minutes',
      popularity: 81,
    },
    {
      id: 'blog',
      name: 'Blog Writer',
      icon: PenTool,
      description: 'Create engaging blog posts and articles',
      detailedDescription: 'Generate compelling blog content that engages readers and drives traffic. From SEO-optimized articles to thought leadership pieces, create content that resonates with your audience and achieves your goals.',
      features: [
        { name: 'SEO Optimization', description: 'Keyword-rich, search-friendly content' },
        { name: 'Multiple Formats', description: 'How-to guides, listicles, opinion pieces' },
        { name: 'Audience Targeting', description: 'Content tailored to specific demographics' },
        { name: 'Content Planning', description: 'Editorial calendar and content strategy' },
        { name: 'Social Media Integration', description: 'Shareable content snippets' },
      ],
      useCases: [
        'Company blog posts',
        'Thought leadership articles',
        'Tutorial and how-to guides',
        'Industry news and analysis',
        'Product announcements'
      ],
      difficulty: 'Intermediate',
      estimatedTime: '15-45 minutes',
      popularity: 76,
    },
    {
      id: 'image',
      name: 'Image Generation',
      icon: ImageIcon,
      description: 'AI-powered image creation and design',
      detailedDescription: 'Create stunning, custom images using advanced AI models. Generate illustrations, marketing visuals, product mockups, and creative artwork tailored to your specific needs and brand requirements.',
      features: [
        { name: 'Multiple Styles', description: 'Photorealistic, artistic, cartoon, and more' },
        { name: 'Custom Dimensions', description: 'Various sizes for different use cases' },
        { name: 'Brand Consistency', description: 'Maintain visual brand identity' },
        { name: 'High Resolution', description: 'Professional-quality output' },
        { name: 'Iterative Refinement', description: 'Refine prompts for better results' },
      ],
      useCases: [
        'Marketing and advertising visuals',
        'Social media graphics',
        'Website illustrations',
        'Product mockups and concepts',
        'Creative artwork and designs'
      ],
      difficulty: 'Beginner',
      estimatedTime: '2-8 minutes',
      popularity: 92,
    },
  ];

  const selectedTool = toolCategories.find(tool => tool.id === activeCategory);

  if (!selectedTool) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Tool Categories Overview */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Tools</CardTitle>
            <CardDescription>
              Choose the right AI tool for your task
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {toolCategories.map((tool) => {
              const Icon = tool.icon;
              return (
                <Button
                  key={tool.id}
                  variant={activeCategory === tool.id ? 'default' : 'ghost'}
                  className="w-full justify-start h-auto p-3"
                  onClick={() => onCategorySelect(tool.id)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="text-left flex-1">
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <Star className="h-3 w-3" />
                        {tool.popularity}%
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Selected Tool Details */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <selectedTool.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-xl">{selectedTool.name}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {selectedTool.detailedDescription}
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2">
                <Badge className={getDifficultyColor(selectedTool.difficulty)}>
                  {selectedTool.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {selectedTool.estimatedTime}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Key Features */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Key Features
              </h4>
              <div className="grid gap-3 md:grid-cols-2">
                {selectedTool.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 rounded-lg border bg-muted/20">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-medium text-sm">{feature.name}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Use Cases */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Common Use Cases
              </h4>
              <div className="space-y-2">
                {selectedTool.useCases.map((useCase, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {useCase}
                  </div>
                ))}
              </div>
            </div>

            {/* Getting Started */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 Quick Start Tips
              </h4>
              <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <p>• Be specific and detailed in your requests</p>
                <p>• Use the quick actions for common tasks</p>
                <p>• Adjust AI settings based on your needs</p>
                <p>• Save important conversations for later reference</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
