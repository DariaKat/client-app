import { FC } from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { userSelector } from "../../model/userSlice";
import { ProfileHeader } from "@/entities/Profile";
import { useAuth } from "@/app/providers/authProvider";
import { UserProcedure } from '@/entities/UserProcedure';
// import './UserProfile.module.scss';

export const UserProfile: FC = () => {
    const getProfile = useAppSelector(userSelector);
    const params = useParams();
    const user = useAuth();

    return (
        <div>
            {getProfile.profile && <ProfileHeader profile={getProfile.profile} />}
            {user?.user?._id === params.userId && <UserProcedure uuid={user?.user?._id as string} />}
        </div>
    );
};
