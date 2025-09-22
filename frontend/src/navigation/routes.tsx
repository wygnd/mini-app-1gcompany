import type {ComponentType, JSX} from 'react';

import {IndexPage} from '@/pages/IndexPage/IndexPage';
import {InitDataPage} from '@/pages/InitDataPage.tsx';
import {LogisticsPage} from "@/pages/Logistics/Logistics.tsx";
import {PolicyPage} from "@/pages/CollaborationsPage/PolicyPage.tsx";
import {ThemeParamsPage} from "@/pages/ThemeParamsPage.tsx";

interface Route {
	path: string;
	Component: ComponentType;
	title?: string;
	icon?: JSX.Element;
}

export const routes: Route[] = [
	{path: '/', Component: IndexPage},
	{path: '/init-data', Component: InitDataPage, title: 'Init Data'},
	{path: '/policy', Component: PolicyPage, title: 'Условия сотрудничества'},
	{path: '/logistics', Component: LogisticsPage, title: 'Логистика'},
	{path: '/logistics/orders', Component: LogisticsPage, title: 'Заказы на забор груза'},
	{path: '/logistics/orders-package', Component: LogisticsPage, title: 'Заказы на отправку посылок'},
	{path: '/logistics/orders-return', Component: LogisticsPage, title: 'Заказы на забор возвратов'},
	{path: '/orders', Component: LogisticsPage, title: 'Обработка товара'},
	{path: '/orders/terms-of-reference', Component: LogisticsPage, title: 'Техническое задание'},
	{path: '/theme-params', Component: ThemeParamsPage, title: 'Параметры темы'}
];
