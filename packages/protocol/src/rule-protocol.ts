/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { EditorFileContent, RuleContext, RuleEditorData, RuleSaveDataArgs } from './data/rule';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RuleMetaRequestTypes {}

export interface RuleRequestTypes extends RuleMetaRequestTypes {
  initialize: [RuleContext, void];
  data: [RuleContext, RuleEditorData];
  saveData: [RuleSaveDataArgs, EditorFileContent];
}

export interface RuleOnNotificationTypes {
  dataChanged: void;
  validationChanged: void;
}
