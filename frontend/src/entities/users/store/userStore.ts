import {create} from "zustand";
import {UserStore} from "@/entities/users/types/user.ts";

export const useUserStore = create<UserStore>((set, get) => ({
	user: null,
	setUser: (user) => set({user}),
	isAdmin: () => get().user?.role === "admin"
}));
;