import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from "@/app/store/hooks";
import { ProfileHeader } from "@/entities/Profile";
import { AdminPanel } from '@/feature/AdminPanel';
import { userSelector } from "../../model/userSlice";
import { useAuth } from "@/app/providers/authProvider";

import style from './AdminProfile.module.scss';


export const AdminProfile: FC = () => {
    const getProfile = useAppSelector(userSelector);
    const params = useParams();
    const user = useAuth();
    
    return (
        <div className={style.adminProfile}>
            {getProfile.profile && <ProfileHeader profile={getProfile.profile} />}
            {user?.user?._id === params.userId && <AdminPanel />} 
        </div>
    );
};


