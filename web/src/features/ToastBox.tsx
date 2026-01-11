import { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import * as Chakra from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";
import { BiError } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { ToastIconType, useToastStore } from "@stores";

const ICON_SIZE: string = "28px"

interface IToastIconProps {
	type: ToastIconType;
}

const ToastIcon = (props: IToastIconProps) => {
	switch(props.type) {
		case ToastIconType.ERROR: return <MdErrorOutline size={ICON_SIZE} style={{color:"#ef4444"}}/>;
		case ToastIconType.WARNING: return <BiError size={ICON_SIZE} style={{color:"#eab308"}}/>;
		case ToastIconType.SUCCESS: return <MdDone size={ICON_SIZE} style={{color:"#22c55e"}}/>;
		case ToastIconType.INFORMATION: return <IoMdInformationCircleOutline size={ICON_SIZE} style={{color:"#3b82f6"}}/>;
	}
}

interface IToastProps {
	type: ToastIconType;
	children: ReactNode;
}

const Toast = (props: IToastProps) => {
	return (
		<Chakra.Card.Root mb="10px" mr="10px" px="10px">
			<Chakra.Box position="absolute" right="0" top="0" mt="5px" mr="5px"><IoMdClose size="20px"/></Chakra.Box>
			<Chakra.Flex alignItems="center">
				<ToastIcon type={props.type}/>
				<Chakra.Card.Body>
					{props.children}
				</Chakra.Card.Body>
			</Chakra.Flex>
		</Chakra.Card.Root>
	);
}

const ToastBox = () => {
	const container = document.querySelector("#toastbox");
	const { messages, append } = useToastStore();

	useEffect(() => {
		append({ type: ToastIconType.ERROR, message: "Fail" })
		append({ type: ToastIconType.WARNING, message: "Warning" })
		append({ type: ToastIconType.SUCCESS, message: "Success" })
		append({ type: ToastIconType.INFORMATION, message: "Information" })
	},[]);

	console.log(messages);

	if(container) {
		return (
			<>
				{createPortal(
					<>
						{messages.map((msg,index) => <Toast key={index} type={msg.type}>{msg.message}</Toast>)}
					</>,
					container
				)}
			</>
		);
	}
}

export default ToastBox;
