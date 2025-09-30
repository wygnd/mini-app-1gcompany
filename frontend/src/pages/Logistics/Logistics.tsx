import {FC} from "react";
import {Page} from "@/components/Page.tsx";
import {Button, InlineButtons, Section} from "@telegram-apps/telegram-ui";
import {Outlet, useLocation} from "react-router-dom";
import {routes} from "@/navigation/routes.tsx";
import {Link} from "@/components/Link/Link.tsx";

export const LogisticsPage: FC = () => {

	const {pathname} = useLocation();

	const targetRoute = routes.find(route => route.path === pathname);

	const subRoutes = targetRoute?.children ?? [];

	return (
		<Page>
			<Section header="Логистика">
				{subRoutes.length !== 0 &&
					<InlineButtons>
						{subRoutes.map(({path, title}) =>
							<Link key={path} to={path}>
								<Button mode="outline" size="s">
									{title}
								</Button>
							</Link>
						)}
					</InlineButtons>
				}
			</Section>
			<Outlet/>
		</Page>
	)
}