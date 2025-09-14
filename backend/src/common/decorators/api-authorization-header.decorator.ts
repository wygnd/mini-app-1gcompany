import {applyDecorators} from "@nestjs/common";
import {ApiHeader} from "@nestjs/swagger";

export const ApiAuthorizationHeaderDecorator = () => {
	return applyDecorators(
		ApiHeader({
			name: "telegram-api-init-data",
			description: "API authorization header",
			required: true,
		})
	)
}