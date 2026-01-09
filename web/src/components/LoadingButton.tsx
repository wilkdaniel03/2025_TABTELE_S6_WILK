import { ReactNode, useState } from "react";
import * as Chakra from "@chakra-ui/react";

interface LoadingButtonProps {
	color: string;
	children: ReactNode;
}

export enum LoadingButtonState {
	INACTIVE = 1,
	LOADING = 2
}

const handleClick = (current: LoadingButtonState, func: (arg: LoadingButtonState) => void) => {
	current = (current << 1) % 3;
	func(current);
}

const ProgressCircle = () => {
	return (
		<Chakra.ProgressCircle.Root value={null} size="xs" position="absolute" right="0" mr="20px" translateY="-50%">
			<Chakra.ProgressCircle.Circle css={{"--thickness": "2px"}}>
				<Chakra.ProgressCircle.Track visibility="hidden"/>
				<Chakra.ProgressCircle.Range stroke="white" />
			</Chakra.ProgressCircle.Circle>
		</Chakra.ProgressCircle.Root>
	);
}

const LoadingButton = (props: LoadingButtonProps) => {
	const [buttonState, setButtonState] = useState<LoadingButtonState>(LoadingButtonState.INACTIVE);
	return (
		<Chakra.Button 
			display="block"
			bg={props.color}
			w="full"
			fontWeight="semibold"
			onClick={() => handleClick(buttonState,setButtonState)}>
				{props.children}
				{buttonState === LoadingButtonState.LOADING ? "" : <ProgressCircle/>}
		</Chakra.Button>
	);
}

export default LoadingButton;
