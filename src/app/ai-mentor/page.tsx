'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { BrainCircuit, Bot, User, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { getChatbotResponse } from '@/app/actions';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function AiMentorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const response = await getChatbotResponse({
        history: messages,
        message: input,
      });
      const modelMessage: Message = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    });
  };

  return (
    <div className="p-4 sm:px-6 sm:py-0 flex flex-col h-[calc(100vh-4rem)]">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <BrainCircuit className="h-8 w-8" />
          AI Mentor
        </h1>
        <p className="text-muted-foreground mt-2">
          Your personal AI coding coach. Ask me anything!
        </p>
      </header>
      <div className="flex-1 flex flex-col bg-card border rounded-lg overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground pt-16">
                <Bot className="mx-auto h-12 w-12 mb-4" />
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-4',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'model' && (
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-md rounded-lg px-4 py-3 text-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            )}
            {isPending && (
              <div className="flex items-start gap-4 justify-start">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-lg px-4 py-3 text-sm bg-muted flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Thinking...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI mentor..."
              className="flex-1"
              disabled={isPending}
            />
            <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
