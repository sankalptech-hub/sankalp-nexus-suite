
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TooltipHelp } from '@/components/ui/tooltip-help';
import { 
  Bot, 
  MessageSquare, 
  Clock, 
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Activity
} from 'lucide-react';

interface DashboardStatsProps {
  user?: any;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ user }) => {
  const stats = [
    {
      title: 'AI Conversations',
      value: '127',
      change: '+12%',
      trend: 'up',
      icon: MessageSquare,
      description: 'Total conversations this month',
      tooltip: 'Number of AI chat sessions completed this month'
    },
    {
      title: 'Active Projects',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: CheckCircle,
      description: 'Currently in progress',
      tooltip: 'Projects that are actively being worked on'
    },
    {
      title: 'AI Tools Used',
      value: '15',
      change: '+5',
      trend: 'up',
      icon: Zap,
      description: 'Different tools accessed',
      tooltip: 'Unique AI tools you\'ve used this month'
    },
    {
      title: 'Time Saved',
      value: '24h',
      change: '+6h',
      trend: 'up',
      icon: Clock,
      description: 'Estimated time saved this month',
      tooltip: 'Time saved through AI automation and assistance'
    },
  ];

  const quickActions = [
    {
      title: 'Start AI Chat',
      description: 'Begin a new conversation',
      icon: Bot,
      action: 'ai-tools',
      tooltip: 'Launch the AI chat interface for instant help'
    },
    {
      title: 'Create Project',
      description: 'Start a new project',
      icon: CheckCircle,
      action: 'projects',
      tooltip: 'Set up a new project in your workspace'
    },
    {
      title: 'View Analytics',
      description: 'Check your usage stats',
      icon: TrendingUp,
      action: 'analytics',
      tooltip: 'Detailed analytics of your AI tool usage'
    },
    {
      title: 'Get Support',
      description: 'Access help and support',
      icon: Users,
      action: 'tickets',
      tooltip: 'Contact support or browse help resources'
    },
  ];

  const recentActivity = [
    {
      action: 'Generated blog post',
      tool: 'Blog Writer',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      action: 'Created documentation',
      tool: 'Documentation',
      time: '4 hours ago',
      status: 'completed',
    },
    {
      action: 'Code review assistance',
      tool: 'Code Assistant',
      time: '6 hours ago',
      status: 'completed',
    },
    {
      action: 'Email composition',
      tool: 'Email Writer',
      time: '1 day ago',
      status: 'completed',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user?.user_metadata?.full_name || 'User'}! 👋
            </h2>
            <p className="text-blue-100">
              Your AI-powered workspace is ready. Let's create something amazing today.
            </p>
          </div>
          <TooltipHelp 
            content="This dashboard shows your AI usage statistics and quick access to tools"
            className="text-white"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <TooltipHelp content={stat.tooltip} />
                </div>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </div>
              <TooltipHelp content="Click any action to quickly navigate to that section" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <TooltipHelp key={index} content={action.tooltip} side="left">
                  <div className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors group">
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </TooltipHelp>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest AI tool usage
                </CardDescription>
              </div>
              <TooltipHelp content="Track your recent AI tool interactions and their status" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/20 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">
                    via {activity.tool} • {activity.time}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Done
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              System Status
            </CardTitle>
            <TooltipHelp content="Real-time status of our AI services and infrastructure" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <TooltipHelp content="All AI models and services are running normally">
              <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/20 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">AI Services: Operational</span>
              </div>
            </TooltipHelp>
            <TooltipHelp content="API endpoints are responding normally with good performance">
              <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/20 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">API Status: Healthy</span>
              </div>
            </TooltipHelp>
            <TooltipHelp content="Database is connected and performing well">
              <div className="flex items-center gap-2 p-2 rounded hover:bg-muted/20 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Database: Connected</span>
              </div>
            </TooltipHelp>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
