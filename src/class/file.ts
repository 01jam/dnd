export class File {
	constructor(
		private parentHandle: FileSystemDirectoryHandle,
		private filename: string,
		private fallbackData: any = undefined
	) {}

	async getHandle() {
		return await this.parentHandle.getFileHandle(this.filename, {
			create: true,
		});
	}

	async read() {
		try {
			const fileHandle = await this.getHandle();
			const file = await fileHandle.getFile();
			const fileContent = await file.text();
			return JSON.parse(fileContent);
		} catch (e) {
			this.write(this.fallbackData);
			return this.fallbackData;
		}
	}

	async write<T>(data: T) {
		const fileHandle = await this.getHandle();
		const fileWritable = await fileHandle.createWritable();
		await fileWritable.write(JSON.stringify(data));
		await fileWritable.close();
		return data;
	}

	debug() {}
}
