import { type RuleContext, type RuleConfig } from '@axonivy/rule-editor-protocol';

import { useReadonly, type useHistoryData } from '@axonivy/ui-components';
import { createContext, use, useState } from 'react';

import type { UpdateConsumer } from '../types/types';

export type UI = {
  properties: boolean;
  helpPaddings: boolean;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
};

const DEFAULT_UI: UI = { properties: false, helpPaddings: true, deviceMode: 'desktop' };

export const useUiState = () => {
  const readonly = useReadonly();
  const [ui, setUi] = useState<UI>(readonly ? { ...DEFAULT_UI, helpPaddings: false } : DEFAULT_UI);
  return { ui, setUi };
};

export type AppContext = {
  data: RuleConfig;
  context: RuleContext;
  setData: UpdateConsumer<RuleConfig>;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  detail: boolean;
  setDetail: (visible: boolean) => void;
  history: ReturnType<typeof useHistoryData<RuleConfig>>;
  helpUrl: string;
};

export const AppContext = createContext<AppContext>({
  data: { data: '', description: '', decisions: [], matchMode: 'FIRST', name: '' },
  context: { app: '', project: '', file: '' },
  setData: data => data,
  selectedIndex: -1,
  setSelectedIndex: () => {},
  detail: true,
  setDetail: () => {},
  history: { push: () => {}, undo: () => {}, redo: () => {}, canUndo: false, canRedo: false },
  helpUrl: ''
});

export const AppProvider = AppContext.Provider;

export const useAppContext = (): AppContext & { setUnhistoriedVariables: UpdateConsumer<RuleConfig> } => {
  const context = use(AppContext);
  return {
    ...context,
    setData: updateData => {
      context.setData(old => {
        const newData = updateData(old);
        context.history.push(newData);
        return newData;
      });
    },
    setUnhistoriedVariables: context.setData
  };
};
