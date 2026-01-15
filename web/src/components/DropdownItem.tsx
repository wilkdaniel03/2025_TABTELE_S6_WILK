import { ReactNode } from "react";
import * as Chakra from "@chakra-ui/react";

interface IDropdownItemProps {
	children: ReactNode;
	onClick?: () => void;
}

const DropdownItem = (props: IDropdownItemProps) => {
	return (
		<Chakra.Text onClick={props.onClick} display="block" width="100%" paddingX="15px" _hover={{bg:"gray.200",cursor:"pointer"}}>{props.children}</Chakra.Text>
	);
}

export default DropdownItem;
