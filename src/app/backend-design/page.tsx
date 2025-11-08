import * as fs from 'fs/promises';
import path from 'path';
import { Server } from 'lucide-react';
import { BackendStructureClient } from './client-page';

async function getBackendData() {
  const filePath = path.join(process.cwd(), 'docs', 'backend.json');
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading or parsing backend.json:', error);
    return null;
  }
}

export default async function BackendDesignPage() {
  const backendData = await getBackendData();

  if (!backendData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">
          Error loading backend design data. Please check `docs/backend.json`.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:px-6 sm:py-0 flex flex-col h-full">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <Server className="h-8 w-8" />
          Backend Design Board
        </h1>
        <p className="text-muted-foreground mt-2">
          A visual flowchart of your application's backend architecture and data models.
        </p>
      </header>
      <div className="flex-1">
        <BackendStructureClient backendData={backendData} />
      </div>
    </div>
  );
}
