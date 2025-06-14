
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Send, Image as ImageIcon } from 'lucide-react';

interface AIInputBoxProps {
  activeCategory: string;
  onSendMessage: (message: string) => void;
  onGenerateImage: (prompt: string) => void;
  isLoading: boolean;
}

/**
 * AIInputBox Component
 * Handles user input for both text chat and image generation
 * Switches input type based on active category
 */
export const AIInputBox = ({ 
  activeCategory, 
  onSendMessage, 
  onGenerateImage, 
  isLoading 
}: AIInputBoxProps) => {
  const [input, setInput] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (activeCategory === 'image') {
        handleImageGeneration();
      } else {
        handleSend();
      }
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const handleImageGeneration = () => {
    if (!imagePrompt.trim()) return;
    onGenerateImage(imagePrompt);
    setImagePrompt('');
  };

  const getPlaceholder = () => {
    switch (activeCategory) {
      case 'image':
        return 'Describe the image you want to generate...';
      case 'code':
        return 'Ask about coding, debugging, or development...';
      case 'documentation':
        return 'Request technical documentation help...';
      case 'email':
        return 'Need help writing professional emails...';
      default:
        return 'Ask your AI assistant anything...';
    }
  };

  return (
    <div className="border-t p-4">
      {activeCategory === 'image' ? (
        <div className="flex space-x-2">
          <Input
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getPlaceholder()}
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleImageGeneration}
            disabled={!imagePrompt.trim() || isLoading}
            size="icon"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={getPlaceholder()}
            className="flex-1 min-h-[60px] max-h-[120px]"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-[60px] w-[60px]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
      <p className="text-xs text-muted-foreground mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
};
