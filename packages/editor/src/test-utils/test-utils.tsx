/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type RuleContext, type RuleData, type RuleMetaRequestTypes, type ValidationResult } from '@axonivy/rule-editor-protocol';
import { type useHistoryData } from '@axonivy/ui-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, type RenderHookOptions } from '@testing-library/react';
import i18n from 'i18next';
import { type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { initReactI18next } from 'react-i18next';
import { AppProvider } from '../context/AppContext';
import { ClientContextProvider, type ClientContext } from '../context/ClientContext';
import enMessages from '../translation/rule-editor/en.json';

type ContextHelperProps = {
  appContext?: {
    context?: RuleContext;
    data?: RuleData;
    setData?: (data: RuleData) => void;
    selectedElement?: string;
    setSelectedElement?: Dispatch<SetStateAction<string | undefined>>;
    history?: ReturnType<typeof useHistoryData<RuleData>>;
    validations?: Array<ValidationResult>;
    helpUrl?: string;
  };
};

const initTranslation = () => {
  if (i18n.isInitializing || i18n.isInitialized) return;
  i18n.use(initReactI18next).init({
    supportedLngs: ['en'],
    fallbackLng: 'en',
    ns: ['rule-editor'],
    defaultNS: 'rule-editor',
    resources: {
      en: { 'rule-editor': enMessages }
    }
  });
};

const ContextHelper = ({ appContext, children }: ContextHelperProps & { children: ReactNode }) => {
  const data = appContext?.data ?? ({} as RuleData);
  const client: ClientContext = {
    // @ts-ignore
    client: {
      meta<TMeta extends keyof RuleMetaRequestTypes>(path: TMeta): Promise<RuleMetaRequestTypes[TMeta][1]> {
        switch (path) {
          default:
            throw Error('mock meta path not programmed');
        }
      }
    }
  };
  const queryClient = new QueryClient();
  initTranslation();
  return (
    <ClientContextProvider client={client.client}>
      <QueryClientProvider client={queryClient}>
        <AppProvider
          value={{
            context: appContext?.context ?? ({ file: '' } as RuleContext),
            data,
            // @ts-ignore
            setData: appContext?.setData ? getData => appContext.setData(getData(data)) : () => {},
            selectedElement: appContext?.selectedElement,
            setSelectedElement: appContext?.setSelectedElement ?? (() => {}),
            history: { push: () => {}, undo: () => {}, redo: () => {}, canUndo: false, canRedo: false },
            validations: [],
            helpUrl: appContext?.helpUrl ?? ''
          }}
        >
          {children}
        </AppProvider>
      </QueryClientProvider>
    </ClientContextProvider>
  );
};

export const customRenderHook = <Result, Props>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props> & { wrapperProps: ContextHelperProps }
) => {
  return renderHook(render, {
    wrapper: props => <ContextHelper {...props} {...options?.wrapperProps} />,
    ...options
  });
};
