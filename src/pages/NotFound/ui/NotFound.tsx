import { FC } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import NotFoundIcon from "@/shared/assets/notFound.svg?react";


const NotFound: FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={10}>
                    <div style={{margin: '0 auto', display: 'flex', justifyContent: 'center'}}><NotFoundIcon/></div>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={10}>
                    <Typography variant="h3" gutterBottom style={{textAlign: 'center', marginTop: '24px'}}>
                        К сожалению такой страницы не существует!
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NotFound;