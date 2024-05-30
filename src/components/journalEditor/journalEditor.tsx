import { $getRoot, EditorState } from "lexical";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { FC, useEffect, useState } from "react";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useJournal } from "@/hooks/useJournal";

const theme = {
	ltr: "ltr",
	rtl: "rtl",
	paragraph: "editor-paragraph",
};

const initialConfig = {
	namespace: "JournalEditor",
	theme,
	onError: console.error,
};

const OnchangePlugin: FC<{ onChange: (editorState: EditorState) => void }> = ({ onChange }) => {
	const [editor] = useLexicalComposerContext();
	useEffect(() => {
		return editor.registerUpdateListener(({ editorState }) => {
			onChange(editorState);
		});
	}, [editor, onChange]);
	return null;
};

export const JournalEditor: FC = () => {
	const { write } = useJournal();
	const [editorState, setEditorState] = useState<EditorState>();

	useEffect(() => {
		console.log();
	}, [editorState]);

	const save = () => {
		if (!editorState) {
			return;
		}

		const textContent = editorState.read(() => $getRoot().getTextContent());
		write([{ title: "", body: textContent }]);
	};

	return (
		<div className='editor'>
			<LexicalComposer initialConfig={initialConfig}>
				<PlainTextPlugin
					contentEditable={<ContentEditable />}
					placeholder={<div className='editor-placeholder'>Enter some text...</div>}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<OnchangePlugin onChange={setEditorState} />
				<HistoryPlugin />
				<AutoFocusPlugin />
			</LexicalComposer>
			<button onClick={save}>Save</button>
		</div>
	);
};
