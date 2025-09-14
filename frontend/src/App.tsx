import { useEffect } from "react";
import axios from "axios";

export default function App() {
	useEffect(() => {

		async function fetchData() {
			try {
				const res = await axios.post("https://dependable-enchantment-production-1804.up.railway.app/users/login"); // замени на Railway URL
				console.log("Ответ сервера:", res.data);
			} catch (err) {
				console.error("Ошибка запроса:", err);
			}
		}

		fetchData();
	}, []);

	return <h1>Смотри консоль браузера</h1>;
}
