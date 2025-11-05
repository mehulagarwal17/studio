'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Layers } from 'lucide-react';
import type { StackFrame } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

interface StackPanelProps {
  callStack: StackFrame[];
}

export default function StackPanel({ callStack }: StackPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Layers className="h-5 w-5" />
          Call Stack
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-36">
            <div className="space-y-2 flex flex-col-reverse">
              {callStack.map((frame, index) => (
                <div key={frame.id}>
                    <div
                      className={`p-2 rounded-md transition-colors ${
                        index === callStack.length - 1
                          ? 'bg-primary/20 border border-primary/50'
                          : 'bg-muted/50'
                      }`}
                    >
                      <div className="font-semibold font-code">{frame.name}</div>
                      <div className="text-xs text-muted-foreground">Line: {frame.line}</div>
                    </div>
                 {index !== 0 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
