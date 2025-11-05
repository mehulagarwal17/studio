export type ExecutionTrace = ExecutionStep[];

export interface ExecutionStep {
  step: number;
  line: number;
  highlightedLine: number;
  callStack: StackFrame[];
  heap: Record<string, HeapObject>;
  globals: Record<string, any>;
  output: string;
}

export interface StackFrame {
  id: string;
  name: string;
  line: number;
  locals: Record<string, any>;
}

export type HeapObject =
  | { type: 'list'; value: any[] }
  | { type: 'dict'; value: Record<string, any> }
  | { type: 'string'; value: string }
  | { type: 'number'; value: number }
  | { type: 'function'; name: string; parent?: string };

export function isReference(value: any): value is string {
  return typeof value === 'string' && value.startsWith('ref_');
}

export function formatValue(value: any): string {
  if (value === null) return 'None';
  if (isReference(value)) {
    const refId = value.split('_')[1];
    return `<ref ${refId}>`;
  }
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}
