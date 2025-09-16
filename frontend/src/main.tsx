import ReactDOM from 'react-dom/client'
import {EnvUnsupported} from "./components/EnvUnsupported.tsx";
import {miniApp} from "@telegram-apps/sdk";
import {StrictMode} from "react";

// Mock the environment in case, we are outside Telegram.

const root = ReactDOM.createRoot(document.getElementById('root')!);

if (miniApp.mountSync.isAvailable()) {
	miniApp.mountSync();
	miniApp.isMounted(); // true

	root.render(
		<StrictMode>
			Hello world
		</StrictMode>,
	);
} else {
	root.render(<EnvUnsupported/>);
}
