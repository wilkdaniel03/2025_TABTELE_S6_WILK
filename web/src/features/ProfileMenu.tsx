import { useState } from "react";
import { Avatar, Dropdown, DropdownItem } from "@components";
import * as Chakra from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"

const ProfileMenu = () => {
	const [shown,setShown] = useState<boolean>(false);
	const navigate = useNavigate();

	const signOut = () => {
		localStorage.removeItem("token");
		navigate("/auth");
	}

	return (
		<Chakra.Box marginLeft="25px" width="15%" position="relative">
			<Avatar onClick={() => setShown(!shown)}/>
			{shown ? <Dropdown><DropdownItem>Profile</DropdownItem><DropdownItem onClick={signOut}><span style={{color:"red"}}>Sign out</span></DropdownItem></Dropdown> : <></>}
		</Chakra.Box>
	);
}

export default ProfileMenu;
