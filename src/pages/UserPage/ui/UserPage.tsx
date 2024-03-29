import { FC, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { ProfileHeader } from "@/widgets/Profile";
import { Post } from "@/entities";
import { db } from "@/app/providers/authProvider";

const UserPage: FC = () => {
    const date = new Date();
    const params = useParams();
    const navigate = useNavigate();

    const getUserProfile = useCallback(async () => {
        const docRef = doc(db, "UserProfile", params.userId as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            navigate("/404");   
        }
    }, [params.userId, navigate]);

    useEffect (() => {
        getUserProfile();  
    }, [getUserProfile]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={10}>
                    <div style={{ margin: '0 auto', display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                        <ProfileHeader />
                    </div>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={10} container>
                    <Post
                        user="admin admin"
                        time={`${date}`}
                        content={{ text: 'какой-то текст написал пользователь давайте все вместе похлопаем ему' }} />
                    <Post
                        user="user user"
                        time={`${date}`}
                        content={{ text: 'какой-то текст написал пользователь давайте все вместе похлопаем ему' }} />
                    <Post
                        user="user user"
                        time={`${date}`}
                        content={{ text: 'какой-то текст написал пользователь давайте все вместе похлопаем ему' }} />   
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserPage;