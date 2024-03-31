import { FC, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import { Post } from "@/entities";
import { fetchProfile } from "../model/fatchProfile";
import { ProfileHeader } from "@/entities/Profile";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { userSelector } from "../model/userSlice";
import { CreatePost } from "@/feature/ActionPost";

export const Profile: FC = () => {
    const date = new Date();
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
                        <div style={{ margin: '0 auto', display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                            {getProfile.profile && <ProfileHeader profile={getProfile.profile} />}
                        </div>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={10} container>
                        <CreatePost />
                        <Post
                            user="admin admin"
                            time={`${date}`}
                            content={{ text: 'какой-то текст написал пользователь давайте все вместе похлопаем ему' }} />   
                    </Grid>
                </Grid>
            </>
    );
};

    