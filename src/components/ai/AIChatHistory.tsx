
import { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Bot, User as UserIcon, Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isImage?: boolean;
  imageUrl?: string;
}

interface AIChatHistoryProps {
  messages: Message[];
  isLoading: boolean;
}

/**
 * AIChatHistory Component
 * Displays the conversation history with messages and images
 * Includes export functionality for messages and images
 */
export const AIChatHistory = ({ messages, isLoading }: AIChatHistoryProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: 'Message copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Copy Failed',
        description: 'Unable to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: 'Download Started',
      description: 'Image download initiated',
    });
  };

  const exportConversation = () => {
    const conversationText = messages
      .filter(msg => !msg.isImage)
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ai-conversation-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Conversation Exported',
      description: 'Chat history saved as text file',
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-medium">Conversation</h3>
        {messages.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            onClick={exportConversation}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Chat
          </Button>
        )}
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-2' 
                      : 'bg-muted mr-2'
                  }`}
                >
                  {message.role === 'user' ? (
                    <UserIcon className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`rounded-lg px-4 py-2 relative group ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.isImage && message.imageUrl ? (
                    <div className="space-y-2">
                      <img 
                        src={message.imageUrl} 
                        alt="Generated image" 
                        className="max-w-full h-auto rounded-lg"
                      />
                      <div className="text-sm">
                        Generated image: {message.content}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadImage(message.imageUrl!, `ai-image-${message.id}.png`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      {message.role === 'assistant' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(message.content)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </>
                  )}
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted mr-2 flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <Skeleton className="h-2 w-2 rounded-full animate-pulse" />
                    <Skeleton className="h-2 w-2 rounded-full animate-pulse delay-100" />
                    <Skeleton className="h-2 w-2 rounded-full animate-pulse delay-200" />
                  </div>
                  <div className="text-xs mt-2 text-muted-foreground">
                    AI is thinking...
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
