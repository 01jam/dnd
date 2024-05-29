"use client";

import Link from "next/link";

export default function Home() {
	return (
		<main>
			<h1>Homepage</h1>
			<Link href={"/journal"}>Journal</Link>
		</main>
	);
}
