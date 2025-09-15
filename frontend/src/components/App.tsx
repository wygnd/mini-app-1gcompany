import {useMemo} from "react";
import {HashRouter, Routes, Route, Navigate} from "react-router-dom";
import {retrieveLaunchParams, isMiniAppDark} from "@telegram-apps/sdk";
import {useSignal} from "@telegram-apps/sdk-react";
import {AppRoot} from "@telegram-apps/telegram-ui";
import {routes} from "../navigation/routes.tsx";

export default function App() {
	const lp = useMemo(() => retrieveLaunchParams(), []);
	const isDark = useSignal(isMiniAppDark);

	return (
		<AppRoot
			appearance={isDark ? 'dark' : 'light'}
			platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
		>
			<HashRouter>
				<Routes>
					{routes.map((route) => <Route key={route.path} {...route} />)}
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</HashRouter>
		</AppRoot>
	);
}
