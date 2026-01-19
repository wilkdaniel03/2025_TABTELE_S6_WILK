import { create } from "zustand";
import { IUserResponse, IRoleResponse, UserRole } from "@http";

interface IUserInfoStore {
	info: IUserResponse;
	role: UserRole;
	setInfo: (data: IUserResponse) => void;
	setRole: (role: IRoleResponse) => void;
}

export const useUserInfoStore = create<IUserInfoStore>((set) => ({
	info: {id:0,name:"",surname:"",phone_number:"",pesel:"",date_of_birth:"",nationality:""},
	role: UserRole.CUSTOMER,
	setInfo: (data) => set((state) => {
		state.info = { ...data };
		return { info: state.info };
	}),
	setRole: (role) => set((state) => {
		state.role = (() => {
			switch(role.role) {
				case "customer": return UserRole.CUSTOMER;
				case "agent": return UserRole.AGENT;
				case "admin": return UserRole.ADMIN;
				default: return UserRole.CUSTOMER;
		}})();
		return { role: state.role };
	})
}));
