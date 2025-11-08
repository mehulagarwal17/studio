'use client';

import { BrainCircuit } from 'lucide-react';

export default function AiMentorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:px-6 sm:py-0">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <BrainCircuit className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">AI Mentor</h1>
        <p className="text-muted-foreground mt-2">
          Your personal AI coding coach is getting ready.
        </p>
      </div>
    </div>
  );
}
