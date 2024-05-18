import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchListData } from "../model/fetchListData";
import { IPriceList, priceSelector } from "../model/listSlice";

export const useGetPriceList = (uuid: string): {priceList: IPriceList | null} => {
    const dispatch = useAppDispatch();
    const priceList = useAppSelector(priceSelector);

    const getInfo = useCallback(async () => { 
        dispatch(fetchListData(uuid));
    }, [uuid, dispatch]);

    useEffect(() => { getInfo(); }, [getInfo]);

    return {priceList: priceList?.priceList};
};