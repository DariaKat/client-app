import { FC, useState } from "react";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Post } from "@/entities";

const MainPage: FC = () => {
    const date = new Date();

    const [closeAlert, setCloseAlert] = useState(true);

    const onClose = () => setCloseAlert(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={4}>
                    {closeAlert &&
                        <Alert severity="info" onClose={onClose} style={{marginBottom: '24px'}}>Спасибо, что решили воспользоваться нашим приложением!</Alert>}
                </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={6} container>
                    <Post
                        user="admin admin"
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

export default MainPage;