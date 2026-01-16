import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useToastStore, ToastIconType } from "@stores";
import { TriggerCtx } from "@trigger";

export interface IWebsocket {
	ready: boolean;
	msg_rx: string;
}

const useWebsocket = () => {
	return useState<IWebsocket>({ready:false,msg_rx:""});
}

type UseWebsocketReturnType = ReturnType<typeof useWebsocket>;

export const WebsocketCtx = createContext<UseWebsocketReturnType | null>(null);

interface IWebsocketProviderProps {
	children: ReactNode;
}

export const WebsocketProvider = (props: IWebsocketProviderProps) => {
	const ws = useWebsocket();
	const [getWs,setWs] = ws;
	const { clear, append } = useToastStore();
	const [trigger,setTrigger] = useContext(TriggerCtx)!;

	useEffect(() => {
		const socket = new WebSocket("ws://bd.wilkdaniel.com:8083/user");

		socket.addEventListener("open",() => {
			setWs({ready:true,msg_rx:getWs.msg_rx});
			clear();
			append({type:ToastIconType.SUCCESS,message:"Connected with API gateway",fixed:true});
		});

		socket.addEventListener("error",() => {
			clear();
			append({type:ToastIconType.ERROR,message:"Failed to connect with API gateway",fixed:true});
		});

		socket.addEventListener("message",(event) => {
			setWs({ready:getWs.ready,msg_rx:event.data});
			const splitted = event.data.split(",");
			if(splitted[1] === "vehicle") {
				setTrigger({employee:trigger.employee,vehicle:!trigger.vehicle,reservation:trigger.reservation,modal:trigger.modal});
				append({type:ToastIconType.INFORMATION,message:"Fetching new data from vehicle",fixed:false});
			}
			else if(splitted[1] === "employee") {
				setTrigger({employee:!trigger.employee,vehicle:trigger.vehicle,reservation:trigger.reservation,modal:trigger.modal});
				append({type:ToastIconType.INFORMATION,message:"Fetching new data from employee",fixed:false});
			}
			else if(splitted[1] === "reservation") {
				setTrigger({employee:trigger.employee,vehicle:trigger.vehicle,reservation:!trigger.reservation,modal:trigger.modal});
				append({type:ToastIconType.INFORMATION,message:"Fetching new data from reservation",fixed:false});
			}
		});
	},[]);

	useEffect(() => {
		console.log(`Message from socket: ${getWs.msg_rx}`);
	},[getWs.msg_rx]);

	return (
		<WebsocketCtx.Provider value={ws}>
			{props.children}
		</WebsocketCtx.Provider>
	);
}
