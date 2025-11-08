'use client';

import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:px-6 sm:py-0">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Settings className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          The settings page is currently being built.
        </p>
      </div>
    </div>
  );
}
