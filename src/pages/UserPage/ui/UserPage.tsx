import { FC } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { ProfileHeader } from "@/widgets/Profile";
import { Post } from "@/entities";

const UserPage: FC = () => {
    const date = new Date();

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