import {FC} from "react";
import {Page} from "@/components/Page.tsx";
import {Button, InlineButtons, Section} from "@telegram-apps/telegram-ui";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {useCurrentPath} from "@/hooks/useCurrentPath.ts";

export const LogisticsPage: FC = () => {

	const location = useLocation();
	const path = useCurrentPath();

	if (!path) return;

	const activePath = location.pathname.replace(path.pathname + '/', '');
	const {children: subRoutes} = path.route;

	return (
		<>
			<Page>
				<Section header="Логистика">
					{subRoutes &&
						<InlineButtons>
							{subRoutes.map(({path, handle}) =>
								<NavLink key={path} to={`${path}`}>
									<Button
										mode={activePath === path ? "bezeled" : "outline"}
										size="s"
									>
										{handle.title}
									</Button>
								</NavLink>
							)}
						</InlineButtons>
					}
					<Outlet/>
				</Section>
			</Page>
		</>
	)
}