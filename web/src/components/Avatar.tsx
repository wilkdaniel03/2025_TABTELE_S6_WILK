import * as Chakra from "@chakra-ui/react";
import AvatarImg from "@assets/avatar.png";

const Avatar = () => {
	return (
		<Chakra.Box>
			<img width="48px" src={AvatarImg}/>
		</Chakra.Box>
	);
}

export default Avatar;
