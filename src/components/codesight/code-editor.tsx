'use client';

import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  highlightedLine: number | undefined;
  isExecuting: boolean;
}

export default function CodeEditor({
  code,
  onCodeChange,
  highlightedLine,
  isExecuting,
}: CodeEditorProps) {
  const lines = code.split('\n');

  return (
    <div className="bg-card border rounded-lg shadow-sm relative font-code">
      <div className="absolute left-0 top-0 bottom-0 w-12 text-right pr-3 pt-[11px] text-muted-foreground select-none bg-muted/20 rounded-l-lg border-r">
        {lines.map((_, index) => (
          <div key={index} className="h-[21px] text-sm leading-[21px]">
            {index + 1}
          </div>
        ))}
      </div>
      <ScrollArea className="h-96">
        <div className="relative pl-14">
          <Textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            readOnly={isExecuting}
            className="absolute inset-0 z-10 bg-transparent resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-transparent caret-foreground selection:bg-primary/20 leading-[21px] text-sm"
            style={{ fontFamily: 'var(--font-code)' }}
          />
          <div className="relative z-0 pt-[11px] pb-4 pr-4 leading-[21px] text-sm whitespace-pre-wrap">
            {lines.map((line, index) => (
              <div
                key={index}
                className={`transition-colors duration-300 rounded-r-sm -ml-2 pl-2 ${
                  highlightedLine === index + 1
                    ? 'bg-primary/20'
                    : 'bg-transparent'
                }`}
              >
                {line || ' '}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
