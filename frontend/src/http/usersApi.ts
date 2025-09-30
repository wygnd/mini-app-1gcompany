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