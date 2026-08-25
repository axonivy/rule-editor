import type { EditorFileContent, RuleActionArgs, RuleContext, RuleEditorData, ValidationResult } from './data/rule';
import type { RuleSaveData } from './data/rule-data';
import type { RuleMetaRequestTypes } from './rule-protocol';

export interface Event<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable;
}

export interface Disposable {
  dispose(): void;
}

export interface RuleClient {
  initialize(context: RuleContext): Promise<void>;
  data(context: RuleContext): Promise<RuleEditorData>;
  saveData(saveData: RuleSaveData): Promise<EditorFileContent>;

  validate(context: RuleContext): Promise<ValidationResult[]>;

  meta<TMeta extends keyof RuleMetaRequestTypes>(
    path: TMeta,
    args: RuleMetaRequestTypes[TMeta][0]
  ): Promise<RuleMetaRequestTypes[TMeta][1]>;

  action(action: RuleActionArgs): void;

  onDataChanged: Event<void>;
  onValidationChanged: Event<void>;
}
