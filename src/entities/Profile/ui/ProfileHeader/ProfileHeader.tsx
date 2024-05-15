import { FC } from "react";
import {useParams} from 'react-router-dom';
import Avatar from "@mui/material/Avatar";

import { GroupButton } from '../GroupButton/GroupButton';
import { useAuth } from "@/app/providers/authProvider";

import style from "./ProfileHeader.module.scss";

interface IProfileHeaderProps {
    profile: Profile;
}

export const ProfileHeader: FC<IProfileHeaderProps> = ({ profile }) => {
    const user = useAuth();
    const params = useParams();
    
    return (
        <div className={style.profileHeader_container}>
            <div className={style.profileHeader_container__image}>
                <img src={profile?.backgroundUrl || '/images/hair.jpg'} alt="Тут должна быть картинка" />
            </div>
            <div className={style.profileHeader_container__wrap}>
                <Avatar
                    className={style.avatar}
                    alt={profile.name}
                    src={profile?.avatarUrl}
                    sx={{ width: 150, height: 150 }}
                />
                <div className={style.profileHeader_container__wrap_description}>
                    <div className={style.profileHeader_container__wrap_description_text}>
                        <span className={style.name}>{profile?.name}</span>
                        <span className={style.info}>{profile?.description}</span>
                    </div>
                    <div className={style.profileHeader_container__wrap_description_groupBtns}>
                        <GroupButton myPage={user?.user?._id === params.userId} role={profile?.role} profile={profile} />
                    </div>
                </div>
            </div>
        </div>
    );
};
