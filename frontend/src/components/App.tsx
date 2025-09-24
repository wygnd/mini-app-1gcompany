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

	return (
		<AppRoot
			appearance={isDark ? 'dark' : 'light'}
			platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
		>
			<BrowserRouter>
				{user
					?
				<Routes>
					{
						user.role === "admin"
							? adminRoutes.map((route) => <Route key={route.path} {...route} />)
							: routes.map((route) => <Route key={route.path} {...route} />)
					}
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
					:
					<h1>Что-то случилось :(</h1>
				}
			</BrowserRouter>
		</AppRoot>
	);
}
