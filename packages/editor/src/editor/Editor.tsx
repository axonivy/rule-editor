import { type RuleConfig, type RuleContext, type Rule } from '@axonivy/rule-editor-protocol';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useClient } from '../context/ClientContext';
import { genQueryKey } from '../query/query-client';
import { ErrorBoundary } from 'react-error-boundary';
import { Flex, Spinner, PanelMessage, ResizableGroup, ResizablePanel } from '@axonivy/ui-components';
import type { Unary } from '../types/types';
import { IvyIcons } from '@axonivy/ui-icons';
import { AppProvider } from '../context/AppContext';
import { Main } from './main/Main';
import { ErrorFallback } from './main/ErrorFallback';

export type RuleEditorProps = {
  context: RuleContext;
  directSave?: boolean;
};

export const Editor = ({ context }: RuleEditorProps) => {
  const { t } = useTranslation();
  const [initialData, setInitialData] = useState<RuleConfig | undefined>(undefined);
  const client = useClient();
  const queryClient = useQueryClient();

  const queryKeys = useMemo(
    () => ({
      data: (context: RuleContext) => genQueryKey('data', context),
      saveData: (context: RuleContext) => genQueryKey('saveData', context)
    }),
    []
  );

  const { data, isPending, isError, error } = useQuery({
    queryKey: queryKeys.data(context),
    queryFn: () => client.data(context),
    structuralSharing: false
  });

  useEffect(() => {
    const dataDispose = client.onDataChanged(() => queryClient.invalidateQueries({ queryKey: queryKeys.data(context) }));
    return () => {
      dataDispose.dispose();
    };
  }, [client, context, queryClient, queryKeys]);

  if (data?.data !== undefined && initialData === undefined) {
    setInitialData(data.data.config);
  }
  const mutation = useMutation({
    mutationKey: queryKeys.saveData(context),
    mutationFn: async (updateData: Unary<RuleConfig>) => {
      const saveData = queryClient.setQueryData<Rule>(queryKeys.data(context), prevData => {
        if (prevData) {
          return { ...prevData, data: updateData(prevData.config) };
        }
        return undefined;
      });
      if (saveData) {
        return client.saveData({ context, data: saveData });
      }
      return Promise.resolve();
    }
  });
  useEffect(() => {
    console.log('query state', { isPending, isError, data, error });
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
  if (data.data.config === undefined) {
    return <PanelMessage icon={IvyIcons.ErrorXMark} message={t('message.notFound')} />;
  }

  return (
    <AppProvider
      value={{
        data: data.data.config,
        context: data.context,
        setData: mutation.mutate
      }}
    >
      <ResizableGroup orientation='horizontal'>
        <ResizablePanel id='rule-editor-main' defaultSize='50%' minSize='30%' className='bg-n75'>
          <Flex direction='column' className='h-full'>
            <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[data]}>
              <Main />
              {/* {data.data.config.name} */}
            </ErrorBoundary>
          </Flex>
        </ResizablePanel>
      </ResizableGroup>
    </AppProvider>
  );
};
