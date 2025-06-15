
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Sparkles, Zap, Target } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  onStartTour,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Bot className="h-6 w-6 text-primary" />
            Welcome to Sankalp AI Tools
          </DialogTitle>
          <DialogDescription className="text-base mt-4">
            Discover the power of AI automation for your business needs. Our tools are designed to help you work smarter, not harder.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <Sparkles className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Powerful AI Models</h3>
                <p className="text-sm text-muted-foreground">
                  Access OpenAI GPT and Groq models for fast, intelligent responses
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <Zap className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Multiple Categories</h3>
                <p className="text-sm text-muted-foreground">
                  Code assistance, documentation, email writing, and more
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <Target className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">
                  Pre-built prompts for common tasks and workflows
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <Bot className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Context Aware</h3>
                <p className="text-sm text-muted-foreground">
                  AI adapts to your selected category for better results
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              🚀 Getting Started
            </h3>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <p>1. Choose an AI tool category that matches your task</p>
              <p>2. Configure your AI settings (model, temperature, etc.)</p>
              <p>3. Start chatting or use quick actions for common tasks</p>
              <p>4. Save and load conversations for future reference</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">New Feature</Badge>
              <span className="text-sm text-muted-foreground">
                Take a guided tour to learn more
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Skip for Now
              </Button>
              <Button onClick={onStartTour}>
                Start Tour
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
