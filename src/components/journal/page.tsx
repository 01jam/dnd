import { useJournal } from "@/hooks/useJournal";
import { FC } from "react";

export const Journal: FC = () => {
	const { data } = useJournal();

	return (
		<div>
			<h1>Journal</h1>
			{data.map((block, index) => (
				<div key={index}>{block["title"]}</div>
			))}
		</div>
	);
};
