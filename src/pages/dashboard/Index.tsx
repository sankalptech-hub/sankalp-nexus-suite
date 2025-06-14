
import { useOutletContext } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';

const Dashboard = () => {
  const { user } = useOutletContext<{ user: User }>();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Welcome back, {user?.user_metadata?.full_name || user?.email}! Here's an overview of your projects and recent activity.
      </p>
      {/* More dashboard content will go here */}
    </div>
  );
};

export default Dashboard;
