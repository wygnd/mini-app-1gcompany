import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {init} from "@telegram-apps/sdk";

(async () => {
	try {
		await init();
	} catch (error) {
		console.error("Initialization error Telegram SDK: ", error);
	}
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
