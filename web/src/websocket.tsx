import { useState, useEffect, createContext, ReactNode } from "react";

export interface IWebsocket {
	ready: boolean;
	msg_tx: string;
	msg_rx: string;
}

const useWebsocket = () => {
	return useState<IWebsocket>({ready:false,msg_tx:"",msg_rx:""});
}

type UseWebsocketReturnType = ReturnType<typeof useWebsocket>;

export const WebsocketCtx = createContext<UseWebsocketReturnType | null>(null);

interface IWebsocketProviderProps {
	children: ReactNode;
}

export const WebsocketProvider = (props: IWebsocketProviderProps) => {
	const ws = useWebsocket();

	useEffect(() => {
		if(ws[0].msg_tx.length == 0)
			console.log("Empty TX");
		else
			console.log(`Sending ${ws[0].msg_tx}...`);
	},[ws[0]]);

	return (
		<WebsocketCtx.Provider value={ws}>
			{props.children}
		</WebsocketCtx.Provider>
	);
}
