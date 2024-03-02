import { FC, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';

import { ga } from "@/app/providers/authProvider/config/firebase";
import { Form } from "@/entities/form";

const LoginPage: FC = () => {
    const navigate = useNavigate();
    
    const [open, setOpen] = useState<boolean>(false);

    const onSubmit = async (data: FormInterface) => { 
        try {
            const user = await signInWithEmailAndPassword(
                ga,
                data.login,
                data.password
            );
            user && navigate("/");
        } catch (error: unknown) {
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
                        <Form onSubmit={onSubmit} />
                    </div>
                    <Snackbar
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message="Неправильно введены почта или пароль"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;