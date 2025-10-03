import {FC} from "react";
import {Page} from "@/components/Page.tsx";
import {Section, TabsList} from "@telegram-apps/telegram-ui";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {useCurrentPath} from "@/hooks/useCurrentPath.ts";
import {TabsItem} from "@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem";
import styles from './LogisticsPage.module.css';
import {classNames} from "@/css/classnames.ts";

export const LogisticsPage: FC = () => {

	const location = useLocation();
	const path = useCurrentPath();

	if (!path) return;

	const activePath = location.pathname.replace(path.pathname + '/', '');
	const {children: subRoutes} = path.route;

	return (
		<>
			<Page>
				<Section header="Логистика" className="p-2">
					{subRoutes &&
						<TabsList className={classNames(styles.wrapper, "p-2")}>
							{subRoutes.map(({path, handle}) =>
								<NavLink key={path} to={`${path}`}>
									<TabsItem
										selected={activePath === path}
									>
										{handle.title}
									</TabsItem>
								</NavLink>
							)}
						</TabsList>
					}
					<Outlet/>
				</Section>
			</Page>
		</>
	)
}