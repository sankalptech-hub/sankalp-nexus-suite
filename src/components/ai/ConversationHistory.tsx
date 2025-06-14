
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { History, MessageSquare, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Message } from './AIChatHistory';

export interface Conversation {
  id: string;
  title: string;
  category: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ConversationHistoryProps {
  currentMessages: Message[];
  currentCategory: string;
  onLoadConversation: (messages: Message[]) => void;
}

/**
 * ConversationHistory Component
 * Manages and displays past AI conversations
 * Allows users to save, load, and delete conversation sessions
 */
export const ConversationHistory = ({ 
  currentMessages, 
  currentCategory, 
  onLoadConversation 
}: ConversationHistoryProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Load conversations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ai-conversations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConversations(parsed.map((conv: any) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt),
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        })));
      } catch (error) {
        console.error('Failed to load conversations:', error);
      }
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ai-conversations', JSON.stringify(conversations));
  }, [conversations]);

  const saveCurrentConversation = () => {
    if (currentMessages.length < 2) {
      toast({
        title: 'Nothing to Save',
        description: 'Start a conversation first',
        variant: 'destructive',
      });
      return;
    }

    const title = generateConversationTitle(currentMessages);
    const conversation: Conversation = {
      id: Date.now().toString(),
      title,
      category: currentCategory,
      messages: currentMessages,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations(prev => [conversation, ...prev]);
    toast({
      title: 'Conversation Saved',
      description: `"${title}" saved to history`,
    });
  };

  const generateConversationTitle = (messages: Message[]): string => {
    const firstUserMessage = messages.find(msg => msg.role === 'user');
    if (firstUserMessage) {
      const content = firstUserMessage.content.slice(0, 50);
      return content.length === 50 ? content + '...' : content;
    }
    return `${currentCategory} conversation`;
  };

  const loadConversation = (conversation: Conversation) => {
    onLoadConversation(conversation.messages);
    setOpen(false);
    toast({
      title: 'Conversation Loaded',
      description: `"${conversation.title}" loaded`,
    });
  };

  const deleteConversation = (id: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== id));
    toast({
      title: 'Conversation Deleted',
      description: 'Conversation removed from history',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <History className="h-4 w-4 mr-2" />
          History ({conversations.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversation History
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              {conversations.length} saved conversations
            </p>
            <Button 
              onClick={saveCurrentConversation}
              size="sm"
              disabled={currentMessages.length < 2}
            >
              Save Current
            </Button>
          </div>
          
          <ScrollArea className="flex-1">
            {conversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No saved conversations yet</p>
                <p className="text-sm">Start chatting and save your conversations</p>
              </div>
            ) : (
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{conversation.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {conversation.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {conversation.messages.length} messages
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {conversation.updatedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => loadConversation(conversation)}
                      >
                        Load
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteConversation(conversation.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
