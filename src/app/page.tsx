"use client";

import { journalEntry, useJournal } from "@/hooks/useJournal";
import Link from "next/link";

export default function Home() {
	const { data, write } = useJournal();

	console.log(data);

	return (
		<main>
			<h1>Homepage</h1>
			{data.map((entry, index) => (
				<Link key={index} href={"/journal"}>
					{entry["title"]}
				</Link>
			))}
			<form
				onSubmit={(event) => {
					event.preventDefault();
					write([...data, journalEntry.parse({})]);
				}}>
				<button type='submit'>Add an entry</button>
			</form>
		</main>
	);
}
