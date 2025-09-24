import {FC} from "react";
import {useUserStore} from "@/store/userStore.ts";
import {adminRoutes, routes as defaultRoutes} from "@/navigation/routes.tsx";
import {Cell, List, Section} from "@telegram-apps/telegram-ui";
import {Link} from "@/components/Link/Link.tsx";
import {useLocation} from "react-router-dom";
import styles from './Menu.module.css';


export const Menu: FC = () => {

	const {user} = useUserStore();
	const location = useLocation();

	const routes = user?.role === "admin" ? adminRoutes : defaultRoutes;

	if (!routes) return;

	return (
		<List>
			<Section>
				{routes.map(({path, title}) => {
					if (path == '/') return;

					return (
						<Link
							key={path}
							to={path}
							className={`${path == location.pathname && styles.link_active}`}
						>
							<Cell>{title}</Cell>
						</Link>
					)
				})}
			</Section>
		</List>
	)
}