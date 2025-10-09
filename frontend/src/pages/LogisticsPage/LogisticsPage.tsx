import {FC} from "react";
import {Page} from "@/widgets/Page.tsx";
import {LargeTitle, Section} from "@telegram-apps/telegram-ui";
import {Outlet} from "react-router-dom";
import {classNames} from "@/shared/css/classnames.ts";
import styles from './LogisticsPage.module.css';

export const LogisticsPage: FC = () => {

	return (
		<>
			<Page>
				<Section>
					<LargeTitle className={classNames(styles.title)}>Логистика</LargeTitle>
					<Outlet/>
				</Section>
			</Page>
		</>
	)
}