import { FC, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import { fetchProfile } from "../model/fatchProfile";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { userSelector } from "../model/userSlice";
import { AdminProfile } from "./AdminProfile/AdminProfile";
import { MasterProfile } from "./MasterProfile/MasterProfile";
import { UserProfile } from "./UserProfile/UserProfile";

enum UserProfileRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MASTER = 'MASTER',
}

const ProfileMap = {
    [UserProfileRole.ADMIN]: <AdminProfile />,
    [UserProfileRole.MASTER]: <MasterProfile />,
    [UserProfileRole.USER]: <UserProfile />,
};

export const Profile: FC = () => {
    const params = useParams();
    const getProfile = useAppSelector(userSelector);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getUserProfile = useCallback( () => {
        dispatch(fetchProfile(params.userId as string));
    }, [params.userId, dispatch]);

    useEffect (() => {
        getUserProfile();  
    }, [getUserProfile]);

    useEffect(() => {
        typeof getProfile.error === 'string' && navigate('/404');
    }, [getProfile, navigate]);

    return (
        getProfile.loading ?
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress
                    color="secondary"
                    variant="indeterminate"
                />
            </div> : 
            <>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        {getProfile.profile && ProfileMap[getProfile.profile.role]}
                    </Grid>
                </Grid>
            </>
    );
};

    