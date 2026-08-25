import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Flex,
  Spinner,
  PanelMessage,
  ResizableGroup,
  ResizablePanel,
  useDefaultLayout,
  useHistoryData,
  useHotkeys,
  type Unary
} from '@axonivy/ui-components';

import { type RuleContext, type Decision, type RuleData, type RuleEditorData } from '@axonivy/rule-editor-protocol';
import { AppProvider } from '../context/AppContext';
import { useClient } from '../context/ClientContext';
import { genQueryKey } from '../query/query-client';
import { IvyIcons } from '@axonivy/ui-icons';
import { useKnownHotkeys } from '../utils/useKnownHotkeys';
import { Main } from './main/Main';

export type RuleEditorProps = {
  context: RuleContext;
  directSave?: boolean;
};

export const Editor = ({ context, directSave }: RuleEditorProps) => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [detail, setDetail] = useState(true);
  const [initialData, setInitialData] = useState<Array<Decision> | undefined>(undefined);
  const history = useHistoryData<RuleData>();
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({ groupId: 'role-editor-resize', storage: localStorage });

  const client = useClient();
  const queryClient = useQueryClient();

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

  useEffect(() => {
    const dataDispose = client.onDataChanged(() => queryClient.invalidateQueries({ queryKey: queryKeys.data(context) }));
    return () => {
      dataDispose.dispose();
    };
  }, [client, context, queryClient, queryKeys]);

  if (data?.data !== undefined && initialData === undefined) {
    setInitialData(data.data.decisions);
    history.push(data.data);
  }

  const mutation = useMutation({
    mutationKey: queryKeys.saveData(context),
    mutationFn: async (updateData: Unary<RuleData>) => {
      const saveData = queryClient.setQueryData<RuleEditorData>(queryKeys.data(context), prevData => {
        if (prevData) {
          return { ...prevData, data: updateData(prevData.data) };
        }
        return undefined;
      });
      if (saveData) {
        return client.saveData({ context, data: saveData.data, directSave: directSave ?? false });
      }
      return Promise.resolve();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.validation(context) })
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
  if (data.data === undefined) {
    return <PanelMessage icon={IvyIcons.ErrorXMark} message={t('message.notFound')} />;
  }

  return (
    <AppProvider
      value={{
        data: data.data,
        context: data.context,
        setData: mutation.mutate,
        selectedIndex,
        setSelectedIndex,
        history,
        detail,
        setDetail,
        helpUrl: data.helpUrl
      }}
    >
      <ResizableGroup orientation='horizontal' defaultLayout={defaultLayout} onLayoutChanged={onLayoutChanged}>
        <ResizablePanel id='rule-editor-main' defaultSize='50%' minSize='30%' className='bg-n75'>
          <Flex direction='column' className='h-full'>
            <Main />
          </Flex>
        </ResizablePanel>
      </ResizableGroup>
    </AppProvider>
  );
};
