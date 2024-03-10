import { FC } from "react";
import {useParams} from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import { EditProfileAction } from "@/feature/EditProfileAction";
import { useAuth } from "@/app/providers/authProvider";

import style from "./ProfileHeader.module.scss";

interface IProfileHeaderProps {}

export const ProfileHeader: FC<IProfileHeaderProps> = () => {
    const user = useAuth();
    const params = useParams();
    
    return (
        <div className={style.profileHeader_container}>
            <div className={style.profileHeader_container__image}>
                <img src="/images/hair.jpg" />
            </div>
            <div className={style.profileHeader_container__wrap}>
                <Avatar
                    className={style.avatar}
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 150, height: 150 }}
                />
                <div className={style.profileHeader_container__wrap_description}>
                    <div className={style.profileHeader_container__wrap_description_text}>
                        <span className={style.name}>Имя Пользователя</span>
                        <span className={style.info}>Описание</span>
                    </div>
                    <div className={style.profileHeader_container__wrap_description_groupBtns}>
                        {user?.user?._id === params.userId && <EditProfileAction />}
                        <Button variant="contained">Запись</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
