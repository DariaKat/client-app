import { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

import style from "./Post.module.scss";

interface IPostProps {
    user: string;
    time: string;
    content: {
        text: string;
        imgs?: string[];
    };
    avatar?: string;
}

export const Post: FC<IPostProps> = ({ user, time, content, avatar}) => {
    return (
        <div className={style.post}>
            <div className={style.post_header}>
                <Avatar sx={{ bgcolor: deepPurple[500] }} alt={user} src={avatar}>
                    {user}
                </Avatar>
                <div className={style.post_header_title}>
                    <Link className={style.post_link} to="/user/123"> {user} </Link>
                    <span className={style.post_time}>{time}</span>
                </div>
            </div>
            <div className={style.post_body}>{content.text}</div>
        </div>
    );
};

