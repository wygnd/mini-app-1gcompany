import {Title} from "@telegram-apps/telegram-ui";
import {FC} from "react";
import {CreateRefund} from "@/features/refunds/components/CreateRefund/CreateRefund.tsx";

export const RefundOrdersPage: FC = () => {
	return (
		<div className='p-10'>
			<Title>Заказы на забор возвратов</Title>
			<CreateRefund />
		</div>
	)
}