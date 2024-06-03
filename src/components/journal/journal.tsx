import { useJournal } from "@/hooks/useJournal";
import { FC } from "react";
import { JournalEditor } from "../journalEditor/journalEditor";

export const Journal: FC = () => {
	const { data } = useJournal();

	return (
		<div className='journal'>
			<input type='text' name='title' placeholder='Title' />
			<input type='checkbox' name='done' />
			<div>
				<input type='text' name='types' placeholder='Types' />
				<input type='text' name='tags' placeholder='Tags' />
			</div>
			<JournalEditor />
		</div>
	);
};
