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
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page: number;

	@ApiProperty({
		description: "Limit items for query",
		type: Number,
		example: 50,
		required: true
	})
	@IsNotEmpty()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(50)
	limit: number;

	@ApiProperty({
		description: "key of sorting",
		type: String,
		example: "user_id",
		required: false
	})
	@IsOptional()
	@IsString()
	sort?: string;

	@ApiProperty({
		description: "Ordering",
		type: String,
		example: "desc",
		required: false
	})
	@IsOptional()
	@IsString()
	@IsIn(['asc', 'desc'])
	order?: 'asc' | 'desc' = 'desc';
}