'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  getExplanation,
  getContextualGuidance,
  getImageFromCode,
} from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ExecutionStep } from '@/lib/types';
import { Bot, Lightbulb, Image as ImageIcon } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import Image from 'next/image';

interface ExplanationPanelProps {
  step: ExecutionStep | null;
  code: string;
}

export default function ExplanationPanel({ step, code }: ExplanationPanelProps) {
  const [explanation, setExplanation] = useState<string>('');
  const [guidance, setGuidance] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');

  const [isExplanationLoading, startExplanationTransition] = useTransition();
  const [isGuidanceLoading, startGuidanceTransition] = useTransition();
  const [isImageLoading, startImageTransition] = useTransition();

  useEffect(() => {
    if (step) {
      startExplanationTransition(async () => {
        const result = await getExplanation(step, code);
        setExplanation(result);
      });
    } else {
      setExplanation('');
    }
  }, [step, code]);

  useEffect(() => {
    startGuidanceTransition(async () => {
      const result = await getContextualGuidance(code);
      setGuidance(result);
    });
    // Reset image when code changes
    setImageUrl('');
  }, [code]);

  const handleGenerateImage = () => {
    startImageTransition(async () => {
      const result = await getImageFromCode(code);
      setImageUrl(result);
    });
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Explanation
            </CardTitle>
            <CardDescription>What's happening at this step</CardDescription>
          </CardHeader>
          <CardContent>
            {isExplanationLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="text-sm">{explanation}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Visual Idea
            </CardTitle>
            <CardDescription>A creative take on your code</CardDescription>
          </CardHeader>
          <CardContent>
            {isImageLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-40 w-full rounded-md" />
                <Skeleton className="h-9 w-full" />
              </div>
            ) : imageUrl ? (
              <div className="relative aspect-video w-full">
                <Image
                  src={imageUrl}
                  alt="AI-generated visualization of code"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ) : (
              <div className="text-center text-sm text-muted-foreground p-4 border-2 border-dashed rounded-md">
                <p className="mb-4">
                  Generate an AI image to get a visual metaphor for your code.
                </p>
                <Button onClick={handleGenerateImage} disabled={isImageLoading}>
                  Generate Image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Contextual Guidance
            </CardTitle>
            <CardDescription>
              Tips & best practices for this snippet
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isGuidanceLoading ? (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Skeleton className="h-4 w-4 rounded-full mt-1" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex items-start gap-2">
                  <Skeleton className="h-4 w-4 rounded-full mt-1" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ) : (
              <ul className="space-y-3 text-sm">
                {guidance.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Lightbulb className="h-4 w-4 mt-1 flex-shrink-0 text-yellow-400" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
