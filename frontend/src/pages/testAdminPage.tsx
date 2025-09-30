import {FC} from "react";
import {Page} from "@/components/Page.tsx";
import {useUserStore} from "@/store/userStore.ts";

export const TestAdminPage: FC = () => {

	const {user} = useUserStore();

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