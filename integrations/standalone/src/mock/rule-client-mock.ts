import { Emitter } from '@axonivy/jsonrpc';
import type { EditorFileContent, RuleClient, RuleEditorData, RuleSaveDataArgs } from '@axonivy/rule-editor-protocol';
import { mockDecisions } from './data-mock';

export class RuleClientMock implements RuleClient {
  private ruleEditorData: RuleEditorData;
  constructor() {
    this.ruleEditorData = {
      helpUrl: 'https://www.axonivy.com',
      readonly: false,
      context: {
        app: 'mockApp',
        file: 'mockFile',
        project: 'mockProject'
      },
      data: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        config: {
          name: 'Mock Rule',
          description: 'This is a mock rule for testing purposes.',
          matchMode: 'FIRST',
          data: 'test.Member',
          decisions: mockDecisions
        }
      }
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

  saveData(saveData: RuleSaveDataArgs): Promise<EditorFileContent> {
    this.ruleEditorData.data = saveData.data;
    return Promise.resolve({ content: '' });
  }
}
