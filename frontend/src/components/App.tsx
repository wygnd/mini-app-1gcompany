import {useEffect, useMemo} from 'react';
import {Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import {retrieveLaunchParams, useSignal, isMiniAppDark} from '@telegram-apps/sdk-react';
import {AppRoot} from '@telegram-apps/telegram-ui';

import {adminRoutes, routes} from '@/navigation/routes.tsx';
import {useUserStore} from "@/store/userStore.ts";
import {login} from "@/http/usersApi.ts";

export function App() {
	const lp = useMemo(() => retrieveLaunchParams(), []);
	const isDark = useSignal(isMiniAppDark);
	const {user, setUser} = useUserStore();

	useEffect(() => {
		login().then(data => setUser(data));
	}, [])

	const routesType = user?.role === "admin" ? adminRoutes : routes;
	return (
		<AppRoot
			appearance={isDark ? 'dark' : 'light'}
			platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
		>
			<BrowserRouter>
				<Routes>
					{routesType.map(({path, Component, children}) => (
						<Route key={path} path={path} element={<Component/>}>
							{children?.map(({path, Component}) => (
								<Route key={path} element={<Component/>}/>
							))}
						</Route>
					))}
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</BrowserRouter>
		</AppRoot>
	);
}
