import type { RuleContext } from '@axonivy/rule-editor-protocol';
import { useTranslation } from 'react-i18next';

type RuleEditorProps = {
  context: RuleContext;
  directSave?: boolean;
};

function App(props: RuleEditorProps) {
  const { t } = useTranslation();
  return <h1 {...props}>{t('label')}</h1>;
}

export default App;
