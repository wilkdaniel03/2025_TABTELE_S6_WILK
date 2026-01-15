import { useState, createContext, ReactNode } from "react";

interface ITrigger {
	employee: boolean;
	vehicle: boolean;
	reservation: boolean;
}

const useTrigger = () => {
	return useState<ITrigger>({employee:false,vehicle:false,reservation:false});
}

type UseTriggerReturnType = ReturnType<typeof useTrigger>;

export const TriggerCtx = createContext<UseTriggerReturnType | null>(null);

interface ITriggerProviderProps {
	children: ReactNode;
}

export const TriggerProvider = (props: ITriggerProviderProps) => {
	const trigger = useTrigger();
	return (
		<TriggerCtx.Provider value={trigger}>
			{props.children}
		</TriggerCtx.Provider>
	);
}
