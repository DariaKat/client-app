import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";

interface IProps { 
    imagesCarousel: string[];
}

export const useGetImages = (uuid: string): IProps => { 
    const [imagesCarousel, setImagesCarousel] = useState<string[]>([]);

    const getImages = useCallback(async () => {
        const storage = getStorage();
        const listRef = ref(storage, `posts/${uuid}`);
      
        // Получить все изображения для профиля
        const firstPage = await listAll(listRef);

        if (firstPage) { 
            const arrayPromises: Promise<string>[] = [];
            firstPage.items.forEach((item) => { 
                const detailRef = ref(storage, item.fullPath);
                arrayPromises.push(getDownloadURL(detailRef));
            });
            
            Promise.all(arrayPromises)
                .then((array) => {
                    setImagesCarousel([...array]);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [uuid]);

    useEffect(() => { getImages(); }, [getImages]);

    return { imagesCarousel };
};