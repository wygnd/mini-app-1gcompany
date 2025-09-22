import {FC, useEffect, useState} from "react";
import {Page} from "@/components/Page.tsx";
import axios from 'axios'

interface IUser {
	userId: number;
	telegramId: number;
	userRole: string;
	userPhone: string
}

const sendRequest = async () => {
	const response = await axios.post<IUser>("https://dependable-enchantment-production-1804.up.railway.app/users/login");
	return response.data;
}

export const PolicyPage: FC = () => {
	const [user, setUser] = useState<IUser | null>(null);

	useEffect(() => {
		(async () => {
			setUser(await sendRequest());
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