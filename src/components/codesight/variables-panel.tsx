'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Globe } from 'lucide-react';
import { formatValue, isReference } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

interface VariablesPanelProps {
  globals: Record<string, any>;
  locals: Record<string, any>;
  prevGlobals?: Record<string, any>;
  prevLocals?: Record<string, any>;
}

const useChangeHighlight = (value: any) => {
    const [highlight, setHighlight] = useState(false);
    const [prevValue, setPrevValue] = useState(value);
  
    useEffect(() => {
        const currentValString = JSON.stringify(value);
        const prevValString = JSON.stringify(prevValue);

        if (currentValString !== prevValString) {
            setHighlight(true);
            const timer = setTimeout(() => {
                setHighlight(false);
            }, 1500);
            setPrevValue(value);
            return () => clearTimeout(timer);
        }
    }, [value, prevValue]);
  
    return highlight;
}

const VariableRow = ({ name, value, prevValue }: { name: string; value: any; prevValue: any }) => {
    const hasChanged = JSON.stringify(value) !== JSON.stringify(prevValue);
    const [highlight, setHighlight] = useState(false);

    useEffect(() => {
        if(hasChanged) {
            setHighlight(true);
            const timer = setTimeout(() => setHighlight(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [hasChanged]);
    
    if (name === '__return__') {
        return (
            <div className={`p-2 rounded-md transition-colors duration-500 bg-green-500/20`}>
                <span className="font-semibold text-green-700 dark:text-green-300">Return Value: </span>
                <span className="font-mono text-green-800 dark:text-green-200">{formatValue(value)}</span>
            </div>
        )
    }

  return (
    <div className={`flex justify-between items-center p-2 rounded-md transition-colors duration-500 ${highlight ? 'bg-primary/20' : ''}`}>
      <span className="font-mono">{name}</span>
      <Badge variant={isReference(value) ? 'default' : 'secondary'} className="font-mono">{formatValue(value)}</Badge>
    </div>
  );
};


export default function VariablesPanel({ globals, locals, prevGlobals, prevLocals }: VariablesPanelProps) {
  const globalEntries = Object.entries(globals);
  const localEntries = Object.entries(locals);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4" /> Globals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-32">
            <div className="space-y-1">
                {globalEntries.length > 0 ? globalEntries.map(([key, value]) => (
                    <VariableRow key={key} name={key} value={value} prevValue={prevGlobals?.[key]} />
                )) : <p className="text-sm text-muted-foreground">No global variables.</p>}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Book className="h-4 w-4" /> Locals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-32">
            <div className="space-y-1">
                {localEntries.length > 0 ? localEntries.map(([key, value]) => (
                    <VariableRow key={key} name={key} value={value} prevValue={prevLocals?.[key]} />
                )) : <p className="text-sm text-muted-foreground">No local variables.</p>}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
