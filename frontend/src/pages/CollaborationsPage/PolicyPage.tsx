import {FC, useEffect, useState} from "react";
import {Page} from "@/components/Page.tsx";
import axios from 'axios'
import {useSignal, initDataRaw as _initDataRaw} from "@telegram-apps/sdk-react";

interface IUser {
	userId: number;
	telegramId: number;
	userRole: string;
	userPhone: string
}

const sendRequest = async (data: string) => {
	const response = await axios.post<IUser>("https://dependable-enchantment-production-1804.up.railway.app/users/login", null, {
		headers: {
			'tma': data,
		}
	});
	return response.data;
}

export const PolicyPage: FC = () => {
	const initDataRaw = useSignal(_initDataRaw);
	const [user, setUser] = useState<IUser | null>(null);

	if(!initDataRaw) return;

	useEffect(() => {
		(async () => {
			setUser(await sendRequest(initDataRaw));
		})()
	}, [])

	return (
		<Page>
			<h1>Условия сотрудничества</h1>
			<p>Здесь будут условия сотрудничества</p>
			{user && (
				<>
					<h2>{user.userId}</h2>
					<h3>{user.telegramId}</h3>
				</>
			)}
		</Page>
	)
}