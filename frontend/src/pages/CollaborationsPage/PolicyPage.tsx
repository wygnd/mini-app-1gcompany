import {FC} from "react";
import {Page} from "@/components/Page.tsx";
import {useSignal, initDataRaw as _initDataRaw} from "@telegram-apps/sdk-react";
import {useUserStore} from "@/store/userStore.ts";

export const PolicyPage: FC = () => {
	const initDataRaw = useSignal(_initDataRaw);
	const {user} = useUserStore();

	if (!initDataRaw) return;

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