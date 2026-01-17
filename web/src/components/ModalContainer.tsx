import { ReactNode, useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import * as Chakra from "@chakra-ui/react";
import { TriggerCtx } from "@trigger";

interface IModalBackdropProps {
	onClick: () => void;
}

interface IModalContainerProps {
	children: ReactNode;
}

const Backdrop = (props: IModalBackdropProps) => {
	return (
		<Chakra.Box position="absolute" top="0" left="0" width="100%" height="100%" bg="black" opacity="0.5" onClick={props.onClick}/>
	);
}

const ModalContainer = (props: IModalContainerProps) => {
	const el = document.querySelector("#modal");
	const [shown,setShown] = useState<boolean>(false);
	const [trigger,setTrigger] = useContext(TriggerCtx)!; 

	useEffect(() => {
		if(!trigger.modal) return;
		setShown(true);
		el?.classList.remove("hidden");
		el?.classList.add("shown");
		setTrigger({vehicle:trigger.vehicle,reservation:trigger.reservation,employee:trigger.reservation,modal:false});
	},[trigger.modal]);

	if(el) return createPortal(
		shown ? <><Chakra.Box position="absolute" top="50%" left="50%" translate="-50% -50%" width="50%" bg="white" padding="10px 5px" borderRadius="10px" zIndex="6">{props.children}</Chakra.Box><Backdrop onClick={() => { setShown(false); el?.classList.remove("shown"); el?.classList.add("hidden"); }}/></> : <></>,
		el
	);
		
}

export default ModalContainer;
