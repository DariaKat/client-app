import { FC } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useAuth } from "@/app/providers/authProvider";
import style from "./ActionMasterProfile.module.scss";

interface IActionMasterProfileProps {

}

export const ActionMasterProfile: FC<IActionMasterProfileProps> = () => {
    const user = useAuth();

    return (
        <div className={style.actionMasterProfile}>
            <ButtonGroup variant="contained" aria-label="Basic button group">
                {/* <Button>Расписание</Button> */}
                <Link to={`/user/${user?.user?._id}/master`}><Button>Записи</Button></Link>
            </ButtonGroup>
        </div>
    );
};

