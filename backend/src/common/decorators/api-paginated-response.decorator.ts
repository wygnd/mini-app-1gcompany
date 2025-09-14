import {applyDecorators, Type} from "@nestjs/common";
import {ApiExtraModels, ApiOkResponse, getSchemaPath} from "@nestjs/swagger";
import {PaginatedResponseDto} from "../dto/paginated-response.dto";

export function ApiPaginatedResponse<TModel extends Type<any>>(model: TModel) {
	return applyDecorators(
		ApiExtraModels(PaginatedResponseDto, model),
		ApiOkResponse({
			description: "Paginated response",
			schema: {
				allOf: [
					{$ref: getSchemaPath(PaginatedResponseDto)},
					{
						properties: {
							items: {
								type: "array",
								items: {
									$ref: getSchemaPath(model)
								},
							}
						}
					}
				]
			}
		})
	)
}