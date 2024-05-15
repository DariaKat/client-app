import { FC, useState } from "react";
import Button from "@mui/material/Button";
import { DialogModalPriceList } from "./DialogModalPriceList";
import { useGetPriceList } from "../hooks/useGetPriceList";
import style from "./PriceList.module.scss";

interface IPriceListProps {
  uuid: string;
  isMyPage: boolean;
}

export const PriceList: FC<IPriceListProps> = ({ isMyPage, uuid }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = () => {
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
    };

    const { priceList } = useGetPriceList(uuid);

    return (
        <div className={style.priceList}>
            {isMyPage && (
                <>
                    <Button onClick={onOpen}>Добавить прайс-лист</Button>
                    {isOpen && <DialogModalPriceList onClose={onClose} uuid={uuid} defaultValue={priceList && priceList.priceList} />}
                </>
            )}
            <h1 className={style.priceList_title}>Прайс лист</h1>
            <div className={style.priceList_list}>
                {priceList && priceList.priceList.map((item: {name: string, price: string}, index: number) => 
                    <div className={style.priceList_list__item} key={index}>
                        <span className={style.priceList_list__item_name}>
                            {item.name}
                        </span>
                        <span className={style.priceList_list__item_border}></span>
                        <span className={style.priceList_list__item_price}>{item.price} ₽</span>
                    </div>
                )}
                
            </div>
        </div>
    );
};
