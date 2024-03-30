import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/providers/authProvider";

export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async (id: string) => {
        try {
            const docRef = doc(db, "UserProfile", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                return 'Ошибка получения данных';
            }
        } catch (err) {
            return `${err}`;
        }  
    }
);