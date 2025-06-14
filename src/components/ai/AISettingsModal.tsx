
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Settings } from 'lucide-react';

export interface AISettings {
  model: string;
  temperature: number;
  provider: 'auto' | 'openai' | 'groq';
}

interface AISettingsModalProps {
  settings: AISettings;
  onSettingsChange: (settings: AISettings) => void;
  availableProviders: string[];
}

/**
 * AISettingsModal Component
 * Allows users to configure AI model, temperature, and provider preferences
 */
export const AISettingsModal = ({ 
  settings, 
  onSettingsChange, 
  availableProviders 
}: AISettingsModalProps) => {
  const [tempSettings, setTempSettings] = useState<AISettings>(settings);

  const handleSave = () => {
    onSettingsChange(tempSettings);
  };

  const modelOptions = {
    openai: [
      { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Fast & Cheap)' },
      { value: 'gpt-4o', label: 'GPT-4o (Advanced)' },
    ],
    groq: [
      { value: 'llama3-8b-8192', label: 'Llama 3 8B (Fast)' },
      { value: 'llama3-70b-8192', label: 'Llama 3 70B (Advanced)' },
    ],
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          AI Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Settings</DialogTitle>
          <DialogDescription>
            Configure your AI assistant preferences
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="provider">Provider</Label>
            <Select 
              value={tempSettings.provider} 
              onValueChange={(value: 'auto' | 'openai' | 'groq') => 
                setTempSettings(prev => ({ ...prev, provider: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto (OpenAI → Groq)</SelectItem>
                {availableProviders.includes('OpenAI') && (
                  <SelectItem value="openai">OpenAI Only</SelectItem>
                )}
                {availableProviders.includes('Groq') && (
                  <SelectItem value="groq">Groq Only</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="model">Model</Label>
            <Select 
              value={tempSettings.model} 
              onValueChange={(value) => 
                setTempSettings(prev => ({ ...prev, model: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {tempSettings.provider !== 'groq' && modelOptions.openai.map(model => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
                {tempSettings.provider !== 'openai' && modelOptions.groq.map(model => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="temperature">
              Creativity (Temperature): {tempSettings.temperature}
            </Label>
            <Slider
              value={[tempSettings.temperature]}
              onValueChange={(value) => 
                setTempSettings(prev => ({ ...prev, temperature: value[0] }))
              }
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Focused</span>
              <span>Creative</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button onClick={handleSave}>Save Settings</Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};
