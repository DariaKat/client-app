import { FC } from 'react';
import { useAppSelector } from "@/app/store/hooks";
import { userSelector } from "../../model/userSlice";
import { ProfileHeader } from "@/entities/Profile";
// import './UserProfile.module.scss';

export const UserProfile: FC = () => {
    const getProfile = useAppSelector(userSelector);

    return (
        <div>
            {getProfile.profile && <ProfileHeader profile={getProfile.profile} />}
        </div>
    );
};
