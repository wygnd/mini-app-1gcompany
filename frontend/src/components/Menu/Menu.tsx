import {FC} from "react";
import {useUserStore} from "@/features/users/store/userStore.ts";
import {adminRoutes, routes as defaultRoutes} from "@/navigation/routes.tsx";
import {Cell, List, Section} from "@telegram-apps/telegram-ui";
import {NavLink, useLocation} from "react-router-dom";
import styles from './Menu.module.css';
import {classNames} from "@/css/classnames.ts";


export const Menu: FC = () => {

	const {isAdmin} = useUserStore();
	const location = useLocation();

	const router = isAdmin() ? adminRoutes : defaultRoutes;

	if (!router) return;

	return (
		<List>
			<Section>
				{router.map(({path, handle}) => {
					if (path == '/') return;
					const {title} = handle;

					return (
						<NavLink
							to={`${path}`}
							key={path}
							className={classNames('link', path == location.pathname && styles.link_active)}
						>
							<Cell>{title}</Cell>
						</NavLink>
					)
				})}
			</Section>
		</List>
	)
}