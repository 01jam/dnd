"use client";

import { adventureContext } from "@/context/adventure";
import { TypeOf, z } from "zod";
import { useContext } from "react";

export const journalSchema = z.array(
	z.object({
		title: z.string(),
	})
);

export type Journal = TypeOf<typeof journalSchema>;

export const useJournal = () => {
	const { data, setData, directoryHandle } = useContext(adventureContext);

	const write = async (journal: Journal) => {
		const journalFileHandle = await directoryHandle.getFileHandle("journal.json", {
			create: true,
		});
		const journalFileWritable = await journalFileHandle.createWritable();
		await journalFileWritable.write(JSON.stringify(journal));
		await journalFileWritable.close();
		setData((data) => ({ ...data, journal }));
	};

	return { write, data: data["journal"] };
};
