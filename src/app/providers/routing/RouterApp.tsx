import { FC, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteConfig } from './RouterConfig';

export const RouterApp: FC = () => (
    <Suspense fallback={"Loading..."}>
        <Routes>
            {Object.values(RouteConfig).map(({ path, element }) => (
                <Route
                    key={path}
                    path={path}
                    element={<div className="page-wrapper">{element}</div>}
                />
            ))}
        </Routes>
    </Suspense>
);
