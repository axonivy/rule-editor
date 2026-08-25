/* eslint-disable @typescript-eslint/no-invalid-void-type */
import type { EditorFileContent, RuleActionArgs, RuleContext, RuleEditorData, ValidationResult, RuleSaveData } from './data/rule';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RuleMetaRequestTypes {}

export interface RuleRequestTypes extends RuleMetaRequestTypes {
  initialize: [RuleContext, void];
  data: [RuleContext, RuleEditorData];
  saveData: [RuleSaveData, EditorFileContent];

  validate: [RuleContext, ValidationResult[]];
}

export interface RuleNotificationTypes {
  action: RuleActionArgs;
}

export interface RuleOnNotificationTypes {
  dataChanged: void;
  validationChanged: void;
}
