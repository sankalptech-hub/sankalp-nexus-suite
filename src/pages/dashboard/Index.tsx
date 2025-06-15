
import { useOutletContext } from 'react-router-dom';
import type { User } from '@supabase/supabase-js';
import { DashboardStats } from '@/components/dashboard/DashboardStats';

const DashboardIndex = () => {
  const { user } = useOutletContext<{ user: User }>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your Sankalp Tech dashboard. Monitor your projects, AI usage, and system status.
        </p>
      </div>

      <DashboardStats user={user} />
    </div>
  );
};

export default DashboardIndex;
