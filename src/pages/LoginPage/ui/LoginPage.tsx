import { FC } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const LoginPage: FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={10}>
                    <div style={{margin: '0 auto', display: 'flex', justifyContent: 'center'}}>LoginPage</div>
                </Grid>
            </Grid>
           
        </Box>
    );
};

export default LoginPage;