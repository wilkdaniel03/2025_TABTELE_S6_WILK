import { ReactNode } from "react";
import * as Chakra from "@chakra-ui/react";

interface IDropdownProps {
	children: ReactNode;
}

const Dropdown = (props: IDropdownProps) => {
	return (
		<Chakra.Card.Root position="absolute" marginTop="10px" right="0" width="50%" borderWidth="2px">
			<Chakra.Card.Body paddingX="0" paddingY="20px">
				{props.children}
			</Chakra.Card.Body>
		</Chakra.Card.Root>
	);
}

export default Dropdown;
