import { FC, useState } from "react";
import Button from "@mui/material/Button";

import { EditProfileDialog } from "@/entities";

import style from "./EditProfileAction.module.scss";

interface IProps { 
    profile: Profile;
}

export const EditProfileAction: FC<IProps> = ({ profile }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={style.editProfileAction}>
            <Button variant="contained" onClick={handleClickOpen}>Редактировать</Button>
            <EditProfileDialog open={open} handleClose={handleClose} profile={ profile } />
        </div>
    );
};

