import {applyDecorators} from "@nestjs/common";
import {ApiHeader} from "@nestjs/swagger";

export const ApiAuthorizationHeaderDecorator = () => {
	return applyDecorators(
		ApiHeader({
			name: "Authorization",
			example: "Authorization: tma token",
			description: "API authorization header",
			required: true,
		})
	)
}