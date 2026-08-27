/* eslint-disable i18next/no-literal-string */
import type { Condition } from '@axonivy/rule-editor-protocol';
import { BasicField, Collapsible, CollapsibleContent, CollapsibleTrigger, Flex, Input, PanelMessage } from '@axonivy/ui-components';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { ConditionBuilder } from './components/ConditionBuilder';

export const SidebarContent = () => {
  const { t } = useTranslation();
  const { data, setData, selectedIndex } = useAppContext();

  const decisions = useMemo(() => data?.decisions ?? [], [data]);

  const decision = useMemo(() => decisions[selectedIndex], [decisions, selectedIndex]);

  if (decision === undefined) {
    return <PanelMessage message={t('label.noRuleSelected')} />;
  }

  const updateName = (name: string) => {
    setData(old => {
      if (!old.decisions[selectedIndex]) {
        return old;
      }
      const decisions = [...old.decisions];
      decisions[selectedIndex] = { ...old.decisions[selectedIndex], name };
      return { ...old, decisions };
    });
  };

  const updateConditions = (conditions: Condition[]) => {
    setData(old => {
      if (!old.decisions[selectedIndex]) {
        return old;
      }
      const decisions = [...old.decisions];
      decisions[selectedIndex] = { ...old.decisions[selectedIndex], when: conditions };
      return { ...old, decisions };
    });
  };

  return (
    <Flex direction='column' gap={4} className='min-h-0 overflow-auto p-3'>
      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger>General</CollapsibleTrigger>
        <CollapsibleContent>
          <Flex direction='column' gap={4} className='min-h-0 overflow-auto p-3'>
            <BasicField label={t('common.label.name')}>
              <Input value={decision.name} onChange={event => updateName(event.target.value)} />
            </BasicField>
          </Flex>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger>When</CollapsibleTrigger>
        <CollapsibleContent>
          <ConditionBuilder decision={decision} onChange={updateConditions} />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger>Then</CollapsibleTrigger>
      </Collapsible>
    </Flex>
  );
};
