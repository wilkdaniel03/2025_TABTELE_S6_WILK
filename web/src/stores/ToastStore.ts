import { create } from "zustand";

export enum ToastIconType {
	ERROR = 0,
	WARNING = 1,
	SUCCESS = 2,
	INFORMATION = 3,
	LOADING = 4
}

interface  IToastMessage {
	type: ToastIconType;
	message: string;
	fixed: boolean;
}

interface IToastMessageRec extends IToastMessage {
	id: number;
}

interface IToastStore {
	messages: IToastMessageRec[];
	prev_id: number;
	append: (msg: IToastMessage) => void;
	remove: (id: number) => void;
	clear: () => void;
}

export const useToastStore = create<IToastStore>((set) => ({
	messages: [],
	prev_id: 0,
	append: (msg) => set((state) => { state.messages.push({id:state.prev_id+1,type:msg.type,message:msg.message,fixed:msg.fixed}); return { messages: state.messages, prev_id: state.prev_id+1}}),
	remove: (id) => set((state) => { state.messages = state.messages.filter(msg => msg.id != id); return { messages: state.messages }}),
	clear: () => set((state) => { state.messages.length = 0; return { messages: state.messages }})
}))
