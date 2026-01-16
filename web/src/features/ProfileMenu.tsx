import { useState, useContext } from "react";
import { Avatar, Dropdown, DropdownItem } from "@components";
import * as Chakra from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"
import { TriggerCtx } from "@trigger";

const ProfileMenu = () => {
	const [shown,setShown] = useState<boolean>(false);
	const navigate = useNavigate();
	const [trigger,setTrigger] = useContext(TriggerCtx)!;

	const signOut = () => {
		localStorage.removeItem("token");
		navigate("/auth");
	}

	return (
		<Chakra.Box marginLeft="25px" width="15%" position="relative">
			<Avatar onClick={() => setShown(!shown)}/>
			{shown ? <Dropdown><DropdownItem onClick={() => { setTrigger({employee:trigger.employee,modal:true,reservation:trigger.reservation,vehicle:trigger.vehicle}); setShown(false) }}>Profile</DropdownItem><DropdownItem onClick={() => { signOut(); setShown(false); }}><span style={{color:"red"}}>Sign out</span></DropdownItem></Dropdown> : <></>}
		</Chakra.Box>
	);
}

export default ProfileMenu;
