'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Boxes } from 'lucide-react';
import type { HeapObject } from '@/lib/types';
import { formatValue } from '@/lib/types';

interface HeapPanelProps {
  heap: Record<string, HeapObject>;
}

const HeapObjectView = ({ id, obj }: { id: string, obj: HeapObject }) => {
    const renderValue = () => {
        switch(obj.type) {
            case 'function':
                return `Function: ${obj.name}`;
            case 'list':
            case 'dict':
                return JSON.stringify(obj.value, (k, v) => formatValue(v));
            default:
                return formatValue(obj.value);
        }
    }
  
  return (
    <div className="flex items-start gap-4 p-2 bg-muted/30 rounded-md">
      <Badge variant="default" className="mt-1">{`ref_${id}`}</Badge>
      <div className="font-mono text-sm break-all">
        <Badge variant="outline" className="mr-2 capitalize">{obj.type}</Badge>
        {renderValue()}
      </div>
    </div>
  );
};

export default function HeapPanel({ heap }: HeapPanelProps) {
    const heapEntries = Object.entries(heap);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Boxes className="h-4 w-4" /> Memory (Heap)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {heapEntries.length > 0 ? heapEntries.map(([id, obj]) => (
          <HeapObjectView key={id} id={id} obj={obj} />
        )) : (
            <p className="text-sm text-muted-foreground">No objects in memory.</p>
        )}
      </CardContent>
    </Card>
  );
}
