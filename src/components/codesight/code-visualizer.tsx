'use client';

import { useState, useMemo } from 'react';
import { sampleCode, mockTrace } from '@/lib/mock-data';
import type { ExecutionTrace, ExecutionStep } from '@/lib/types';
import CodeEditor from './code-editor';
import Controls from './controls';
import StackPanel from './stack-panel';
import VisualizationPanels from './visualization-panels';
import GuidanceButton from './guidance-button';

export default function CodeVisualizer() {
  const [code, setCode] = useState(sampleCode);
  const [trace, setTrace] = useState<ExecutionTrace | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const isExecuting = trace !== null;
  const maxSteps = trace ? trace.length - 1 : 0;

  const handleRun = () => {
    // In a real app, this would make an API call to execute the code
    // and receive the trace. For now, we use mock data.
    setTrace(mockTrace);
    setCurrentStep(0);
  };

  const handleReset = () => {
    setTrace(null);
    setCurrentStep(0);
  };

  const handleStepChange = (newStep: number) => {
    if (trace && newStep >= 0 && newStep < trace.length) {
      setCurrentStep(newStep);
    }
  };

  const currentExecutionStep: ExecutionStep | null = trace ? trace[currentStep] : null;
  const previousExecutionStep: ExecutionStep | null = trace && currentStep > 0 ? trace[currentStep-1] : null;

  return (
    <div className="container mx-auto p-4 max-w-screen-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="flex flex-col gap-4 sticky top-20">
          <Controls
            onRun={handleRun}
            onReset={handleReset}
            onStepChange={handleStepChange}
            currentStep={currentStep}
            maxSteps={maxSteps}
            isExecuting={isExecuting}
          />
          <CodeEditor
            code={code}
            onCodeChange={setCode}
            highlightedLine={currentExecutionStep?.highlightedLine}
            isExecuting={isExecuting}
          />
          <GuidanceButton code={code} />
        </div>
        
        {isExecuting && currentExecutionStep ? (
          <div className="flex flex-col gap-4">
            <StackPanel callStack={currentExecutionStep.callStack} />
            <VisualizationPanels
              currentStep={currentExecutionStep}
              previousStep={previousExecutionStep}
              code={code}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-dashed shadow-sm h-[60vh] lg:h-full">
            <div className="text-center">
              <h3 className="text-2xl font-semibold tracking-tight">Run Code to Visualize</h3>
              <p className="text-sm text-muted-foreground">
                Paste your Python code on the left and click 'Run' to see it in action.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
