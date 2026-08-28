/* eslint-disable i18next/no-literal-string */
import { type Action } from '@axonivy/rule-editor-protocol';
import { BasicInput, Button, Flex, Label } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';

export const ResultInput = ({
  result,
  resultIndex,
  onResultChange,
  onRemoveResult
}: {
  result: Action;
  resultIndex: number;
  onResultChange: (index: number, key: keyof Action, value: string) => void;
  onRemoveResult: (index: number) => void;
}) => {
  return (
    <Flex direction='column' gap={1} className='rounded-sm border border-solid border-n100 p-3'>
      <Flex direction='row' gap={4} justifyContent='space-between' alignItems='center'>
        <Label>{`Result ${resultIndex + 1}`}</Label>
        <Button onClick={() => onRemoveResult(resultIndex)} icon={IvyIcons.Trash} aria-label='Remove Result' />
      </Flex>
      <Flex direction='row' gap={4} alignItems='center'>
        <Flex style={{ flex: 10 }}>
          <BasicInput
            value={result.field}
            onChange={event => onResultChange(resultIndex, 'field', event.target.value)}
            style={{ width: '100%' }}
          />
        </Flex>
        <Flex style={{ flex: '0 0 auto' }} alignItems='center' justifyContent='center'>
          <Label>=</Label>
        </Flex>
        <Flex style={{ flex: 10 }}>
          <BasicInput
            value={result.value}
            onChange={event => onResultChange(resultIndex, 'value', event.target.value)}
            style={{ width: '100%' }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
