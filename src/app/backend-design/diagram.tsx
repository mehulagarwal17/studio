'use client';
import React, { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { FileJson, FolderGit2, Database } from 'lucide-react';

const nodeSpacing = { x: 350, y: 200 };

const CustomNode = ({ data }: { data: any }) => {
  const isEntity = data.type === 'entity';
  const Icon = isEntity ? FileJson : Database;

  return (
    <div
      className={`p-4 rounded-lg shadow-lg w-72 border-2 ${
        isEntity
          ? 'bg-card border-primary/30'
          : 'bg-secondary border-accent/30'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-primary" />
      <div className="flex items-center gap-2 mb-2">
        <Icon
          className={`h-5 w-5 ${
            isEntity ? 'text-primary' : 'text-accent'
          }`}
        />
        <h3 className="font-bold text-lg">{data.label}</h3>
      </div>
      <p className="text-muted-foreground text-xs mb-3 font-mono break-all">{data.path}</p>
      <p className="text-xs text-muted-foreground mb-3">{data.description}</p>
      
      {data.properties && (
        <div className="space-y-1 text-xs border-t border-border pt-2">
            {Object.entries(data.properties).map(([key, value]: [string, any]) => (
                <div key={key} className="flex justify-between items-center">
                    <span className="font-mono text-foreground/80">{key}</span>
                    <span className="text-muted-foreground">{value.type}</span>
                </div>
            ))}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-accent"
      />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export function Diagram({ backendData }: { backendData: any }) {
  const { nodes, edges } = useMemo(() => {
    const initialNodes: Node[] = [];
    const initialEdges: Edge[] = [];

    let yPos = 0;

    // Create nodes for entities
    Object.entries(backendData.entities).forEach(([name, entity]: [string, any], index) => {
      initialNodes.push({
        id: `entity-${name}`,
        type: 'custom',
        data: {
          label: name,
          type: 'entity',
          description: entity.description,
          path: `Defined in "entities"`,
          properties: entity.properties
        },
        position: { x: 0, y: yPos },
      });
      yPos += nodeSpacing.y;
    });
    
    yPos = 0;

    // Create nodes for firestore structure and edges
    backendData.firestore.structure.forEach((item: any, index: number) => {
      const entityName = item.definition.entityName;
      
      initialNodes.push({
        id: `firestore-${index}`,
        type: 'custom',
        data: {
            label: `Collection: ${entityName}s`,
            type: 'firestore',
            path: item.path,
            description: item.definition.description,
        },
        position: { x: nodeSpacing.x, y: yPos },
      });

      // Add edge from entity to firestore collection
      initialEdges.push({
        id: `e-entity-${entityName}-firestore-${index}`,
        source: `entity-${entityName}`,
        target: `firestore-${index}`,
        animated: true,
        style: { stroke: 'hsl(var(--primary))' },
      });

      // Add edges between hierarchical firestore collections
      if (item.path.split('/').length > 3) {
          const parentPath = item.path.substring(0, item.path.lastIndexOf('/'));
          const parentPathEnd = parentPath.substring(0, parentPath.lastIndexOf('/'));
          
          const parentNodeIndex = backendData.firestore.structure.findIndex((p:any) => p.path.startsWith(parentPathEnd) && p.path.split('/').length === parentPath.split('/').length);
          
          if (parentNodeIndex > -1) {
              initialEdges.push({
                id: `e-firestore-${parentNodeIndex}-firestore-${index}`,
                source: `firestore-${parentNodeIndex}`,
                target: `firestore-${index}`,
                animated: true,
                style: { stroke: 'hsl(var(--accent))' },
              });
          }
      }


      yPos += nodeSpacing.y + 50;
    });

    return { nodes: initialNodes, edges: initialEdges };
  }, [backendData]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      className="bg-transparent"
    >
      <Background />
      <Controls />
      <MiniMap nodeStrokeWidth={3} zoomable pannable />
    </ReactFlow>
  );
}
