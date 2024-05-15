import { ChangeEvent, FC, useState } from 'react';
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/providers/authProvider";
import useEmblaCarousel from 'embla-carousel-react';
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import { useGetImages } from '../hooks/useGetImages';
import { DetailImage } from './DetailImage';

import style from './Carousel.module.scss';


interface ICarouselProps {
    uuid: string;
    isMyPage: boolean;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const OPTIONS = {
    dragFree: true,
    loop: true,
    watchSlides: false,
    watchResize: false
};

export const Carousel: FC<ICarouselProps> = ({uuid, isMyPage}) => {
    const [emblaRef] = useEmblaCarousel(OPTIONS);

    const { imagesCarousel } = useGetImages(uuid);

    const [detailImage, setDetailImage] = useState<string | null>(null);

    const onOpen = (url: string) => () => { 
        setDetailImage(url);
    };

    const onClose = () => { 
        setDetailImage(null);
    };

    const handleFileUploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const storageRef = ref(storage, `posts/${uuid}/${selectedFile.name}`);
            await uploadBytesResumable(storageRef, selectedFile);
        }
    };

    return (
        <div className={style.container}>
            {isMyPage && 
            <Button className={style.button}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}>
                Добавить фото
                <VisuallyHiddenInput type="file" onChange={handleFileUploadAvatar} />
            </Button>}
            <div className={style.embla}>
                {imagesCarousel?.length ?
                    <div className={style.embla__viewport} ref={emblaRef}>
                        <div className={style.embla__container}>
                            {
                                imagesCarousel?.map(item =>
                                    <div key={item} className={style.embla__slide} onClick={onOpen(item)}>
                                        <img src={item} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    : 'Здесь нет изображений'}
                <DetailImage url={detailImage} onClose={onClose} />
            </div>
        </div>    
    );
};
