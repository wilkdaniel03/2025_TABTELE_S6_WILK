import { create } from "zustand";

export enum ToastIconType {
	ERROR = 0,
	WARNING = 1,
	SUCCESS = 2,
	INFORMATION = 3,
}

interface  IToastMessage {
	type: ToastIconType;
	message: string;
}

interface IToastStore {
	messages: IToastMessage[];
	append: (msg: IToastMessage) => void;
	clear: () => void;
}

export const useToastStore = create<IToastStore>((set) => ({
	messages: [],
	append: (msg) => set((state) => { state.messages.push(msg); return { messages: state.messages}}),
	clear: () => set((state) => { state.messages.length = 0; return { messages: state.messages }})
}))
