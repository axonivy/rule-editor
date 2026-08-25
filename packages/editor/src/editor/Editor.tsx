// import { useTranslation } from 'react-i18next';
import { type RuleContext } from '@axonivy/rule-editor-protocol';
// import { AppProvider } from '../context/AppContext';
import { useClient } from '../context/ClientContext';

export type RuleEditorProps = {
  context: RuleContext;
  directSave?: boolean;
};

export const Editor = ({ context, directSave }: RuleEditorProps) => {
  //   const { t } = useTranslation();
  console.log('Editor context', context);
  console.log('Editor directSave', directSave);

  const client = useClient();
  const data = client.data();
};
