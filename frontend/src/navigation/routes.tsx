import {IndexPage} from '@/pages/IndexPage/IndexPage';
import {InitDataPage} from '@/pages/InitDataPage.tsx';
import {LogisticsPage} from "@/pages/Logistics/Logistics.tsx";
import {PolicyPage} from "@/pages/CollaborationsPage/PolicyPage.tsx";
import {ThemeParamsPage} from "@/pages/ThemeParamsPage.tsx";
import {TestAdminPage} from "@/pages/testAdminPage.tsx";
import {RefundOrdersPage} from "@/pages/RefundOrdersPage/RefundOrdersPage.tsx";
import {ParcelOrdersPage} from "@/pages/ParcelOrdersPage/ParcelOrdersPage.tsx";
import {CargoOrdersPage} from "@/pages/CargoOrdersPage/CargoOrdersPage.tsx";
import {createBrowserRouter, RouteObject} from "react-router-dom";


export const routes: RouteObject[] = [
	{path: "/", Component: IndexPage},
	{path: '/init-data', Component: InitDataPage, handle: {title: 'Init Data'}},
	{path: '/policy', Component: PolicyPage, handle: {title: 'Условия сотрудничества'}},
	{
		path: '/logistics', Component: LogisticsPage, handle: {title: 'Логистика'}, children: [
			{path: 'orders', Component: CargoOrdersPage, handle: {title: 'Заказы на забор груза'}},
			{path: 'orders-package', Component: ParcelOrdersPage, handle: {title: 'Заказы на отправку посылок'}},
			{path: 'orders-return', Component: RefundOrdersPage, handle: {title: 'Заказы на забор возвратов'}},
		]
	},
	{
		path: '/orders', Component: LogisticsPage, handle: {title: 'Обработка товара'}, children: [
			{path: 'terms-of-reference', Component: LogisticsPage, handle: {title: 'Техническое задание'}},
		]
	},
	{path: '/theme-params', Component: ThemeParamsPage, handle: {title: 'Параметры темы'}}
];

export const adminRoutes: RouteObject[] = [
	...routes,
	{path: '/admin', Component: TestAdminPage, handle: {title: "Панель администратора"}},
];

export const router = createBrowserRouter(routes);
export const adminRouter = createBrowserRouter(adminRoutes);