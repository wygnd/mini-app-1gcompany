import {FC, useEffect} from "react";
import {Page} from "@/components/Page.tsx";
import {useUserStore} from "@/store/userStore.ts";
import {getAdmin, getAll} from "@/http/usersApi.ts";

export const TestAdminPage: FC = () => {

	const {user} = useUserStore();

	useEffect(() => {
		(async () => {
			await getAll()
			await getAdmin()
		})()
	}, []);

	return (
		<Page>
			{user ?
				<h1>Привет, {user.name}</h1>
				:
				<h1>Страница для админов</h1>
			}
		</Page>
	)
}