import {$API} from "../../../../shared/api/axios.ts";
import type {User} from "../types.ts";


export const userLogin = async (): Promise<User> => {
		const {data} = await $API.post<User>("/users/login");
		return data;
}