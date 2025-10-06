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
				{router.map(({path, handle, children}) => {
					if (path == '/') return;
					const {title} = handle;

					return !children || children.length === 0 ?
						(
							<NavLink
								to={`${path}`}
								key={path}
								className={classNames('link', path == location.pathname && styles.link_active)}
							>
								<Cell>{title}</Cell>
							</NavLink>
						) : (
							<Section header={title} key={path}
							         className={classNames('link', path == location.pathname && styles.link_active)}>
								{children.map(subRoute => (
									<NavLink
										to={`${path}/${subRoute.path}`}
										key={subRoute.path}
										className={classNames('link', subRoute.path == location.pathname && styles.link_active, styles.subMenuItem)}
									>
										<Cell>{subRoute.handle.title}</Cell>
									</NavLink>
								))}
							</Section>
						)
				})}
			</Section>
		</List>
	)
}