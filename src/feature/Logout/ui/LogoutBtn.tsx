import { FC } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { ga } from "@/app/providers/authProvider/config/firebase";

import style from "./LogoutBtn.module.scss";

export const LogoutBtn: FC = () => {
    const navigate = useNavigate(); 
    const Logout = () => { 
        signOut(ga);
        navigate("/login");
    };

    return (
        <button className={style.logout_btn} onClick={Logout}>Выход</button>
    );
};

