import { Emitter } from '@axonivy/jsonrpc';
import type {
  EditorFileContent,
  RuleActionArgs,
  RuleClient,
  RuleData,
  RuleMetaRequestTypes,
  ValidationResult
} from '@axonivy/rule-editor-protocol';
import type { RuleSaveData } from '@axonivy/rule-editor-protocol/src/data/rule-data';
import { validateMock } from './validation-mock';

export class RuleClientMock implements RuleClient {
  private ruleData: RuleData;
  constructor() {
    this.ruleData = {};
  }

  protected onValidationChangedEmitter = new Emitter<void>();
  onValidationChanged = this.onValidationChangedEmitter.event;
  protected onDataChangedEmitter = new Emitter<void>();
  onDataChanged = this.onDataChangedEmitter.event;

  initialize(): Promise<void> {
    return Promise.resolve();
  }

  data(): Promise<RuleData> {
    return Promise.resolve(this.ruleData);
  }

  saveData(saveData: RuleSaveData): Promise<EditorFileContent> {
    this.ruleData = saveData.data;
    return Promise.resolve({ content: '' });
  }

  validate(): Promise<ValidationResult[]> {
    return Promise.resolve(validateMock(this.ruleData));
  }

  meta<TMeta extends keyof RuleMetaRequestTypes>(
    path: TMeta,
    args: RuleMetaRequestTypes[TMeta][0]
  ): Promise<RuleMetaRequestTypes[TMeta][1]> {
    console.log(args);
    switch (path) {
      default:
        throw Error('mock meta path not programmed');
    }
  }

  action(action: RuleActionArgs): void {
    console.log('action', JSON.stringify(action));
  }
}
