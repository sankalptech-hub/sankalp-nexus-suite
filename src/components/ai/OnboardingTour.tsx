
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  content: React.ReactNode;
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps: TourStep[] = [
    {
      title: "AI Tool Categories",
      description: "Choose the right tool for your task",
      content: (
        <div className="space-y-4">
          <p>Start by selecting a category that matches your needs:</p>
          <div className="grid gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <strong>General Chat:</strong> Ask questions and get AI assistance
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <strong>Code Assistant:</strong> Get help with programming and debugging
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <strong>Email Writer:</strong> Compose professional emails
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <strong>Blog Writer:</strong> Create engaging content
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Quick Actions Toolbar",
      description: "Access pre-built prompts for common tasks",
      content: (
        <div className="space-y-4">
          <p>Use quick actions to get started faster:</p>
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="space-y-2 text-sm">
              <p>• <strong>Code Review:</strong> Get feedback on your code</p>
              <p>• <strong>Bug Fix:</strong> Help debugging issues</p>
              <p>• <strong>Documentation:</strong> Generate technical docs</p>
              <p>• <strong>Email Templates:</strong> Create professional emails</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Quick actions adapt based on your selected category.
          </p>
        </div>
      ),
    },
    {
      title: "AI Settings",
      description: "Customize your AI experience",
      content: (
        <div className="space-y-4">
          <p>Fine-tune your AI assistant:</p>
          <div className="space-y-3">
            <div className="border rounded-lg p-3">
              <h4 className="font-medium mb-2">Model Selection</h4>
              <p className="text-sm text-muted-foreground">
                Choose between OpenAI GPT models and Groq for different performance characteristics.
              </p>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-medium mb-2">Temperature</h4>
              <p className="text-sm text-muted-foreground">
                Control creativity vs. consistency in AI responses.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Conversation Management",
      description: "Save and organize your AI conversations",
      content: (
        <div className="space-y-4">
          <p>Keep track of important conversations:</p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border">
            <div className="space-y-2 text-sm">
              <p>✅ <strong>Auto-save:</strong> Conversations are saved automatically</p>
              <p>✅ <strong>Categories:</strong> Organized by tool category</p>
              <p>✅ <strong>Load Previous:</strong> Resume where you left off</p>
              <p>✅ <strong>Export:</strong> Save important conversations</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>
              {tourSteps[currentStep].title}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            {tourSteps[currentStep].description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Progress value={progress} className="w-full" />
          
          <div className="min-h-[200px]">
            {tourSteps[currentStep].content}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {tourSteps.length}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button onClick={nextStep}>
                {currentStep === tourSteps.length - 1 ? (
                  'Get Started'
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
