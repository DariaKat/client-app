import { FC } from "react";
import Box from '@mui/material/Box';

import { Profile } from "@/widgets/Profile";

const UserPage: FC = () => {  
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Profile />
        </Box>
    );
};

export default UserPage;