import {PaginationDto} from "../../../common/dto/pagination.dto";
import {IsSortKey} from "../../../common/validators/is-sort-key.validator";


export class OrdersPaginationDto extends PaginationDto {
	@IsSortKey(['orderId', 'createdAt', 'updatedAt', 'status'])
	declare sort: string
}