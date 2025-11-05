'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Boxes, Bot, FileJson, Terminal } from 'lucide-react';
import type { ExecutionStep } from '@/lib/types';
import VariablesPanel from './variables-panel';
import HeapPanel from './heap-panel';
import OutputPanel from './output-panel';
import ExplanationPanel from './explanation-panel';

interface VisualizationPanelsProps {
  currentStep: ExecutionStep;
  previousStep: ExecutionStep | null;
  code: string;
}

export default function VisualizationPanels({ currentStep, previousStep, code }: VisualizationPanelsProps) {
  const activeFrame = currentStep.callStack[currentStep.callStack.length - 1];

  return (
    <Tabs defaultValue="vars" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="vars"><FileJson className="mr-2" /> Variables & Heap</TabsTrigger>
        <TabsTrigger value="output"><Terminal className="mr-2" /> Output</TabsTrigger>
        <TabsTrigger value="ai"><Bot className="mr-2" /> AI Explanation</TabsTrigger>
      </TabsList>
      <TabsContent value="vars" className="mt-4">
        <div className="space-y-4">
            <VariablesPanel
                globals={currentStep.globals}
                locals={activeFrame?.locals || {}}
                prevGlobals={previousStep?.globals}
                prevLocals={previousStep?.callStack[previousStep.callStack.length - 1]?.locals}
            />
            <HeapPanel heap={currentStep.heap} />
        </div>
      </TabsContent>
      <TabsContent value="output" className="mt-4">
        <OutputPanel output={currentStep.output} />
      </TabsContent>
      <TabsContent value="ai" className="mt-4">
        <ExplanationPanel currentStep={currentStep} code={code} />
      </TabsContent>
    </Tabs>
  );
}
