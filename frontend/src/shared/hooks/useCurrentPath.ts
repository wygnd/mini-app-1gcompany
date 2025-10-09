import {useUserStore} from "@/entities/users/store/userStore.ts";
import {matchRoutes, useLocation} from "react-router-dom";
import {adminRoutes, routes as defaultRoutes} from "@/navigation/routes.tsx";

export const useCurrentPath = () => {
	const {user} = useUserStore();
	const routes = user?.role === "admin" ? adminRoutes : defaultRoutes;
	const location = useLocation();
	const matched = matchRoutes(routes, location)

	if(!matched) return null;

	return matched[0];
}