import type { RuleData, RuleSaveDataArgs } from './rule';

export type RuleSaveData = Omit<RuleSaveDataArgs, 'data'> & {
  data: RuleData;
  directSave?: boolean;
};
