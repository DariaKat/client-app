import { FC, Suspense } from "react";

import { RouterApp } from "./providers/routing/RouterApp";

import "./App.scss";

export const App: FC = () => {
    return (
        <>
            <Suspense fallback="...">
                <div>
                    <RouterApp />
                </div>
            </Suspense>
        </>
    );
};
