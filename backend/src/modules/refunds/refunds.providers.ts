import {RefundsModel} from "./entities/refunds.entity";

export const refundsProviders = [{
	provide: "RefundsRepository",
	useValue: RefundsModel
}]