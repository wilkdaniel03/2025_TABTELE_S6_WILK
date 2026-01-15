import * as Chakra from "@chakra-ui/react";
import AvatarImg from "@assets/avatar.png";

interface IAvatarProps {
	onClick?: () => void;
}

const Avatar = (props: IAvatarProps) => {
	return (
		<Chakra.Box width="100%" display="flex" justifyContent="end">
			<img onClick={props.onClick} style={{cursor:"pointer"}} width="48px" src={AvatarImg}/>
		</Chakra.Box>
	);
}

export default Avatar;
