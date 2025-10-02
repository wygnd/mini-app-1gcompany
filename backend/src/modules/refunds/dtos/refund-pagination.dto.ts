import {PaginationDto} from "../../../common/dto/pagination.dto";
import {IsSortKey} from "../../../common/validators/is-sort-key.validator";

export class RefundPaginationDto extends PaginationDto {
	@IsSortKey(['refundId', 'createdAt', 'updatedAt', 'status'])
	declare sort: string;
}