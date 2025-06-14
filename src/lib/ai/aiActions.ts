
import { askAI } from './aiClient';

export interface AIAction {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  systemPrompt: string;
  userPrompt: (context?: any) => string;
}

export const aiActions: AIAction[] = [
  {
    id: 'summarize-projects',
    name: 'Summarize Projects',
    description: 'Get an overview of all your current projects',
    icon: '📊',
    category: 'general',
    systemPrompt: 'You are a project management assistant. Provide clear, concise summaries of project data.',
    userPrompt: (projects) => `Please provide a brief summary of these projects, including their status and key insights:\n\n${JSON.stringify(projects, null, 2)}`,
  },
  {
    id: 'draft-email',
    name: 'Draft Professional Email',
    description: 'Create a professional email template',
    icon: '✉️',
    category: 'email',
    systemPrompt: 'You are a professional communication assistant. Write clear, polite, and effective business emails.',
    userPrompt: () => 'Help me draft a professional email. What is the purpose of your email?',
  },
  {
    id: 'write-listing',
    name: 'Write Service Listing',
    description: 'Create compelling service descriptions',
    icon: '📝',
    category: 'documentation',
    systemPrompt: 'You are a marketing copywriter specializing in technology services. Write compelling, clear, and professional service descriptions.',
    userPrompt: () => 'Help me write a service listing description. What service would you like to describe?',
  },
  {
    id: 'debug-code',
    name: 'Debug Code Issue',
    description: 'Get help debugging code problems',
    icon: '🐛',
    category: 'code',
    systemPrompt: 'You are a senior software developer expert in React, TypeScript, and modern web development. Help debug issues and provide clear solutions.',
    userPrompt: () => 'I need help debugging a code issue. Please describe the problem you\'re experiencing.',
  },
  {
    id: 'explain-concept',
    name: 'Explain Tech Concept',
    description: 'Get clear explanations of technical concepts',
    icon: '💡',
    category: 'general',
    systemPrompt: 'You are a technical educator. Explain complex technical concepts in simple, understandable terms with practical examples.',
    userPrompt: () => 'What technical concept would you like me to explain?',
  },
  {
    id: 'review-code',
    name: 'Code Review',
    description: 'Get feedback on your code quality',
    icon: '🔍',
    category: 'code',
    systemPrompt: 'You are a senior code reviewer. Provide constructive feedback on code quality, best practices, security, and performance.',
    userPrompt: () => 'Please review my code. Share the code you\'d like me to review.',
  },
  {
    id: 'write-docs',
    name: 'Generate Documentation',
    description: 'Create technical documentation',
    icon: '📚',
    category: 'documentation',
    systemPrompt: 'You are a technical writer. Create clear, comprehensive documentation with examples and best practices.',
    userPrompt: () => 'What would you like me to document? Please describe the feature, API, or process.',
  },
  {
    id: 'blog-outline',
    name: 'Create Blog Outline',
    description: 'Generate a structured blog post outline',
    icon: '📋',
    category: 'blog',
    systemPrompt: 'You are a content strategist and blog writer. Create detailed, engaging blog post outlines with clear structure and flow.',
    userPrompt: () => 'What blog topic would you like me to create an outline for?',
  },
  {
    id: 'blog-title',
    name: 'Generate Blog Titles',
    description: 'Create catchy, SEO-friendly blog titles',
    icon: '🎯',
    category: 'blog',
    systemPrompt: 'You are a content marketing expert. Generate compelling, clickable, and SEO-friendly blog titles that drive engagement.',
    userPrompt: () => 'What is your blog topic? I\'ll generate several engaging title options for you.',
  },
  {
    id: 'blog-intro',
    name: 'Write Blog Introduction',
    description: 'Create engaging blog post introductions',
    icon: '🚀',
    category: 'blog',
    systemPrompt: 'You are a skilled blog writer. Write engaging, hook-filled introductions that draw readers in and set up the rest of the blog post.',
    userPrompt: () => 'What is your blog topic and main points? I\'ll write a compelling introduction.',
  },
  {
    id: 'blog-seo',
    name: 'SEO Optimization',
    description: 'Optimize blog content for search engines',
    icon: '🔍',
    category: 'blog',
    systemPrompt: 'You are an SEO content specialist. Provide actionable advice for optimizing blog content for search engines while maintaining readability.',
    userPrompt: () => 'Share your blog content or topic, and I\'ll provide SEO optimization suggestions.',
  },
];

export const executeAIAction = async (actionId: string, context?: any): Promise<string> => {
  const action = aiActions.find(a => a.id === actionId);
  if (!action) {
    throw new Error(`AI action ${actionId} not found`);
  }

  const response = await askAI(action.userPrompt(context), action.systemPrompt);
  return response.content;
};

export const getActionsByCategory = (category: string): AIAction[] => {
  return aiActions.filter(action => action.category === category);
};
