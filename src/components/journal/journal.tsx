import { useJournal } from "@/hooks/useJournal";
import { FC } from "react";
import { JournalEditor } from "../journalEditor/journalEditor";

export const Journal: FC = () => {
	const { data } = useJournal();

	return (
		<div className='journal'>
			{/* {data.map((block, index) => (
				<div key={index}>{block["title"]}</div>
			))} */}

			<JournalEditor />
		</div>
	);
};
