import { Editor, type RuleEditorProps } from './editor/Editor';

function App(props: RuleEditorProps) {
  // const { t } = useTranslation();
  // return <h1 {...props}>{t('label')}</h1>;
  return <Editor {...props} />;
}

export default App;
