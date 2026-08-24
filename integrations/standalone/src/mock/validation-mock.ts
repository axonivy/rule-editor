import type { RuleData, ValidationResult } from '@axonivy/rule-editor-protocol';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const validateMock = (data: RuleData): Array<ValidationResult> => {
  const validations: Array<ValidationResult> = [];
  validations.push({ path: 'Input-1', message: 'Global warning', severity: 'WARNING' });
  return validations;
};
