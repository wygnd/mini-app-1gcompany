import {$API} from "@/http/index.ts";
import {UserInterface} from "@/types/user.ts";

export async function login() {
	try {
		const {data} = await $API.post<UserInterface>("/users/login");
		return data;
	} catch (error) {
		throw error;
	}
}