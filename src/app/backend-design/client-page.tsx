'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Diagram } from './diagram';

export function BackendStructureClient({ backendData }: { backendData: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start h-full">
      <div className="lg:col-span-2 h-[600px] lg:h-[800px] rounded-lg border bg-card/50 p-4">
        <Diagram backendData={backendData} />
      </div>

      <div className="space-y-8 lg:sticky lg:top-24">
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
  );
}
