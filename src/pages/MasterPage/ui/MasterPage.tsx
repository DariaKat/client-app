import { FC } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { MasterProcedure } from "@/entities/MasterProcedure";
import { useAuth } from "@/app/providers/authProvider";

const MasterPage: FC = () => {
    const user = useAuth();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={10}>
                    <MasterProcedure uuid={user?.user?._id as string} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MasterPage;