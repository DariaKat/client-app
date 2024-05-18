import { FC, useState } from "react";
import Button from "@mui/material/Button";
import AddressIcon from "@/shared/assets/routing-2-svgrepo-com.svg?react";
import PhoneIcon from "@/shared/assets/phone-rounded-svgrepo-com.svg?react";
import EmailIcon from "@/shared/assets/mailbox-svgrepo-com.svg?react";
import TelegramIcon from "@/shared/assets/telegram-svgrepo-com.svg?react";
import VkIcon from "@/shared/assets/vk-v2-svgrepo-com.svg?react";

import style from "./ContactInfo.module.scss";
import { useGetContactInfo } from "../hooks/useGetContactInfo";
import { FormContact } from "./FormContact";
import { AddProcedureDialog } from "@/entities/AddProcedureDialog";

interface IContactInfoProps {
    uuid: string;
    myUuid: string;
    isMyPage: boolean;
}

export const ContactInfo: FC<IContactInfoProps> = ({ uuid, myUuid, isMyPage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenProcedure, setIsOpenProcedure] = useState(false);

    const onOpen = () => { 
        setIsOpen(true);
    };

    const onClose = () => { 
        setIsOpen(false);
    };

    const onOpenProcedure = () => { 
        setIsOpenProcedure(true);
    };

    const onCloseProcedure = () => { 
        setIsOpenProcedure(false);
    };


    const { contact } = useGetContactInfo(uuid);

    return (
        <>
            {isMyPage && <div className={style.contactInfo_update}>
                <Button variant="contained" onClick={onOpen}>Обновить</Button>
                {isOpen && <FormContact open={isOpen} onClose={onClose} uuid={uuid} defaultData={contact} />}
            </div>}
            <div className={style.contactInfo}>
                {contact && <div className={style.contactInfo__item}>
                    <div className={style.contactInfo__item_info}>
                        <AddressIcon />
                        <span className={style.contactInfo__item_title}>Адрес: </span>
                        <span className={style.contactInfo__item_name}>{contact.address}</span>
                    </div>
                    <div className={style.contactInfo__item_info}>
                        <PhoneIcon />
                        <span className={style.contactInfo__item_title}>Телефон: </span>
                        <span className={style.contactInfo__item_name}>{contact.phone}</span>
                    </div>
                    <div className={style.contactInfo__item_info}>
                        <EmailIcon />
                        <span className={style.contactInfo__item_title}>Почта: </span>
                        <span className={style.contactInfo__item_name}>{contact.email}</span>
                    </div>
                    <div className={style.contactInfo__item_social}>
                        <span>Социальные сети:</span>
                        <div className={style.contactInfo__item_social__icons}>
                            <a href={contact.telegram} target="_blank" rel="noopener noreferrer"><TelegramIcon /></a>
                            <a href={contact.vk} target="_blank" rel="noopener noreferrer"><VkIcon /></a>
                        </div>
                    </div>
                </div>}
                <div className={style.contactInfo__item}>
                    <Button className={style.procedure_btns} variant="contained" onClick={onOpenProcedure}>Запись</Button>
                    {isOpenProcedure && <AddProcedureDialog onClose={onCloseProcedure} uuid={uuid} myUuid={myUuid} />}
                </div>
            </div>
        </>
       
    );
};
