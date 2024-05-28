"use client";

import { useJournal } from "@/hooks/useJournal";

export default function Home() {
	const { data } = useJournal();

	return (
		<main>
			<h1>Journal</h1>
			{data.map((block, index) => (
				<div key={index}>{block["title"]}</div>
			))}
		</main>
	);
}
