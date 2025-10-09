import {$API} from "@/shared/http";
import {UserInterface} from "@/entities/users/types/user.ts";

export async function login() {
	try {
		const {data} = await $API.get<UserInterface>("/users/login");
		return data;
	} catch (error) {
		throw error;
	}
}