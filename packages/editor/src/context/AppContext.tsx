import { type RuleContext, type RuleConfig } from '@axonivy/rule-editor-protocol';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // selectedElement?: string;
  // setSelectedElement: (element?: string) => void;
  // history: ReturnType<typeof useHistoryData<RuleData>>;
  // validations: Array<ValidationResult>;
  // helpUrl: string;
};

export const AppContext = createContext<AppContext>({
  data: { data: '', description: '', desicions: [], matchMode: 'FIRST', name: '' },
  context: { app: '', project: '', file: '' },
  setData: data => data
  // setSelectedElement: () => {},
  // history: { push: () => {}, undo: () => {}, redo: () => {}, canUndo: false, canRedo: false },
  // validations: [],
  // helpUrl: ''
});

export const AppProvider = AppContext.Provider;

export const useAppContext = (): AppContext => {
  const context = use(AppContext);
  return {
    ...context,
    setData: updateData => {
      context.setData(old => {
        const newData = updateData(old);
        return newData;
      });
    }
  };
};
