/* eslint-disable i18next/no-literal-string */
import type { RuleConfig, RuleContext } from '@axonivy/rule-editor-protocol';
import { BasicField, Collapsible, CollapsibleContent, CollapsibleTrigger, Flex, Input } from '@axonivy/ui-components';
import { useTranslation } from 'react-i18next';

export const RuleOverview = ({ data, context }: { data: RuleConfig; context: RuleContext }) => {
  const { t } = useTranslation();

  return (
    <Flex direction='column' gap={4} className='min-h-0 overflow-auto p-3'>
      <Collapsible defaultOpen={true}>
        <CollapsibleTrigger>General</CollapsibleTrigger>
        <CollapsibleContent>
          <Flex direction='column' gap={4} className='min-h-0 overflow-auto p-3'>
            <BasicField label={t('common.label.nameRuleFile')}>
              <Input value={context.file} readOnly />
            </BasicField>
          </Flex>
          <Flex direction='column' gap={4} className='min-h-0 overflow-auto p-3'>
            <BasicField label={t('common.label.nameRuleDataClass')}>
              <Input value={data.data} />
            </BasicField>
          </Flex>
        </CollapsibleContent>
      </Collapsible>
    </Flex>
  );
};
