import { createPortal } from "react-dom";
import * as Chakra from "@chakra-ui/react";

const ToastBox = () => {
	const container = document.querySelector("#toastbox");

	if(container) {
		return (
			<>
				{createPortal(
					<Chakra.Heading>ToastBox</Chakra.Heading>,
					container
				)}
			</>
		);
	}
}

export default ToastBox;
