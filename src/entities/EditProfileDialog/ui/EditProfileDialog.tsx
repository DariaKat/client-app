import { FC, useState, ChangeEvent } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography';
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { TextFieldController } from "@/shared/ui/TextFieldController/TextFieldController";

import style from "./EditProfileDialog.module.scss";
import { db, storage, useAuth } from "@/app/providers/authProvider";
import { convertStringToBuffer } from "../lib/convert";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

interface IEditProfileDialogProps {
    open: boolean;
    handleClose: () => void;
}

export const EditProfileDialog: FC<IEditProfileDialogProps> = ({ handleClose, open }) => {
    const { handleSubmit, control } = useForm<FormEditProfile>();
    const user = useAuth();

    const [imageUrlAvatar, setImageUrlAvatar] = useState<string | ArrayBuffer | null>(null);
    const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);

    const handleFileUploadAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setImageUrlAvatar(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async (data: FormEditProfile) => { 
        let photoUrl = null;
        if (imageUrlAvatar) { 
            const storageRef = ref(storage, `files/${user?.user?._id}`);
            const imgAvatar = typeof imageUrlAvatar === 'string' ? convertStringToBuffer(imageUrlAvatar) : imageUrlAvatar;
            await uploadBytesResumable(storageRef, imgAvatar);
            photoUrl = await getDownloadURL(storageRef);
        }

        await setDoc(doc(db, "UserProfile", String(user?.user?._id)), {
            _id: user?.user?._id,
            avatarUrl: photoUrl,
            role: 'ADMIN',
            ...data,
        });
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Редактирование профиля</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div className={style.upload_avatar}>
                        <Typography variant="h6">
                            Аватар
                        </Typography>
                        {imageUrlAvatar && <Avatar alt="Аватар" src={String(imageUrlAvatar)} sx={{ width: 100, height: 100 }} />}
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Загрузить фотографию
                            <VisuallyHiddenInput type="file" onChange={handleFileUploadAvatar}/>
                        </Button>
                    </div>
                    <div className={style.upload_img}>
                        <Typography variant="h6">
                            Обложка
                        </Typography>
                        {imageUrl && <img alt="Обложка" className={style.upload_img__image} src={String(imageUrl)} />}
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Загрузить фотографию
                            <VisuallyHiddenInput type="file" onChange={handleFileUpload}/>
                        </Button>
                    </div>
                    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                        <TextFieldController
                            name="name"
                            label="Имя пользователя"
                            control={control}
                        />
                        <TextFieldController
                            name="description"
                            label="Описание в профиле"
                            control={control}
                        />
                        <Button variant="contained" type="submit">
                            Обновить
                        </Button>
                    </form>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

