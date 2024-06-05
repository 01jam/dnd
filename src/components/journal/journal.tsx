import { FC, useState } from "react";
import { getDefaultJournalEntry, useJournal } from "@/hooks/useJournal";
import { JournalEditor } from "../journalEditor/journalEditor";
import { redirect, useRouter } from "next/navigation";

export const Journal: FC<{ cuid?: string }> = ({ cuid }) => {
	const router = useRouter();
	const { data, write } = useJournal();
	const [edited, setEdited] = useState(
		cuid ? data.find((entry) => entry["cuid"] === cuid)! : getDefaultJournalEntry()
	);

	if (!edited) {
		redirect("/");
	}

	return (
		<div className='journal-editor'>
			<input
				onChange={(event) => setEdited((prev) => ({ ...prev, title: event["target"]["value"] }))}
				value={edited["title"]}
				type='text'
				name='title'
				placeholder='Title'
			/>
			<input type='checkbox' name='done' />
			<div>
				<input type='text' name='types' placeholder='Types' />
				<input type='text' name='tags' placeholder='Tags' />
			</div>
			<JournalEditor />
			<button
				onClick={async (event) => {
					if (cuid) {
						await write(
							data.map((entry) => {
								if (entry["cuid"] === cuid) {
									return edited;
								}

								return entry;
							})
						);
						return;
					}
					await write([...data, edited]);
					router.push(`/journal/${edited["cuid"]}`);
				}}>
				Save
			</button>
		</div>
	);
};
