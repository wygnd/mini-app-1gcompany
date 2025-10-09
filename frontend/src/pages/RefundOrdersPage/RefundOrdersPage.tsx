import {Title} from "@telegram-apps/telegram-ui";
import {FC} from "react";
import {CreateRefund} from "@/features/refunds/components/CreateRefund/CreateRefund.tsx";
import {classNames} from "@/shared/css/classnames.ts";
import styles from './RefundOrdersPage.module.css';
import {RefundList} from "@/features/refunds/components/RefundList/RefundList.jsx.tsx";

export const RefundOrdersPage: FC = () => {
	return (
		<div className='p-10'>
			<Title className={classNames(styles.title)}>Заказы на забор возвратов</Title>
			<CreateRefund/>
			<RefundList/>
		</div>
	)
}