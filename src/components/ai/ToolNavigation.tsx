
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TooltipHelp } from '@/components/ui/tooltip-help';
import { 
  Bot, 
  Code, 
  FileText, 
  Mail, 
  Image as ImageIcon, 
  PenTool,
  Sparkles,
  Zap
} from 'lucide-react';

interface ToolNavigationProps {
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
  isLoading?: boolean;
}

export const ToolNavigation: React.FC<ToolNavigationProps> = ({
  activeCategory,
  onCategorySelect,
  isLoading = false,
}) => {
  const quickTools = [
    {
      id: 'general',
      name: 'Chat',
      icon: Bot,
      description: 'General AI assistance',
      tooltip: 'Get help with questions, brainstorming, and general tasks',
      color: 'bg-blue-500',
    },
    {
      id: 'code',
      name: 'Code',
      icon: Code,
      description: 'Programming help',
      tooltip: 'Debug code, get architecture advice, and learn best practices',
      color: 'bg-green-500',
    },
    {
      id: 'documentation',
      name: 'Docs',
      icon: FileText,
      description: 'Technical documentation',
      tooltip: 'Generate API docs, user guides, and technical specifications',
      color: 'bg-purple-500',
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      description: 'Professional emails',
      tooltip: 'Compose business emails, proposals, and communications',
      color: 'bg-orange-500',
    },
    {
      id: 'blog',
      name: 'Blog',
      icon: PenTool,
      description: 'Content writing',
      tooltip: 'Create engaging blog posts, articles, and marketing content',
      color: 'bg-pink-500',
    },
    {
      id: 'image',
      name: 'Images',
      icon: ImageIcon,
      description: 'AI image generation',
      tooltip: 'Generate custom images, illustrations, and visual content',
      color: 'bg-cyan-500',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Tools
          </CardTitle>
          <TooltipHelp content="Select an AI tool to start working. Each tool is specialized for different tasks." />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeCategory === tool.id;
            
            return (
              <TooltipHelp
                key={tool.id}
                content={tool.tooltip}
                side="bottom"
              >
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  className={`h-auto p-3 flex flex-col items-center gap-2 transition-all ${
                    isActive ? 'ring-2 ring-primary/20' : 'hover:bg-muted'
                  }`}
                  onClick={() => onCategorySelect(tool.id)}
                  disabled={isLoading}
                >
                  <div className={`w-8 h-8 rounded-lg ${tool.color} flex items-center justify-center`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-medium">{tool.name}</div>
                  </div>
                  {isActive && (
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      Active
                    </Badge>
                  )}
                </Button>
              </TooltipHelp>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
