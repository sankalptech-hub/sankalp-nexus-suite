
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Ticket, FolderKanban, LogOut, Bot, Home } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { User } from '@supabase/supabase-js';

const Sidebar = ({ handleLogout }: { handleLogout: () => void }) => (
  <aside className="w-64 flex-shrink-0 bg-muted/40 p-4 flex flex-col justify-between">
    <div>
      <h2 className="text-2xl font-bold mb-8">Sankalp</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <Link to="/dashboard/projects" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
          <FolderKanban className="h-4 w-4" />
          Projects
        </Link>
        <Link to="/dashboard/tickets" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
          <Ticket className="h-4 w-4" />
          Support Tickets
        </Link>
        <Link to="/dashboard/ai-tools" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
          <Bot className="h-4 w-4" />
          AI Tools
        </Link>
      </nav>
    </div>
    <div className="flex flex-col gap-2">
       <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
          <Home className="h-4 w-4" />
          Back to Website
        </Link>
      <Button variant="ghost" onClick={handleLogout} className="w-full justify-start px-3">
        <LogOut className="mr-3 h-4 w-4" />
        Logout
      </Button>
    </div>
  </aside>
);

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
        <div className="flex h-screen w-full">
            <div className="w-64 flex-shrink-0 bg-muted/40 p-4 flex flex-col justify-between">
                <Skeleton className="h-8 w-32 mb-8" />
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
                <div className="flex-grow" />
                <Skeleton className="h-8 w-full" />
            </div>
            <main className="flex-1 p-8">
                <Skeleton className="h-12 w-1/4 mb-4" />
                <Skeleton className="h-32 w-full" />
            </main>
        </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar handleLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <Outlet context={{ user }} />
      </main>
    </div>
  );
};

export default DashboardLayout;
