import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TextareaAutosize from 'react-textarea-autosize';

import style from "./TextArea.module.scss";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

interface ITextAreaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
  isAddFile?: boolean;
}

export const TextArea: FC<ITextAreaProps> = (props) => {
    return (
        <div className={style.textArea}>
            <TextareaAutosize className={style.textArea_textarea} placeholder="Введите текст..." onChange={props.onChange}/>
            {props.isAddFile && (
                <Button
                    className={style.textArea_addFile}
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<AttachFileIcon />}
                    style={{padding: 0, minWidth: 32, width: 32, height: 32}}
                >
                    <VisuallyHiddenInput type="file" />
                </Button>
            )}
        </div>
    );
};
