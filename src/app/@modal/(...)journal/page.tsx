"use client";

import { Journal } from "@/components/journal/page";
import { Modal } from "@/components/modal";

export default function Page() {
	return (
		<Modal>
			<Journal />
		</Modal>
	);
}
