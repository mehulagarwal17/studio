'use client';

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
import { Type, FileJson, FolderGit2 } from 'lucide-react';

export function BackendStructureClient({ backendData }: { backendData: any }) {
  const { entities, firestore } = backendData;

  const getEntityByRef = (ref: string) => {
    const entityName = ref.split('/').pop() || '';
    return entities[entityName];
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5 text-primary" />
            Data Entities (Models)
          </CardTitle>
          <CardDescription>
            The core data structures of your application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(entities).map(([name, entity]: [string, any]) => (
              <AccordionItem key={name} value={name}>
                <AccordionTrigger className="text-lg font-medium">
                  {entity.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">{entity.description}</p>
                  <div className="space-y-3">
                    {Object.entries(entity.properties).map(
                      ([propName, propDetails]: [string, any]) => (
                        <div
                          key={propName}
                          className="flex items-start justify-between p-3 rounded-md border bg-muted/20"
                        >
                          <div>
                            <p className="font-mono font-medium">{propName}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {propDetails.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{propDetails.type}</Badge>
                            {entity.required?.includes(propName) && (
                              <Badge variant="destructive">Required</Badge>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-primary" />
            Firestore Structure
          </CardTitle>
          <CardDescription>
            The structure of your NoSQL database collections and documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {firestore?.structure?.map((item: any) => (
              <AccordionItem key={item.path} value={item.path}>
                <AccordionTrigger className="font-mono text-md">
                  {item.path}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-4">
                    {item.definition.description}
                  </p>
                  <div className="p-4 rounded-md border bg-muted/20">
                    <h4 className="font-semibold mb-2">Schema: {item.definition.entityName}</h4>
                    <div className="space-y-2">
                        {Object.entries(getEntityByRef(item.definition.schema.$ref).properties).map(([propName, propDetails]: [string, any]) => (
                             <div key={propName} className="flex items-center justify-between text-sm">
                                <span className="font-mono">{propName}</span>
                                <span className="text-muted-foreground">{propDetails.type}</span>
                            </div>
                        ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
}
