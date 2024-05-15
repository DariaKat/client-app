import { FC } from "react";
import { TextFieldController } from "@/shared/ui/TextFieldController/TextFieldController";
import { useForm } from "react-hook-form";
import { IProps } from "../types/types";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';  
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DocumentData, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/providers/authProvider";

import style from "./ContactInfo.module.scss";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface IFormContactProps {
    open: boolean;
    uuid: string;
    onClose: () => void;
    defaultData: DocumentData | null;
}

export const FormContact: FC<IFormContactProps> = ({ open, uuid, onClose, defaultData }) => {
    const { handleSubmit, control } = useForm<IProps>();

    const onSubmit = async (data: IProps) => { 
        await setDoc(doc(db, "DetailInfoMasterProfile", uuid), {
            _id: uuid,
            ...data,
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
                Изображение
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
                <form className={style.data} onSubmit={handleSubmit(onSubmit)}>
                    <TextFieldController name="address" label="Адрес" control={control} defaultValue={defaultData?.address} />
                    <TextFieldController name="phone" label="Телефон" control={control} defaultValue={defaultData?.phone}/>
                    <TextFieldController name="email" label="Почта" control={control} defaultValue={defaultData?.email}/>
                    <TextFieldController name="vk" label="Ссылка на ВК" control={control} required={false} defaultValue={defaultData?.vk}/>
                    <TextFieldController name="telegram" label="Ссылка на Телеграм" control={control} required={false} defaultValue={defaultData?.telegram}/>
                    <Button variant="contained" type="submit">
                        Обновить
                    </Button>
                </form>
            </DialogContent>
        </BootstrapDialog>
    );
};

