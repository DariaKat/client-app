import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Snackbar from '@mui/material/Snackbar';

import { ga } from "@/app/providers/authProvider/config/firebase";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Form } from "@/entities/form";

const RegistrPage: FC = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState<boolean>(false);

    const onSubmit = async (data: FormInterface) => { 
        try {
            const user = await createUserWithEmailAndPassword(
                ga,
                data.login,
                data.password
            );
      
            if (ga.currentUser) { 
                await updateProfile(ga.currentUser, {
                    displayName: data.name,
                });
            }
        
            user && navigate(`/user/${user.user.uid}`);
        } catch (error) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={10}>
                    <div style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                        <Form onSubmit={onSubmit} registr/>
                    </div>
                    <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message="При регистрации произошла ошибка"
                    />
                </Grid>
            </Grid>
           
        </Box>
    );
};

export default RegistrPage;