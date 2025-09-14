import {ApiProperty} from "@nestjs/swagger";


export class PaginatedResponseDto<T> {
	@ApiProperty({
		type: Number,
		example: 1,
	})
	page: number;

	@ApiProperty({
		type: Number,
		example: 50
	})
	limit: number;

	@ApiProperty({
		type: Number,
		example: 100
	})
	total: number;

	@ApiProperty({isArray: true})
	items: T[];
}