import { ReactNode } from "react";
import * as Chakra from "@chakra-ui/react";

export enum LoadingButtonState {
	INACTIVE = 1,
	LOADING = 2
}

interface LoadingButtonProps {
	click: () => void;
	state: LoadingButtonState;
	color: string;
	children: ReactNode;
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
	return (
		<Chakra.Button 
			display="block"
			bg={props.color}
			w="full"
			fontWeight="semibold"
			onClick={props.click}>
				{props.children}
				{props.state === LoadingButtonState.LOADING ? <ProgressCircle/> : ""}
		</Chakra.Button>
	);
}

export default LoadingButton;
