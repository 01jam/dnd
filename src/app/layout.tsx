import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import "reactflow/dist/style.css";

import { AdventureProvider } from "@/context/adventure";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter["className"]}>
				<AdventureProvider>
					{children}
					{modal}
				</AdventureProvider>
			</body>
		</html>
	);
}
