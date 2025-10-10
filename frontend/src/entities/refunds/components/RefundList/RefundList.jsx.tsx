import {FC, useEffect} from "react";
import {List, Title} from "@telegram-apps/telegram-ui";
import {useRefundStore} from "@/entities/refunds/store/refundStore.ts";
import {RefundCard} from "@/entities/refunds/components/RefundCard/RefundCard.tsx";
import {getRefundList} from "@/entities/refunds/api/refundApi.ts";

export const RefundList: FC = () => {

	const {refunds, setRefunds} = useRefundStore();

	useEffect(() => {
		if (refunds.length > 0) return;

		(async () => {
			const {refundsFromApi, error} = await getRefundList();

			if (error) return void alert(error);

			if (!refundsFromApi) return void alert('Что-то пошло не так');

			console.log(refundsFromApi);
			setRefunds(refundsFromApi);
		})()
	}, [setRefunds]);

	if (refunds.length === 0) return (<Title level="1">Заявок не найдено</Title>);

	return (
		<List>
			{refunds.map(refund => (
				<RefundCard key={refund.refundId} title={refund.title}/>
			))}
		</List>
	)
}