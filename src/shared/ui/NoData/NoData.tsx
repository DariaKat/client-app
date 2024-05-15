import { FC } from "react";
import style from "./NoData.module.scss";

interface INoDataProps {
    text: string;
    icon?: JSX.Element;
    button?: JSX.Element;
}

export const NoData: FC<INoDataProps> = ({text,  icon, button}) => {
    return (
        <div className={style.noData}>
            {icon}
            <p>{text}</p>
            <div>{button}</div>
        </div>
    );
};

