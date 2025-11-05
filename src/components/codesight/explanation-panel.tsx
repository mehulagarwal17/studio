'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import { getExplanation } from '@/app/actions';
import type { ExecutionStep } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

interface ExplanationPanelProps {
  currentStep: ExecutionStep;
  code: string;
}

export default function ExplanationPanel({ currentStep, code }: ExplanationPanelProps) {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExplanation = async () => {
      setIsLoading(true);
      const result = await getExplanation(currentStep, code);
      setExplanation(result);
      setIsLoading(false);
    };
    fetchExplanation();
  }, [currentStep, code]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Bot className="h-4 w-4" /> AI Explanation
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-[10rem]">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <p className="text-sm text-foreground/80 leading-relaxed">
            {explanation}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
