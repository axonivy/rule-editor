/* eslint-disable i18next/no-literal-string */
import type { Action, Decision } from '@axonivy/rule-editor-protocol';
import { Button, Flex } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { ResultInput } from './ResultInput';

export const ResultBuilder = ({ decision, onChange }: { decision: Decision; onChange: (results: Action[]) => void }) => {
  const addResult = () => {
    onChange([...decision.then, { field: '', value: '' }]);
  };

  const updateResult = (indexToUpdate: number, key: keyof Action, value: string) => {
    onChange(decision.then.map((result, index) => (index === indexToUpdate ? { ...result, [key]: value } : result)));
  };

  const removeResult = (indexToRemove: number) => {
    onChange(decision.then.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Flex direction='column' gap={4}>
      {decision.then.map((result, index) => (
        <ResultInput
          // eslint-disable-next-line @eslint-react/no-array-index-key
          key={`result-${index}`}
          result={result}
          resultIndex={index}
          onResultChange={updateResult}
          onRemoveResult={removeResult}
        />
      ))}
      <Button onClick={addResult} icon={IvyIcons.Plus} aria-label='Add Result' variant='outline'>
        Add Result
      </Button>
    </Flex>
  );
};
