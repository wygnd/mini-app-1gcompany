import {FC} from "react";
import {Card} from "@telegram-apps/telegram-ui";

interface RefundProps {
	title: string;
}

export const RefundCard: FC<RefundProps> = ({title}) => {
	return (
		<Card>{title}</Card>
	)
}
