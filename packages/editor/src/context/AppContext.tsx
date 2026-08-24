import { type RuleContext, type RuleData, type ValidationResult } from '@axonivy/rule-editor-protocol';
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
  data: RuleData;
  setData: UpdateConsumer<RuleData>;
  selectedElement?: string;
  setSelectedElement: (element?: string) => void;
  context: RuleContext;
  history: ReturnType<typeof useHistoryData<RuleData>>;
  validations: Array<ValidationResult>;
  helpUrl: string;
};

export const AppContext = createContext<AppContext>({
  data: {},
  setData: data => data,
  setSelectedElement: () => {},
  context: { app: '', pmv: '', file: '' },
  history: { push: () => {}, undo: () => {}, redo: () => {}, canUndo: false, canRedo: false },
  validations: [],
  helpUrl: ''
});

export const AppProvider = AppContext.Provider;

export const useAppContext = () => {
  return use(AppContext);
};
