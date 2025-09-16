import type {ComponentType, JSX} from 'react';

import {IndexPage} from '@/pages/IndexPage/IndexPage';
import {InitDataPage} from '@/pages/InitDataPage.tsx';
import {LogisticsPage} from "@/pages/Logistics/Logistics.tsx";
import {CollaborationsPage} from "@/pages/CollaborationsPage/CollaborationsPage.tsx";
import {NewOrderPage} from "@/pages/NewOrderPage/NewOrderPage.tsx";
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
	{path: '/logistics', Component: LogisticsPage, title: 'Логистика'},
	{path: '/partners', Component: CollaborationsPage, title: 'Условия сотрудничества'},
	{path: '/orders/new-order', Component: NewOrderPage, title: 'Оставить заявку'},
	{path: '/theme-params', Component: ThemeParamsPage, title: 'Параметры темы'}
];
