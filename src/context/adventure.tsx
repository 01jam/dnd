"use client";

import { Journal, journalSchema } from "@/hooks/useJournal";
import {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useRef,
	useState,
} from "react";

interface AdventureData {
	journal: Journal;
}

interface AdventureContext {
	open: () => Promise<void>;
	directoryHandle: FileSystemDirectoryHandle;
	data: AdventureData;
	setData: Dispatch<SetStateAction<AdventureData>>;
}

export const adventureContext = createContext<AdventureContext>(undefined!);

export const AdventureProvider: FC<PropsWithChildren> = ({ children }) => {
	const adventureDirectoryHandle = useRef<FileSystemDirectoryHandle>();
	const [adventureData, setAdventureData] = useState<AdventureData>({
		journal: [],
	});

	const openAdventureFolder = async () => {
		try {
			const directoryHandle = await window.showDirectoryPicker({ mode: "readwrite" });
			adventureDirectoryHandle["current"] = directoryHandle;
			const journalFileHandle = await directoryHandle.getFileHandle("journal.json", {
				create: true,
			});
			const journalFile = await journalFileHandle.getFile();
			const journalFileContent = await journalFile.text();
			const journalData = journalSchema.parse(JSON.parse(journalFileContent));

			setAdventureData({ journal: journalData });

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
