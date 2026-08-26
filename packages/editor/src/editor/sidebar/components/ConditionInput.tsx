/* eslint-disable i18next/no-literal-string */
import { type Condition } from '@axonivy/rule-editor-protocol';
import { BasicField, BasicSelect, Button, Flex, Input, Label } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';

const Operators = [
  { value: 'equal to', label: 'equal to', info: '=' },
  { value: 'not equal to', label: 'not equal to', info: '!=' },
  { value: 'is true', label: 'is true', info: 'is true' },
  { value: 'is false', label: 'is false', info: 'is false' },
  { value: 'less than', label: 'less than', info: '<' },
  { value: 'greater than', label: 'greater than', info: '>' },
  { value: 'less or equal to', label: 'less or equal to', info: '<=' },
  { value: 'greater or equal to', label: 'greater or equal to', info: '>=' }
];

export const ConditionInput = ({
  condition,
  conditionIndex,
  onRemoveCondition
}: {
  condition: Condition;
  conditionIndex: number;
  onRemoveCondition: (index: number) => void;
}) => {
  return (
    <Flex direction='column' gap={2} style={{ border: '1px solid white', borderRadius: '12px', padding: '12px' }}>
      <Flex direction='row' gap={4} justifyContent='space-between' alignItems='center'>
        <Label>{`Condition ${conditionIndex + 1}`}</Label>
        <Button onClick={() => onRemoveCondition(conditionIndex)} icon={IvyIcons.Trash} aria-label='Remove Condition' />
      </Flex>
      <Flex direction='row' gap={4} justifyContent='space-between' alignItems='center'>
        <BasicField label='FIELD'>
          <Input value={condition.field} />
        </BasicField>
        <BasicField label='OPERATOR'>
          <BasicSelect items={Operators} />
        </BasicField>
        <BasicField label='VALUE'>
          <Input value={condition.value} />
        </BasicField>
      </Flex>
    </Flex>
  );
};
