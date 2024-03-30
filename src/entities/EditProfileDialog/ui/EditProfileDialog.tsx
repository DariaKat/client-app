import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';    
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, useAuth, storage } from "@/app/providers/authProvider";
import { UploadFile } from "./UploadFile";
import { TextFieldController } from "@/shared/ui/TextFieldController/TextFieldController";

import style from "./EditProfileDialog.module.scss";




interface IEditProfileDialogProps {
    open: boolean;
    handleClose: () => void;
    profile: Profile;
}

export const EditProfileDialog: FC<IEditProfileDialogProps> = ({ handleClose, open, profile }) => {
    const { handleSubmit, control } = useForm<FormEditProfile>();
    const user = useAuth();
    const navigate = useNavigate();

    const [fileAvatar, setFileAvatar] = useState<File | null>(null);
    const [fileBackground, setFileackground] = useState<File | null>(null);

    const onSubmit = async (data: FormEditProfile) => {
        let photoUrl: string | null = null;
        let photoBackgroundUrl: string | null = null;
        if (fileAvatar) {
            const storageRef = ref(storage, `avatar/${user?.user?._id}`);
            await uploadBytesResumable(storageRef, fileAvatar);
            photoUrl = await getDownloadURL(storageRef);
        }
        if (fileBackground) {
            const storageRef = ref(storage, `background/${user?.user?._id}`);
            await uploadBytesResumable(storageRef, fileBackground);
            photoBackgroundUrl = await getDownloadURL(storageRef);
        }

        await setDoc(doc(db, "UserProfile", String(user?.user?._id)), {
            _id: user?.user?._id,
            avatarUrl: photoUrl ? photoUrl : profile.avatarUrl,
            backgroundUrl: photoBackgroundUrl ? photoBackgroundUrl : profile.backgroundUrl,
            role: profile.role,
            ...data,
        });

        navigate(0);

        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Редактирование профиля</DialogTitle>
            <DialogContent className={style.dialog}>
                <DialogContentText>
                    <UploadFile setFile={setFileAvatar} title="Аватар" className={style.upload_avatar} defaultUrl={profile.avatarUrl} />
                    <UploadFile setFile={setFileackground} title="Обложка" className={style.upload_img} defaultUrl={profile.backgroundUrl}/>
                    <form className={style.form} id="myform" onSubmit={handleSubmit(onSubmit)}>
                        <TextFieldController
                            name="name"
                            label="Имя пользователя"
                            defaultValue={profile.name}
                            control={control}
                        />
                        <TextFieldController
                            name="description"
                            label="Описание в профиле"
                            defaultValue={profile.description}
                            control={control}
                        />
                       
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" type="submit" form="myform">
                    Обновить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

