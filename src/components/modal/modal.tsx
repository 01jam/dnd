"use client";

import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";

export const Modal: FC<PropsWithChildren> = ({ children }) => {
	const router = useRouter();
	return (
		<div className='modal' onClick={() => router.back()}>
			<div
				className='modal-content'
				onClick={(e) => {
					e.stopPropagation();
				}}>
				{children}
			</div>
		</div>
	);
};
