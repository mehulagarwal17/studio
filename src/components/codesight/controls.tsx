'use client';

import { Play, History, StepBack, StepForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ControlsProps {
  onRun: () => void;
  onReset: () => void;
  onStepChange: (step: number) => void;
  currentStep: number;
  maxSteps: number;
  isExecuting: boolean;
}

export default function Controls({
  onRun,
  onReset,
  onStepChange,
  currentStep,
  maxSteps,
  isExecuting,
}: ControlsProps) {
  return (
    <div className="p-4 bg-card border rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        {!isExecuting ? (
          <Button onClick={onRun} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Play className="mr-2 h-4 w-4" /> Run
          </Button>
        ) : (
          <Button onClick={onReset} variant="outline">
            <History className="mr-2 h-4 w-4" /> Reset
          </Button>
        )}

        <TooltipProvider>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onStepChange(currentStep - 1)}
                  disabled={!isExecuting || currentStep === 0}
                >
                  <StepBack className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Step Back</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onStepChange(currentStep + 1)}
                  disabled={!isExecuting || currentStep === maxSteps}
                >
                  <StepForward className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Step Forward</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        <div className="flex-1 flex items-center gap-3">
          <Slider
            value={[currentStep]}
            max={maxSteps}
            step={1}
            onValueChange={(value) => onStepChange(value[0])}
            disabled={!isExecuting}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground font-mono w-24 text-right">
            {isExecuting ? `Step ${currentStep}/${maxSteps}` : 'Not running'}
          </span>
        </div>
      </div>
    </div>
  );
}
