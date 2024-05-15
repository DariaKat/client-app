import { FC, useState } from "react";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NoData } from "@/shared/ui/NoData/NoData";
import Diversity1Icon from '@mui/icons-material/Diversity1';

const MainPage: FC = () => {
    const [closeAlert, setCloseAlert] = useState(true);

    const onClose = () => setCloseAlert(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={4}>
                    {closeAlert &&
                        <Alert severity="info" onClose={onClose} style={{ marginBottom: '24px' }}>
                            Спасибо, что решили воспользоваться нашим приложением!
                        </Alert>}
                </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={6} container>
                    <NoData icon={<Diversity1Icon />} text='Сервис онлайн-записи для бьюти-мастеров предоставляет удобный и быстрый способ для клиентов записаться на услуги, а также упрощает работу самих мастеров, сокращая время на обработку заявок и повышая эффективность работы салона красоты.' />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MainPage;