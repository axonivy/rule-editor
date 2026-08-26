import { BasicField, Flex, Input, PanelMessage } from '@axonivy/ui-components';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
export const SidebarContent = () => {
  const { t } = useTranslation();
  const { data, setData, selectedIndex } = useAppContext();

  const decisions = useMemo(() => data?.decisions ?? [], [data]);
  //   const decisions = data.decisions ?? [];

  const rule = useMemo(() => decisions[selectedIndex], [decisions, selectedIndex]);
  //   const rule = decisions[selectedIndex];

  if (rule === undefined) {
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

  return (
    <Flex direction='column' gap={4} className='min-h-0 overflow-auto p-3'>
      <BasicField label={t('common.label.name')}>
        <Input value={rule.name} onChange={event => updateName(event.target.value)} />
      </BasicField>
    </Flex>
  );
};
