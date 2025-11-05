'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getContextualGuidance } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface GuidanceDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  code: string;
}

export default function GuidanceDialog({ isOpen, onOpenChange, code }: GuidanceDialogProps) {
  const [guidance, setGuidance] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchGuidance = async () => {
        setIsLoading(true);
        const result = await getContextualGuidance(code);
        setGuidance(result);
        setIsLoading(false);
      };
      fetchGuidance();
    }
  }, [isOpen, code]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Contextual Guidance</DialogTitle>
          <DialogDescription>
            Here are some AI-powered suggestions to improve your code.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96">
          <div className="p-1 space-y-4">
            {isLoading ? (
              <div className="space-y-2">
                <div className="animate-pulse bg-muted h-8 w-1/3 rounded-md" />
                <div className="animate-pulse bg-muted h-16 w-full rounded-md" />
              </div>
            ) : (
              guidance.map((suggestion, index) => (
                <Alert key={index}>
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Suggestion #{index + 1}</AlertTitle>
                  <AlertDescription>
                    <p className="prose-sm dark:prose-invert">{suggestion}</p>
                  </AlertDescription>
                </Alert>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
