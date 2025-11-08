'use client';

import { Swords } from 'lucide-react';

export default function ArenaPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:px-6 sm:py-0">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Swords className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Arena</h1>
        <p className="text-muted-foreground mt-2">
          Coding battles coming soon. Sharpen your skills!
        </p>
      </div>
    </div>
  );
}
