"use client";

import { Journal } from "@/components/journal/journal";

export default function Page({ params }: { params: { cuid: string } }) {
	return (
		<main>
			<Journal />
		</main>
	);
}
