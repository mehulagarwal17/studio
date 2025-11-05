'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import GuidanceDialog from './guidance-dialog';

interface GuidanceButtonProps {
  code: string;
}

export default function GuidanceButton({ code }: GuidanceButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)} className="w-full">
        <Sparkles className="mr-2 h-4 w-4" />
        Get AI Guidance
      </Button>
      <GuidanceDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        code={code}
      />
    </>
  );
}
