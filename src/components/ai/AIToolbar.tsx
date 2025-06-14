
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';
import { aiActions, getActionsByCategory } from '@/lib/ai/aiActions';

interface AIToolbarProps {
  activeCategory: string;
  onQuickAction: (actionId: string) => void;
  isLoading: boolean;
}

/**
 * AIToolbar Component
 * Displays quick action buttons based on the active category
 * Allows users to execute predefined AI actions with one click
 */
export const AIToolbar = ({ activeCategory, onQuickAction, isLoading }: AIToolbarProps) => {
  const categoryActions = getActionsByCategory(activeCategory);

  if (categoryActions.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>
          One-click AI actions for common tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {categoryActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="justify-start h-auto p-3"
              onClick={() => onQuickAction(action.id)}
              disabled={isLoading}
            >
              <div className="text-left">
                <div className="flex items-center gap-2 font-medium">
                  <span>{action.icon}</span>
                  {action.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
