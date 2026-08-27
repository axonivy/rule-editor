export interface Operator {
  value: string;
  label: string;
  info?: string;
}

export const Operators: Operator[] = [
  { value: 'equal to', label: '=', info: '=' },
  { value: 'not equal to', label: '!=', info: '!=' },
  { value: 'is true', label: 'is true', info: 'is true' },
  { value: 'is false', label: 'is false', info: 'is false' },
  { value: 'less than', label: '<', info: '<' },
  { value: 'greater than', label: '>', info: '>' },
  { value: 'less or equal to', label: '<=', info: '<=' },
  { value: 'greater or equal to', label: '>=', info: '>=' }
];
