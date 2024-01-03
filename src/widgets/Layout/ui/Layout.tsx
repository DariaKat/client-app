import { FC } from "react";
import { Link } from "react-router-dom";

import style from "./Layout.module.scss";

export const Layout: FC = () => {
    return (
        <header className={style.layout}>
            <div className={style.layout_logo}>
                <Link to="/"><img className={style.layout_logo_image} src="/cats.svg" alt="logo"/></Link>
            </div>
            <div className={style.layout_nav}>
                <Link to="/login">Авторизация</Link>
            </div>
        </header>
    );
};

