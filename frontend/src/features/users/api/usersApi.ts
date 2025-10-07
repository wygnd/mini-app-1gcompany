import {$API} from "@/http";
import {UserInterface} from "@/features/users/types/user.ts";

export async function login() {
	try {
		const {data} = await $API.get<UserInterface>("/users/login");
		return data;
	} catch (error) {
		throw error;
	}
}