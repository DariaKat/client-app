import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/providers/authProvider";
import { IPanel } from "./userSlice";

export const fetchProfiles = createAsyncThunk(
    "adminPanel/fetchGetProfiles",
    async () => {
        try {
            const refDocs = collection(db, "UserProfile");
            const querySnapshot = await getDocs(refDocs);
            if (querySnapshot) { 
                const data: IPanel[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({_id: doc.data()._id, name: doc.data().name, role: doc.data().role});
                });
                            
                return {data};
            }
            else {
                return 'Ошибка получения данных';
            }
        } catch (err) {
            return `${err}`;
        }  
    }
);