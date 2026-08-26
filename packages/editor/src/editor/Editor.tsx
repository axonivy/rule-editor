import { type RuleConfig, type RuleContext, type RuleEditorData } from '@axonivy/rule-editor-protocol';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useClient } from '../context/ClientContext';
import { genQueryKey } from '../query/query-client';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Flex,
  Spinner,
  PanelMessage,
  ResizableGroup,
  ResizablePanel,
  useHotkeys,
  useHistoryData,
  useDefaultLayout,
  ResizableHandle
} from '@axonivy/ui-components';
import type { Unary } from '../types/types';
import { IvyIcons } from '@axonivy/ui-icons';
import { AppProvider } from '../context/AppContext';
import { Main } from './main/Main';
import { ErrorFallback } from './main/ErrorFallback';
import { useKnownHotkeys } from '../utils/useKnownHotkeys';
import { RuleToolbar } from './main/RuleToolbar';

export type RuleEditorProps = {
  context: RuleContext;
  directSave?: boolean;
};

export const Editor = ({ context }: RuleEditorProps) => {
  const { t } = useTranslation();

  const [detail, setDetail] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const initialDataRef = useRef<RuleConfig | undefined>(undefined);
  const history = useHistoryData<RuleConfig>();
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({ groupId: 'rule-editor-resize', storage: localStorage });

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

  useEffect(() => {
    if (data?.data.config !== undefined && initialDataRef.current === undefined) {
      initialDataRef.current = data.data.config;
      history.push(data.data.config);
    }
  }, [data?.data.config, history]);

  const mutation = useMutation({
    mutationKey: queryKeys.saveData(context),
    mutationFn: async (updateData: Unary<RuleConfig>) => {
      const saveData = queryClient.setQueryData<RuleEditorData>(queryKeys.data(context), prevData => {
        if (prevData) {
          return { ...prevData, data: { ...prevData.data, config: updateData(prevData.data.config) } };
        }
        return undefined;
      });
      if (saveData) {
        return client.saveData({ context, data: saveData.data });
      }
      return Promise.resolve();
    }
  });

  const detailRef = useRef<HTMLDivElement>(null);
  const hotkeys = useKnownHotkeys();
  useHotkeys(
    hotkeys.focusInscription.hotkey,
    () => {
      setDetail(true);
      detailRef.current?.focus();
    },
    {
      scopes: ['global']
    }
  );

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
        setData: mutation.mutate,
        selectedIndex,
        setSelectedIndex,
        detail,
        setDetail,
        history,
        helpUrl: data.helpUrl
      }}
    >
      <ResizableGroup orientation='horizontal' defaultLayout={defaultLayout} onLayoutChanged={onLayoutChanged}>
        <ResizablePanel id='rule-editor-main' defaultSize='50%' minSize='30%' className='bg-n75'>
          <Flex direction='column' className='h-full'>
            <RuleToolbar />
            <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[data]}>
              <Main />
              {/* {data.data.config.name} */}
            </ErrorBoundary>
          </Flex>
        </ResizablePanel>
        {detail && (
          <>
            <ResizableHandle />
            <ResizablePanel id='rule-editor-detail' defaultSize='25%' minSize='20%'>
              <Flex direction='column' className='h-full'>
                {/* eslint-disable-next-line i18next/no-literal-string */}
                <h1>TEST SIDEBAR</h1>
                {/* <Sidebar ref={detailRef} /> */}
              </Flex>
            </ResizablePanel>
          </>
        )}
      </ResizableGroup>
    </AppProvider>
  );
};
