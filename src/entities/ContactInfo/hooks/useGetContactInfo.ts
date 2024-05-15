import { useCallback, useEffect, useState } from "react";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "@/app/providers/authProvider";

export const useGetContactInfo = (uuid: string) => {
    const [contact, setContact] = useState<DocumentData | null>(null);

    const getInfo = useCallback(async () => { 
        try {
            const docRef = doc(db, "DetailInfoMasterProfile", uuid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data: DocumentData = docSnap.data();
                setContact(data);
            } else {
                console.log('Нет информации');
            }
        } catch (err) {
            return `${err}`;
        }  
    }, [uuid]);

    useEffect(() => { getInfo(); }, [getInfo]);

    return {contact};
};