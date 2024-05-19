import { FC } from 'react';

import { EditProfileAction } from "@/feature/EditProfileAction";

import style from "./GroupButton.module.scss";
import { ActionMasterProfile } from '@/feature/ActionMasterProfile';


interface IGroupButtonProps {
    myPage: boolean;
    profile: Profile;
    isMasterPage?: boolean;
}

export const GroupButton: FC<IGroupButtonProps> = ({ myPage, profile, isMasterPage}) => {
    return (
        <div className={style.groupBtn_container}>
            {myPage && <EditProfileAction profile={profile} />}    
            {isMasterPage && <ActionMasterProfile />}
        </div>
    );
};
