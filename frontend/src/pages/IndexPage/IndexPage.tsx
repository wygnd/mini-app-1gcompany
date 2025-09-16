import {type FC, useEffect} from 'react';
import {Page} from '../../components/Page.tsx';
import {useLaunchParams} from "@telegram-apps/sdk-react";

export const IndexPage: FC = () => {

	useEffect(() => {

		const {initData} = useLaunchParams();

		console.log(initData);
		return;

		// async function sendUserLogin() {
		// 	axios.post("https://dependable-enchantment-production-1804.up.railway.app/users/login", {}, {
		// 		headers: {
		// 			'content-Type': 'application/json',
		// 			'telegram-api-init-data': initData ?? ""
		// 		}
		// 	})
		// }
		//
		//
		// sendUserLogin();
	}, []);

	return (
		<Page back={false}>
			<h1>Hello</h1>
		</Page>
	);
};