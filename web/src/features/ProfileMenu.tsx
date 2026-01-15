import { useState } from "react";
import { Avatar, Dropdown, DropdownItem } from "@components";
import * as Chakra from "@chakra-ui/react";

const ProfileMenu = () => {
	const [shown,setShown] = useState<boolean>(false);
	return (
		<Chakra.Box marginLeft="25px" width="15%" position="relative">
			<Avatar onClick={() => setShown(!shown)}/>
			{/* <span style={{display:"block",visibility:"hidden",height:"10px"}}/> */}
			{shown ? <Dropdown><DropdownItem>Profile</DropdownItem><DropdownItem><span style={{color:"red"}}>Sign out</span></DropdownItem></Dropdown> : <></>}
		</Chakra.Box>
	);
}

export default ProfileMenu;
