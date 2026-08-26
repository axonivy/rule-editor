/* eslint-disable i18next/no-literal-string */
import { type Condition } from '@axonivy/rule-editor-protocol';
import { BasicField, Button, Flex, Input, Label } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
export const ConditionInput = ({ condition, conditionIndex }: { condition: Condition; conditionIndex: number }) => {
  return (
    <Flex direction='column' gap={2} style={{ border: '1px solid white', borderRadius: '12px', padding: '12px' }}>
      <Flex direction='row' gap={4} justifyContent='space-between' alignItems='center'>
        <Label>{`Condition ${conditionIndex + 1}`}</Label>
        <Button onClick={() => console.log('Remove Condition')} icon={IvyIcons.Trash} aria-label='Remove Condition' />
      </Flex>
      <Flex direction='row' gap={4} justifyContent='space-between' alignItems='center'>
        <BasicField label='FIELD'>
          <Input value={condition.field} />
        </BasicField>
        <BasicField label='OPERATOR'>
          <Input value={condition.operator} />
        </BasicField>
        <BasicField label='VALUE'>
          <Input value={condition.value} />
        </BasicField>
      </Flex>
    </Flex>
  );
};
