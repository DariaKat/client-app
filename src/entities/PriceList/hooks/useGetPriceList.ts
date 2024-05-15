import { useCallback, useEffect, useState } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "@/app/providers/authProvider";

export const useGetPriceList = (uuid: string) => {
    const [priceList, setPriceList] = useState<DocumentData | null>(null);

    const getInfo = useCallback(async () => { 
        try {
            const docRef = doc(db, "PriceProcedureMaster", uuid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data: DocumentData = docSnap.data();
                setPriceList(data);
            } else {
                console.log('Нет информации');
            }
        } catch (err) {
            return `${err}`;
        }  
    }, [uuid]);

    useEffect(() => { getInfo(); }, [getInfo]);

    return {priceList};
};