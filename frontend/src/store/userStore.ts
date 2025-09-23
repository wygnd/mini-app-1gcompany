import {create} from "zustand";
import {UserInterface} from "@/types/user.ts";

interface UserStore {
	user: UserInterface | null;
	setUser: (user: UserInterface | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));;