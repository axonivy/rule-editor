/* eslint-disable i18next/no-literal-string */
import type { Decision } from '@axonivy/rule-editor-protocol';
import { Button, Flex } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { ConditionInput } from './ConditionInput';

export const ConditionBuilder = ({ rule }: { rule: Decision }) => {
  const condition = rule.when[0];

  return (
    <Flex direction='column' gap={2}>
      {condition && (
        <>
          <ConditionInput condition={condition} />
        </>
      )}
      <Button onClick={() => console.log('Adding a condition')} icon={IvyIcons.Plus} aria-label='Add Condition' variant='outline'>
        Add Condition
      </Button>
    </Flex>
  );
};
