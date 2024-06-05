"use client";

import { getDefaultJournalEntry, useJournal } from "@/hooks/useJournal";
import Link from "next/link";

export default function Home() {
	const { data, write } = useJournal();

	console.log(data);

	return (
		<main>
			<h1>Homepage</h1>
			<button
				onClick={() => {
					write([]);
				}}>
				Clear
			</button>
			<div className='journal'>
				{data.map((entry, index) => (
					<Link key={index} href={`/journal/${entry["cuid"]}`}>
						<div className='journal-entry'>{entry["title"]}</div>
					</Link>
				))}
			</div>
			<Link href={"/journal"}>
				<button>Add an entry</button>
			</Link>
		</main>
	);
}
