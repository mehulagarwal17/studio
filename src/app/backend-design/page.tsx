import * as fs from 'fs/promises';
import path from 'path';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Server, KeyRound, Type, FileJson, FolderGit2 } from 'lucide-react';
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
    <div className="p-4 sm:px-6 sm:py-0">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <Server className="h-8 w-8" />
          Backend Design
        </h1>
        <p className="text-muted-foreground mt-2">
          A visual breakdown of your application's backend architecture, data models, and authentication.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <BackendStructureClient backendData={backendData} />
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-primary" />
                Authentication
              </CardTitle>
              <CardDescription>
                Enabled login providers for your application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {backendData.auth?.providers?.map((provider: string) => (
                  <Badge key={provider} variant="secondary" className="text-sm">
                    {provider}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
