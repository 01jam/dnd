"use client";

import { Journal } from "@/components/journal/journal";
import { Modal } from "@/components/modal/modal";

export default function Page() {
	return (
		<Modal>
			<Journal />
		</Modal>
	);
}
