import {IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class PaginationDto {
	@ApiProperty({
		description: "page number",
		type: Number,
		example: 1,
		required: true
	})
	@IsNotEmpty({message: "Invalid page"})
	@Type(() => Number)
	@IsInt({message: "Page must be a numeric string"})
	@Min(1)
	page: number;

	@ApiProperty({
		description: "Limit items for query",
		type: Number,
		example: 50,
		required: true
	})
	@IsNotEmpty({message: "Invalid limit"})
	@Type(() => Number)
	@IsInt({message: "Limit must be a numeric string"})
	@Min(1)
	@Max(50)
	limit: number;

	@ApiProperty({
		description: "key of sorting",
		type: String,
		example: "user_id",
		required: false
	})
	@IsOptional({message: "Invalid key of sorting"})
	@IsString({message: "Sort key must be a string"})
	sort?: string;

	@ApiProperty({
		description: "Ordering",
		type: String,
		example: "desc",
		required: false
	})
	@IsOptional({message: "Invalid ordering"})
	@IsString({message: "Order must be a string"})
	@IsIn(['asc', 'desc'])
	order?: 'asc' | 'desc' = 'desc';
}