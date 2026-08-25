import type { EditorFileContent, RuleContext, RuleEditorData, RuleSaveDataArgs } from './data/rule';

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
  saveData(saveData: RuleSaveDataArgs): Promise<EditorFileContent>;

  onDataChanged: Event<void>;
  onValidationChanged: Event<void>;
}
