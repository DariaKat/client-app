import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from "@/app/store/hooks";
import { ProfileHeader } from "@/entities/Profile";
import { userSelector } from "../../model/userSlice";
import { Carousel } from '@/entities/Carousel';
import { PriceList } from '@/entities/PriceList';
import { ContactInfo } from '@/entities/ContactInfo';
import { useAuth } from "@/app/providers/authProvider";
// import './MasterProfile.module.scss';

export const MasterProfile: FC = () => {
    const getProfile = useAppSelector(userSelector);
    const params = useParams();
    const user = useAuth();

    return (
        <div>
            {getProfile.profile && <ProfileHeader profile={getProfile.profile} />}
            <div><Carousel uuid={params.userId as string} isMyPage={ user?.user?._id === params.userId} /></div>
            <div><ContactInfo uuid={params.userId as string} isMyPage={ user?.user?._id === params.userId}/></div>
            <div><PriceList uuid={params.userId as string} isMyPage={ user?.user?._id === params.userId}/></div>
        </div>
    );
};
