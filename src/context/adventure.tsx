"use client";

import { JournalData, journalSchema } from "@/hooks/useJournal";
import { File } from "@/class/file";
import {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useRef,
	useState,
} from "react";
import { redirect, usePathname } from "next/navigation";

interface AdventureData {
	journal: JournalData;
}

interface AdventureContext {
	open: () => Promise<void>;
	directoryHandle: FileSystemDirectoryHandle;
	data: AdventureData;
	setData: Dispatch<SetStateAction<AdventureData>>;
}

export const adventureContext = createContext<AdventureContext>(undefined!);

export const AdventureProvider: FC<PropsWithChildren> = ({ children }) => {
	const pathname = usePathname();
	const adventureDirectoryHandle = useRef<FileSystemDirectoryHandle>();
	const [adventureData, setAdventureData] = useState<AdventureData>({
		journal: [],
	});

	const openAdventureFolder = async () => {
		try {
			const directoryHandle = await window.showDirectoryPicker({ mode: "readwrite" });
			adventureDirectoryHandle["current"] = directoryHandle;
			const journalFile = new File(adventureDirectoryHandle["current"], "journal", []);
			setAdventureData({ journal: journalSchema.parse(await journalFile.read()) });

			// for await (const [filename, fileHandle] of directoryHandle.entries()) {
			// 	if (fileHandle["kind"] === "file" && filename === "journal.json") {
			// 		journalFileHandle = fileHandle;
			// 	}
			// }

			// adventureDirectoryHandle["current"].getDirectoryHandle('', {create: true})
		} catch (e) {
			console.error(e);
		}
	};

	if (!adventureDirectoryHandle["current"]) {
		if (pathname !== "/") {
			redirect("/");
		}

		return <button onClick={openAdventureFolder}>Pick adventure folder</button>;
	}

	return (
		<adventureContext.Provider
			value={{
				directoryHandle: adventureDirectoryHandle["current"],
				open: openAdventureFolder,
				data: adventureData,
				setData: setAdventureData,
			}}>
			{children}
		</adventureContext.Provider>
	);
};
