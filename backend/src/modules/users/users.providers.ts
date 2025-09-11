import {UserModel} from "./entities/users.entity";

export const usersProviders = [{
	provide: "UsersRepository",
	useValue: UserModel,
}];