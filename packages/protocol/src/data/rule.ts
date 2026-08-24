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
  name: string;
  description: string;
  matchMode: 'FIRST' | 'ALL';
  data: string;
  decisions: Rule[];
}

export interface Rule {
  name: string;
  when: Condition[];
  then: Action[];
}

export interface Condition {
  field: string;
  operator: string; // Could be enum
  value: string;
}

export interface Action {
  field: string;
  value: string;
}


export interface RuleActionArgs {
  actionId: 'openUrl';
  context: RuleContext;
  payload: string;
}
