import {useEffect, useMemo} from 'react';
import {RouterProvider} from 'react-router-dom';
import {retrieveLaunchParams, useSignal, isMiniAppDark} from '@telegram-apps/sdk-react';
import {AppRoot} from '@telegram-apps/telegram-ui';

import {router, adminRouter} from '@/navigation/routes.tsx';
import {useUserStore} from "@/features/users/store/userStore.ts";
import {getAdmin, getAll, login} from "@/features/users/api/usersApi.ts";

export function App() {
	const lp = useMemo(() => retrieveLaunchParams(), []);
	const isDark = useSignal(isMiniAppDark);
	const {setUser, isAdmin} = useUserStore();

	useEffect(() => {
		login().then(data => setUser(data));

		(async () => {
			await getAll()
			await getAdmin()
		})()
	}, [])

	const initialRouter = isAdmin() ? adminRouter : router;

	return (
		<AppRoot
			appearance={isDark ? 'dark' : 'light'}
			platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
		>
			<RouterProvider router={initialRouter} />
		</AppRoot>
	);
}
