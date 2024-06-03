"use client";

import { adventureContext } from "@/context/adventure";
import { File } from "@/class/file";
import { TypeOf, z } from "zod";
import { useContext } from "react";
import { createId } from "@paralleldrive/cuid2";

export const journalEntry = z.object({
	created: z.string().default(new Date().toISOString()),
	updated: z.string().default(new Date().toISOString()),
	cuid: z.string().default(createId()),
	title: z.string().default(""), // TODO generatore di titoli epici
	done: z.boolean().default(false),
	types: z
		.array(z.union([z.literal("main"), z.literal("side"), z.literal("mandatory")]))
		.default([]),
	tags: z
		.array(
			z.union([
				z.literal("venue"),
				z.literal("npc"),
				z.literal("pc"),
				z.literal("event"),
				z.literal("treasure"),
				z.literal("weapon"),
				z.literal("manufact"),
				z.literal("quest"),
			])
		)
		.default([]), // TODO l'utente dovrà poterne aggiungere altri
	body: z.any().default({}),
});

export const journalSchema = z.array(journalEntry);

export type JournalEntry = TypeOf<typeof journalEntry>;
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
