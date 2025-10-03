import {FC, useEffect} from "react";
import {List, Title} from "@telegram-apps/telegram-ui";
import {useRefundStore} from "@/features/refunds/store/refundStore.ts";
import {RefundCard} from "@/features/refunds/components/RefundCard/RefundCard.tsx";

export const RefundList: FC = () => {

	const {refunds} = useRefundStore();

	useEffect(() => {

	}, []);

	if (refunds.length === 0) return (<Title level="1">Заявок не найдено</Title>);

	return (
		<List>
			{refunds.map(refund => (
				<RefundCard key={refund.refundId} title={refund.title} />
			))}
		</List>
	)
}