"use client";

import { Journal } from "@/components/journal/journal";
import { Modal } from "@/components/modal/modal";

export default function Page({ params }: { params: { cuid: string } }) {
	return (
		<Modal>
			<Journal cuid={params["cuid"]} />
		</Modal>
	);
}
