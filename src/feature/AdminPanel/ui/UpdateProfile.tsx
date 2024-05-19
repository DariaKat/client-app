import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';  
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IPanel } from "../model/userSlice";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/providers/authProvider"; 
import style from './AdminPanel.module.scss';

interface IUpdateProfileProps {
    onClose: () => void;
    data: IPanel;
}

const role = ['MASTER', 'ADMIN', 'USER'];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface IProps { 
    role: string;
}

export const UpdateProfile: FC<IUpdateProfileProps> = ({ onClose, data }) => {
    const { handleSubmit, control } = useForm<IProps>();

    const onSubmit = async (role: IProps) => { 
        await updateDoc(doc(db, "UserProfile", data._id), {
            role: role.role,
        });

        onClose();
    };

    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={Boolean(open)}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Редактировать роль пользователя
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[600],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Выберите роль</InputLabel>
                        <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                                <Select
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...field}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Выберите дату"
                                >
                                    {role.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                    <Button variant="contained" type="submit">
                        Обновить
                    </Button>
                </form>
            </DialogContent>
        </BootstrapDialog>
    );
};

