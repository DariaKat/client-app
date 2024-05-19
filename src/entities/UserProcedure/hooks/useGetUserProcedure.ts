import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/providers/authProvider";

export interface IDataProps {
  _id: string;
  date: string;
  masterUuid: string;
  procedure: string;
  time: string;
  userUuid: string;
}

export const useGetUserProcedure = (uuid: string) => {
    const [procedure, setProcedure] = useState<IDataProps[] | null>(null);

    const getInfo = useCallback(async () => {
        try {
            const docRef = collection(db, "UserProcedure");
            const docSnap = query(docRef, where("userUuid", "==", uuid));
            const querySnapshot = await getDocs(docSnap);
            if (querySnapshot.empty) {
                setProcedure(null);
            } else {
                const data = querySnapshot.docs.map((doc) => doc.data() as IDataProps);
                setProcedure(data);
            }
        } catch (err) {
            return `${err}`;
        }
    }, [uuid]);

    useEffect(() => {
        getInfo();
    }, [getInfo]);

    return { procedure };
};