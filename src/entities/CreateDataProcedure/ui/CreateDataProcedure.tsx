import { FC } from "react";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';  
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import style from "./CreateDataProcedure.module.scss";

interface ICreateDataProcedureProps {
    onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const CreateDataProcedure: FC<ICreateDataProcedureProps> = ({ onClose }) => {
    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={Boolean(open)}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Добавить даты
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
               
            </DialogContent>
        </BootstrapDialog>
    );
};

