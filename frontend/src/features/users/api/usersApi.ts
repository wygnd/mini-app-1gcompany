import {$API} from "@/http";
import {UserInterface} from "@/features/users/types/user.types.ts";

export async function login() {
	try {
		const {data} = await $API.get<UserInterface>("/users/login");
		return data;
	} catch (error) {
		throw error;
	}
}

interface responseTemp {
	status: number;
	message: string;
}

export async function getAll() {
	try {
		const {data} = await $API.get<responseTemp>("/test");
		console.log(data);
	} catch (error) {
		console.log("EXCEPTION ERROR: ", error);
	}
}

export async function getAdmin() {
	try {
		const {data} = await $API.get<responseTemp>("/test-admin");
		console.log(data);
	} catch (error) {
		console.log("EXCEPTION ERROR: ", error);
	}
}