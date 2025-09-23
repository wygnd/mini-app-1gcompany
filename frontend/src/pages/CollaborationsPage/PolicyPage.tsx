import {FC, useEffect, useState} from "react";
import {Page} from "@/components/Page.tsx";
import {useSignal, initDataRaw as _initDataRaw} from "@telegram-apps/sdk-react";
import {login} from "@/http/usersApi.ts";
import {UserInterface} from "@/types/user.ts";

export const PolicyPage: FC = () => {
	const initDataRaw = useSignal(_initDataRaw);
	const [user, setUser] = useState<UserInterface | null>(null);

	if (!initDataRaw) return;

	useEffect(() => {
		login()
			.then(data => setUser(data))
			.catch(error => console.log(error));
	}, [])

	console.log(user);

	return (
		<Page>
			<h1>Условия сотрудничества</h1>
			<p>Здесь будут условия сотрудничества</p>
			{user && (
				<>
					<h2>Приветствую, {user.name}</h2>
					<h2>{user.userId}</h2>
					<h3>{user.telegramId}</h3>
				</>
			)}
		</Page>
	)
}