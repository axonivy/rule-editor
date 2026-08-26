import { type Condition } from '@axonivy/rule-editor-protocol';
import { BasicField, Flex, Input } from '@axonivy/ui-components';

export const ConditionSet = ({ condition }: { condition: Condition }) => {
  return (
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
  );
};
