import { FC } from "react";
import Button from '@mui/material/Button';

import { TextArea } from "@/shared/ui/TextArea/TextArea";

import style from "./CreatePost.module.scss";

interface ICreatePostProps {

}

export const CreatePost: FC<ICreatePostProps> = () => {
    return (
        <div className={style.createPost}>
            <TextArea isAddFile />
            
            <div className={style.createPost_footer}>
                <Button className={style.createPost_send} variant="contained" style={{marginLeft: 'auto', maxWidth: '200px'}}>
                    Опубликовать
                </Button>
            </div>
        </div>
    );
};

