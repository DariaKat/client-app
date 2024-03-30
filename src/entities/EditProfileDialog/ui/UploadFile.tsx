import { ChangeEvent, FC, useState } from "react";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import style from "./EditProfileDialog.module.scss";

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

interface IUploadFileProps {
    title: string;
    setFile: (file: File | null) => void;
    className?: string;
    defaultUrl?: string;
}

export const UploadFile: FC<IUploadFileProps> = ({ title, setFile, className, defaultUrl }) => {
    const [url, setUrl] = useState(defaultUrl || '');

    const handleFileUploadAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);

            //для отображения изображения
            const reader = new FileReader();
            reader.onloadend = () => {
                setUrl(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
              
        }
    };

    return (
        <div className={className}>
            <Typography variant="h6">
                {title}
            </Typography>
            {url ? <img alt="Аватар" src={String(url)} className={style.image} /> : 'У Вас нет изображения'}
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
    );
};

