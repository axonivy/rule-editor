/* eslint-disable i18next/no-literal-string */
import { Operators, type Condition } from '@axonivy/rule-editor-protocol';
import { BasicInput, BasicSelect, Button, Flex, Label } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';

export const ConditionInput = ({
  condition,
  conditionIndex,
  onConditionChange,
  onRemoveCondition
}: {
  condition: Condition;
  conditionIndex: number;
  onConditionChange: (index: number, key: 'field' | 'operator' | 'value', value: string) => void;
  onRemoveCondition: (index: number) => void;
}) => {
  return (
    <Flex direction='column' gap={1} style={{ border: '1px solid gray', borderRadius: '6px', padding: '12px' }}>
      <Flex direction='row' gap={4} justifyContent='space-between' alignItems='center'>
        <Label>{`Condition ${conditionIndex + 1}`}</Label>
        <Button onClick={() => onRemoveCondition(conditionIndex)} icon={IvyIcons.Trash} aria-label='Remove Condition' />
      </Flex>
      <Flex direction='row' gap={4} alignItems='center'>
        <Flex style={{ flex: 3, minWidth: 0 }}>
          <BasicInput
            value={condition.field}
            onChange={event => onConditionChange(conditionIndex, 'field', event.target.value)}
            style={{ width: '100%' }}
          />
        </Flex>
        <Flex style={{ flex: 1, minWidth: 0 }}>
          <BasicSelect
            items={Operators}
            value={condition.operator}
            onValueChange={value => onConditionChange(conditionIndex, 'operator', value)}
          />
        </Flex>
        <Flex style={{ flex: 3, minWidth: 0 }}>
          <BasicInput
            value={condition.value}
            onChange={event => onConditionChange(conditionIndex, 'value', event.target.value)}
            style={{ width: '100%' }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
