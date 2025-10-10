import {PaginationDto} from "../../../common/dto/pagination.dto";
import {IsSortKey} from "../../../common/validators/is-sort-key.validator";
import {IsOptional, IsString} from "class-validator";

export class RefundPaginationDto extends PaginationDto {
	@IsSortKey(['refundId', 'createdAt', 'updatedAt', 'status'])
	@IsOptional({message: "Invalid key of sorting"})
	@IsString({message: "Sort key must be a string"})
	declare sort: string;
}