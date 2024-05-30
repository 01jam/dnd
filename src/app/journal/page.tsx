"use client";

import { Journal } from "@/components/journal/journal";
import { redirect } from "next/navigation";

export default function Page() {
	return (
		<main>
			<Journal />
		</main>
	);
}
