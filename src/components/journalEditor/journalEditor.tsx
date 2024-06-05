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
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

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

export const JournalEditor: FC<{ body?: any }> = ({ body }) => {
	const { write } = useJournal();
	const [editorState, setEditorState] = useState<EditorState>();

	const save = () => {
		if (!editorState) {
			return;
		}

		const textContent = editorState.read(() => $getRoot().getTextContent());
		write([]);
	};

	return (
		<div className='editor'>
			<LexicalComposer initialConfig={initialConfig}>
				<PlainTextPlugin
					contentEditable={<ContentEditable />}
					placeholder={<div className='editor-placeholder'>Enter some text...</div>}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<OnChangePlugin onChange={setEditorState} />
				<HistoryPlugin />
				<AutoFocusPlugin />
			</LexicalComposer>
		</div>
	);
};
