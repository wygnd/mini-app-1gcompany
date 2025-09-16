import ReactDOM from 'react-dom/client'
import './index.css'
import {EnvUnsupported} from "./components/EnvUnsupported.tsx";
import {init} from "./init.ts";
import {retrieveLaunchParams} from "@telegram-apps/sdk";
import {StrictMode} from "react";
import App from "./components/App.tsx";

// Mock the environment in case, we are outside Telegram.

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
	const launchParams = retrieveLaunchParams();
	const {tgWebAppPlatform: platform} = launchParams;
	const debug = (launchParams.tgWebAppStartParam || '').includes('platformer_debug')
		|| import.meta.env.DEV;

	// Configure all application dependencies.
	await init({
		debug,
		eruda: debug && ['ios', 'android'].includes(platform),
		mockForMacOS: platform === 'macos',
	})
		.then(() => {
			root.render(
				<StrictMode>
					<App/>
				</StrictMode>,
			);
		});
} catch (error) {
	root.render(<EnvUnsupported/>);
}