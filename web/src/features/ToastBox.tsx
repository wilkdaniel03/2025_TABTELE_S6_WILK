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
		case ToastIconType.LOADING: return <Chakra.Spinner size="sm"/>;
	}
}

interface IToastProps {
	id: number;
	type: ToastIconType;
	children: ReactNode;
	fixed: boolean;
}

const Toast = (props: IToastProps) => {
	const { remove } = useToastStore();

	return (
		<Chakra.Card.Root mb="10px" mr="10px" px="10px">
			{!props.fixed ? <Chakra.Box onClick={() => remove(props.id)} _hover={{cursor:"pointer"}} position="absolute" right="0" top="0" mt="5px" mr="5px"><IoMdClose size="20px"/></Chakra.Box> : <></>}
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
	const { messages } = useToastStore();

	if(container) {
		return (
			<>
				{createPortal(
					<>
						{messages.map((msg,index) => <Toast key={index} id={msg.id} type={msg.type} fixed={msg.fixed}>{msg.message}</Toast>)}
					</>,
					container
				)}
			</>
		);
	}
}

export default ToastBox;
