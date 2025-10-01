import {create} from "zustand";
import {UserInterface} from "@/features/users/types/user.ts";

interface UserStore {
	user: UserInterface | null;
	setUser: (user: UserInterface | null) => void;
	isAdmin: () => boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
	user: null,
	setUser: (user) => set({user}),
	isAdmin: () => get().user?.role === "admin"
}));
;