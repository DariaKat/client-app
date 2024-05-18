import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/providers/authProvider";

export const fetchListData = createAsyncThunk(
    "price/fetchListData",
    async (id: string) => {
        try {
            const docRef = doc(db, "PriceProcedureMaster", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return 'Нет информации';
            }
        } catch (err) {
            return `${err}`;
        } 
    }
);