import { Editor, type RuleEditorProps } from './editor/Editor';

function App(props: RuleEditorProps) {
  // return <h1 {...props}>TEST</h1>;
  return <Editor {...props} />;
}

export default App;
