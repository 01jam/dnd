"use client";

import { FC, PropsWithChildren } from "react";

export const Modal: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='modal'>
			<div className='modal-content'>{children}</div>
		</div>
	);
};
