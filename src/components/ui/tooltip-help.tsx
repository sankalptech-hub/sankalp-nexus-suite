
import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TooltipHelpProps {
  content: string;
  children?: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export const TooltipHelp: React.FC<TooltipHelpProps> = ({
  content,
  children,
  side = 'top',
  className = '',
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`inline-flex items-center cursor-help ${className}`}>
            {children || <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />}
          </div>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
