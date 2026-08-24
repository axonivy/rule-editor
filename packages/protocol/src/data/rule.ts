export type Severity = 'INFO' | 'WARNING' | 'ERROR';

export interface ValidationResult {
  message: string;
  path: string;
  severity: Severity;
}

export interface EditorFileContent {
  content: string;
}

export interface RuleContext {
  app: string;
  file: string;
  pmv: string;
}

export interface RuleSaveDataArgs {
  context: RuleContext;
  data: RuleData;
}

export interface RuleData {
  [key: string]: unknown;
}

export interface RuleActionArgs {
  actionId: 'openUrl';
  context: RuleContext;
  payload: string;
}
