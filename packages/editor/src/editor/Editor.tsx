// import { AppProvider } from '../context/AppContext';

import {
  Flex,
  PanelMessage,
  ResizableGroup,
  ResizableHandle,
  ResizablePanel,
  Spinner,
  useDefaultLayout,
  useHistoryData,
  useHotkeys,
  type Unary
} from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';

import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { type RuleContext } from '@axonivy/rule-editor-protocol';
import { useClient } from '../context/ClientContext';
import { useMemo } from 'react';
import { genQueryKey } from '../query/query-client';
import { AppProvider } from '../context/AppContext';
import { Main } from './main/Main';

export type RuleEditorProps = {
  context: RuleContext;
  directSave?: boolean;
};

export const Editor = ({ context, directSave }: RuleEditorProps) => {
  const { t } = useTranslation();

  const client = useClient();

  const queryKeys = useMemo(
    () => ({
      data: (context: RuleContext) => genQueryKey('data', context),
      saveData: (context: RuleContext) => genQueryKey('saveData', context),
      validation: (context: RuleContext) => genQueryKey('validations', context)
    }),
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isPending, isError, isSuccess, error } = useQuery({
    queryKey: queryKeys.data(context),
    queryFn: () => client.data(context),
    structuralSharing: false
  });

  if (isPending) {
    return (
      <Flex alignItems='center' justifyContent='center' className='size-full'>
        <Spinner />
      </Flex>
    );
  }
  if (isError) {
    return <PanelMessage icon={IvyIcons.ErrorXMark} message={t('common.message.errorOccurred', { message: error.message })} />;
  }
  if (data.data === undefined) {
    return <PanelMessage icon={IvyIcons.ErrorXMark} message={t('message.notFound')} />;
  }

  <AppProvider
    value={{
      data: data.data,
      context: data.context
    }}
  >
    <ResizableGroup orientation='horizontal'>
      <ResizablePanel id='rule-editor-main' defaultSize='50%' minSize='30%' className='bg-n75'>
        <Flex direction='column' className='h-full'>
          <Main />
        </Flex>
      </ResizablePanel>
    </ResizableGroup>
  </AppProvider>;
};
