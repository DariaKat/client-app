import { RouteProps } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';

enum AppRoute {
    MAIN = 'main',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoute, string> = {
    [AppRoute.MAIN]: '/',
    [AppRoute.NOT_FOUND]: '*', 
};

export const RouteConfig: Record<AppRoute, RouteProps> = {
    [AppRoute.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoute.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <>Страница не сществует</>,
    },
};
