/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type RuleContext, type RuleConfig } from '@axonivy/rule-editor-protocol';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, type RenderHookOptions } from '@testing-library/react';
import i18n from 'i18next';
import { type ReactNode } from 'react';
import { initReactI18next } from 'react-i18next';
import { AppProvider } from '../context/AppContext';
import { ClientContextProvider, type ClientContext } from '../context/ClientContext';
import enMessages from '../translation/rule-editor/en.json';

type ContextHelperProps = {
  appContext?: {
    context?: RuleContext;
    data?: RuleConfig;
    setData?: (data: RuleConfig) => void;
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
  const data = appContext?.data ?? ({} as RuleConfig);
  const client: ClientContext = {
    // @ts-ignore
    client: {}
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
            setData: appContext?.setData ? getData => appContext.setData(getData(data)) : () => {}
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
