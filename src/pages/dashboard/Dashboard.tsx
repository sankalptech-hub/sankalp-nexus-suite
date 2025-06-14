
import { useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FolderKanban, Ticket, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useOutletContext<{ user: User }>();

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', user?.id);
      
      if (error) throw error;
      return data;
    },
  });

  const { data: tickets, isLoading: ticketsLoading } = useQuery({
    queryKey: ['tickets', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('created_by', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  const stats = [
    {
      title: 'Total Projects',
      value: projects?.length || 0,
      icon: FolderKanban,
      description: 'Active projects',
    },
    {
      title: 'Open Tickets',
      value: tickets?.filter(t => t.status === 'Open').length || 0,
      icon: Ticket,
      description: 'Pending support requests',
    },
    {
      title: 'In Progress',
      value: projects?.filter(p => p.status === 'In Progress').length || 0,
      icon: Clock,
      description: 'Projects being worked on',
    },
    {
      title: 'Completed',
      value: projects?.filter(p => p.status === 'Completed').length || 0,
      icon: CheckCircle,
      description: 'Successfully delivered',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user?.user_metadata?.full_name || user?.email}! Here's an overview of your projects and recent activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {projectsLoading || ticketsLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your latest projects and their status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ))
            ) : projects?.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
              </div>
            ))}
            {projects?.length === 0 && (
              <p className="text-sm text-muted-foreground">No projects yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
            <CardDescription>Your latest support requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ticketsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ))
            ) : tickets?.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{ticket.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge 
                  variant={
                    ticket.status === 'Open' ? 'destructive' : 
                    ticket.status === 'In Progress' ? 'default' : 'secondary'
                  }
                >
                  {ticket.status}
                </Badge>
              </div>
            ))}
            {tickets?.length === 0 && (
              <p className="text-sm text-muted-foreground">No tickets yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
