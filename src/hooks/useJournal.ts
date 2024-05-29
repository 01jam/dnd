"use client";

import { adventureContext } from "@/context/adventure";
import { File } from "@/class/file";
import { TypeOf, z } from "zod";
import { useContext } from "react";

export const journalSchema = z.array(
	z.object({
		title: z.string(),
	})
);

export type JournalData = TypeOf<typeof journalSchema>;

export const useJournal = () => {
	const { data, setData, directoryHandle } = useContext(adventureContext);

	const read = async () => {
		const journalFile = new File(directoryHandle, "journal", []);
		const journal = await journalFile.read();
		setData((prevData) => ({ ...prevData, journal: journalSchema.parse({ journal }) }));
	};

	const write = async (data: JournalData) => {
		const journalFile = new File(directoryHandle, "journal", []);
		const journal = await journalFile.write(data);
		setData((prevData) => ({ ...prevData, journal }));
	};

	return { read, write, data: data["journal"] };
};
