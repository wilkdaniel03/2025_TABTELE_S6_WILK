import { ReactNode } from "react";
import { createPortal } from "react-dom";
import * as Chakra from "@chakra-ui/react";
import { MdErrorOutline } from "react-icons/md";
import { BiError } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";

enum ToastIconType {
	ERROR = 0,
	WARNING = 1,
	SUCCESS = 2,
	INFORMATION = 3,
}

interface IToastIconProps {
	type: ToastIconType;
}

const ToastIcon = (props: IToastIconProps) => {
	switch(props.type) {
		case ToastIconType.ERROR: return <MdErrorOutline style={{color:"#ef4444"}}/>;
		case ToastIconType.WARNING: return <BiError style={{color:"#eab308"}}/>;
		case ToastIconType.SUCCESS: return <MdDone style={{color:"#22c55e"}}/>;
		case ToastIconType.INFORMATION: return <IoMdInformationCircleOutline style={{color:"#3b82f6"}}/>;
	}
}

interface IToastProps {
	type: ToastIconType;
	children: ReactNode;
}

const Toast = (props: IToastProps) => {
	return (
		<Chakra.Card.Root mb="10px" mr="10px">
			<Chakra.Card.Body>
				<ToastIcon type={props.type}/>
				{props.children}
			</Chakra.Card.Body>
		</Chakra.Card.Root>
	);
}

const ToastBox = () => {
	const container = document.querySelector("#toastbox");

	if(container) {
		return (
			<>
				{createPortal(
					<><Toast type={0}>a</Toast><Toast type={1}>b</Toast><Toast type={2}>c</Toast><Toast type={3}>d</Toast></>,
					container
				)}
			</>
		);
	}
}

export default ToastBox;
