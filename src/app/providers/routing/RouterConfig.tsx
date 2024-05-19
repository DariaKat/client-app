import { RouteProps } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import { NotFound } from '@/pages/NotFound';
import { UserPage } from '@/pages/UserPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegistrPage } from '@/pages/RegisrPage';
import { MasterPage } from '@/pages/MasterPage';

enum AppRoute {
    MAIN = 'main',
    USER = 'user',
    ADMIN = 'admin',
    MASTER = 'master',
    LOGIN = 'login',
    REGISTR = 'registr',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoute, string> = {
    [AppRoute.MAIN]: '/',
    [AppRoute.USER]: '/user/:userId',
    [AppRoute.MASTER]: '/user/:userId/master',
    [AppRoute.ADMIN]: '/admin',
    [AppRoute.LOGIN]: '/login',
    [AppRoute.REGISTR]: '/registr',
    [AppRoute.NOT_FOUND]: '*', 
};

export const RouteConfig: Record<AppRoute, RouteProps> = {
    [AppRoute.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoute.MASTER]: {
        path: RoutePath.master,
        element: <MasterPage />,
    },
    [AppRoute.USER]: {
        path: RoutePath.user,
        element: <UserPage />,
    },
    [AppRoute.ADMIN]: {
        path: RoutePath.admin,
        element: <>Admin</>,
    },
    [AppRoute.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />,
    },
    [AppRoute.REGISTR]: {
        path: RoutePath.registr,
        element:  <RegistrPage />,
    },
    [AppRoute.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
