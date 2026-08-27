/* eslint-disable i18next/no-literal-string */
import type { Condition, Decision } from '@axonivy/rule-editor-protocol';
import { Button, Flex } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { ConditionInput } from './ConditionInput';

export const ConditionBuilder = ({ decision, onChange }: { decision: Decision; onChange: (conditions: Condition[]) => void }) => {
  const addCondition = () => {
    onChange([...decision.when, { field: '', operator: '', value: '' }]);
  };

  const removeCondition = (indexToRemove: number) => {
    onChange(decision.when.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Flex direction='column' gap={4}>
      {decision.when.map((condition, index) => (
        <ConditionInput
          key={`${condition.field}-${condition.operator}-${condition.value}`}
          condition={condition}
          conditionIndex={index}
          onRemoveCondition={removeCondition}
        />
      ))}
      <Button onClick={addCondition} icon={IvyIcons.Plus} aria-label='Add Condition' variant='outline'>
        Add Condition
      </Button>
    </Flex>
  );
};
