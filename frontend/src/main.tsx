import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {init, initData, miniApp} from "@telegram-apps/sdk";

(async () => {
	try {
		await init();

		if (miniApp.ready.isAvailable()) {
			await miniApp.ready();
			console.log("APPLICATION READY. YES SIR");
			window.dispatchEvent(new Event("MiniAppReady"));
		}

		initData.restore();
		initData.state();

		const user = initData.user();
		console.log("Данные пользователя: ", user);

		if (user) {
			window.dispatchEvent(new Event("UserReady"));
		} else {
			console.log("Ошибка загрузки пользователя");
		}

	} catch (error) {
		console.error("Initialization error Telegram SDK: ", error);
	}
})();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App/>
	</StrictMode>,
)
