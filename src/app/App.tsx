import { FC, Suspense } from "react";

import { RouterApp } from "./providers/routing/RouterApp";
import { Layout } from "@/widgets/Layout";

import "./App.scss";


export const App: FC = () => {
    return (
        <>
            <Suspense fallback="...">
                <Layout />
                <div className="container">
                    <RouterApp />
                </div>
            </Suspense>
        </>
    );
};
