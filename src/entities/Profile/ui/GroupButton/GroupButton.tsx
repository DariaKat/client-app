import { FC } from 'react';
import Button from "@mui/material/Button";

import { EditProfileAction } from "@/feature/EditProfileAction";

import style from "./GroupButton.module.scss";


interface IGroupButtonProps {
    myPage: boolean;
    role: "ADMIN" | "USER" | "MASTER";
    profile: Profile;
}

export const GroupButton: FC<IGroupButtonProps> = ({ myPage, role, profile}) => {
    return (
        <div className={style.groupBtn_container}>
            {myPage && <EditProfileAction profile={profile} />}
            { !myPage && role === "MASTER" && <Button variant="contained">Запись</Button>}           
        </div>
    );
};
