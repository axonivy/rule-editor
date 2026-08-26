import { Emitter } from '@axonivy/jsonrpc';
import type {
  EditorFileContent,
  RuleActionArgs,
  RuleClient,
  RuleMetaRequestTypes,
  ValidationResult,
  RuleSaveData
} from '@axonivy/rule-editor-protocol';
import type { RuleEditorData } from '@axonivy/rule-editor-protocol';
import { mockData, mockDecisions } from './data-mock';
import { validateMock } from './validation-mock';

export class RuleClientMock implements RuleClient {
  private ruleEditorData: RuleEditorData;
  constructor() {
    this.ruleEditorData = {
      context: {
        app: 'mockApp',
        file: 'mockFile',
        project: 'mockProject'
      },
      data: {
        name: 'Mock Rule',
        description: 'This is a mock rule for testing purposes.',
        matchMode: 'FIRST',
        data: mockData,
        decisions: mockDecisions
      },
      helpUrl: ''
    };
  }

  protected onValidationChangedEmitter = new Emitter<void>();
  onValidationChanged = this.onValidationChangedEmitter.event;
  protected onDataChangedEmitter = new Emitter<void>();
  onDataChanged = this.onDataChangedEmitter.event;

  initialize(): Promise<void> {
    return Promise.resolve();
  }

  data(): Promise<RuleEditorData> {
    return Promise.resolve(this.ruleEditorData);
  }

  saveData(saveData: RuleSaveData): Promise<EditorFileContent> {
    this.ruleEditorData.data = saveData.data;
    return Promise.resolve({ content: '' });
  }

  validate(): Promise<ValidationResult[]> {
    return Promise.resolve(validateMock(this.ruleEditorData.data));
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
