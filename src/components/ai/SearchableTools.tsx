
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { 
  Bot, 
  Code, 
  FileText, 
  Mail, 
  Image as ImageIcon, 
  PenTool
} from 'lucide-react';

interface SearchableToolsProps {
  activeCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export const SearchableTools: React.FC<SearchableToolsProps> = ({
  activeCategory,
  onCategorySelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');

  const toolCategories = [
    {
      id: 'general',
      name: 'General Chat',
      icon: Bot,
      description: 'General AI assistance and conversation',
      keywords: ['chat', 'conversation', 'questions', 'help', 'general', 'brainstorm'],
      difficulty: 'Beginner',
      category: 'Communication',
    },
    {
      id: 'code',
      name: 'Code Assistant',
      icon: Code,
      description: 'Help with coding, debugging, and development',
      keywords: ['programming', 'code', 'debug', 'development', 'javascript', 'react', 'api'],
      difficulty: 'Intermediate',
      category: 'Development',
    },
    {
      id: 'documentation',
      name: 'Documentation',
      icon: FileText,
      description: 'Generate and review technical documentation',
      keywords: ['docs', 'documentation', 'manual', 'guide', 'api', 'technical', 'readme'],
      difficulty: 'Intermediate',
      category: 'Content',
    },
    {
      id: 'email',
      name: 'Email Writer',
      icon: Mail,
      description: 'Compose professional emails and communications',
      keywords: ['email', 'communication', 'business', 'professional', 'letter', 'message'],
      difficulty: 'Beginner',
      category: 'Communication',
    },
    {
      id: 'blog',
      name: 'Blog Writer',
      icon: PenTool,
      description: 'Generate engaging blog posts and articles',
      keywords: ['blog', 'article', 'content', 'writing', 'seo', 'marketing', 'post'],
      difficulty: 'Intermediate',
      category: 'Content',
    },
    {
      id: 'image',
      name: 'Image Generation',
      icon: ImageIcon,
      description: 'Generate images using DALL-E',
      keywords: ['image', 'picture', 'visual', 'design', 'art', 'graphic', 'illustration'],
      difficulty: 'Beginner',
      category: 'Creative',
    },
  ];

  const filteredTools = useMemo(() => {
    return toolCategories.filter(tool => {
      const matchesSearch = searchQuery === '' || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDifficulty = difficultyFilter === '' || tool.difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, difficultyFilter]);

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const categories = [...new Set(toolCategories.map(tool => tool.category))];

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Your AI Tool
          </CardTitle>
          <CardDescription>
            Search and filter tools to find the perfect AI assistant for your task
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools, keywords, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="">All Difficulties</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
              {(searchQuery || difficultyFilter) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setDifficultyFilter('');
                  }}
                >
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>
          
          {/* Quick Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Quick filters:</span>
            {categories.map(category => (
              <Badge
                key={category}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSearchQuery(category.toLowerCase())}
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTools.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No tools found matching your search criteria.</p>
            <p className="text-sm mt-2">Try adjusting your search terms or filters.</p>
          </div>
        ) : (
          filteredTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeCategory === tool.id;
            
            return (
              <Card 
                key={tool.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isActive ? 'ring-2 ring-primary shadow-md' : ''
                }`}
                onClick={() => onCategorySelect(tool.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{tool.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {tool.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-3">
                    {tool.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {tool.category}
                    </Badge>
                    {isActive && (
                      <Badge className="text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
