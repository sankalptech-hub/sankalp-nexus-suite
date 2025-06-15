
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  MessageSquare, 
  Clock, 
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
  AlertCircle
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
    },
    {
      title: 'Active Projects',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: CheckCircle,
      description: 'Currently in progress',
    },
    {
      title: 'AI Tools Used',
      value: '15',
      change: '+5',
      trend: 'up',
      icon: Zap,
      description: 'Different tools accessed',
    },
    {
      title: 'Time Saved',
      value: '24h',
      change: '+6h',
      trend: 'up',
      icon: Clock,
      description: 'Estimated time saved this month',
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

  const quickActions = [
    {
      title: 'Start AI Chat',
      description: 'Begin a new conversation',
      icon: Bot,
      action: 'ai-tools',
    },
    {
      title: 'Create Project',
      description: 'Start a new project',
      icon: CheckCircle,
      action: 'projects',
    },
    {
      title: 'View Analytics',
      description: 'Check your usage stats',
      icon: TrendingUp,
      action: 'analytics',
    },
    {
      title: 'Get Support',
      description: 'Access help and support',
      icon: Users,
      action: 'tickets',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {user?.user_metadata?.full_name || 'User'}! 👋
        </h2>
        <p className="text-blue-100">
          Your AI-powered workspace is ready. Let's create something amazing today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
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
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest AI tool usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
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
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">AI Services: Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">API Status: Healthy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Database: Connected</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
