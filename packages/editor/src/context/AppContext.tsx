import { type RuleContext, type RuleData } from '@axonivy/rule-editor-protocol';

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
  data?: RuleData;
  context: RuleContext;
  setData: UpdateConsumer<RuleData>;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  history: ReturnType<typeof useHistoryData<RuleData>>;
  // validations: Array<ValidationResult>;
  detail: boolean;
  setDetail: (visible: boolean) => void;
  helpUrl: string;
};

export const AppContext = createContext<AppContext>({
  data: undefined,
  context: { app: '', project: '', file: '' },
  setData: data => data,
  selectedIndex: -1,
  setSelectedIndex: () => {},
  history: { push: () => {}, undo: () => {}, redo: () => {}, canUndo: false, canRedo: false },
  // validations: [],
  detail: true,
  setDetail: () => {},
  helpUrl: ''
});

export const AppProvider = AppContext.Provider;

export const useAppContext = () => {
  return use(AppContext);
};
