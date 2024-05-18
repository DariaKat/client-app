import { useCallback, useEffect } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { fetchListTimeData } from "../model/fetchListTime";

export const useGetTimesSegment = (uuid: string) => {
    const dispatch = useAppDispatch();

    const getInfo = useCallback(async () => { 
        dispatch(fetchListTimeData(uuid));
    }, [uuid, dispatch]);

    useEffect(() => { getInfo(); }, [getInfo]);

};
