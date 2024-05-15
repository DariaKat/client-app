import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchProfiles } from "../model/fatchProfile";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { ProfileState, adminSelector } from "../model/userSlice";

export const useGetData = () => {
    const getProfile: ProfileState = useAppSelector(adminSelector);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getUserProfile = useCallback( () => {
        dispatch(fetchProfiles());
    }, [dispatch]);

    useEffect (() => {
        getUserProfile();  
    }, [getUserProfile]);

    useEffect(() => {
        typeof getProfile.error === 'string' && navigate('/404');
    }, [getProfile, navigate]);

    return { 
        profiles: getProfile.profiles,
        loading: getProfile.loading
    };
};