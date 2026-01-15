import { ReactNode } from "react";
import * as Chakra from "@chakra-ui/react";

interface IDropdownItemProps {
	children: ReactNode;
}

const DropdownItem = (props: IDropdownItemProps) => {
	return (
		<Chakra.Text width="100%" paddingX="15px" _hover={{bg:"gray.200",cursor:"pointer"}}>{props.children}</Chakra.Text>
	);
}

export default DropdownItem;
