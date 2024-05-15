import { FC, useState, ChangeEvent, FormEvent } from "react";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';  
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/providers/authProvider";

import style from './PriceList.module.scss';

interface IDialogModalPriceListProps {
    uuid: string;
    defaultValue: {
        name: string, price: string
    }[];
    onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export const DialogModalPriceList: FC<IDialogModalPriceListProps> = ({ onClose, defaultValue, uuid }) => {
    const [formData, setFormData] = useState(defaultValue);

    const addField = () => {
        setFormData([...formData, { name: '', price: '' }]);
    };

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newFormData = formData.map((item, idx) => {
            if (index === idx) {
                return { ...item, [event.target.name]: event.target.value };
            }
            return item;
        });
        setFormData(newFormData);
    };

    const handleRemoveField = (index: number) => {
        const newFormData = formData.filter((_, idx) => index !== idx);
        setFormData(newFormData);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        
        await setDoc(doc(db, "PriceProcedureMaster", uuid), {
            _id: uuid,
            priceList: formData,
        });

        onClose();
    };

    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={Boolean(open)}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Прайс-лист
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[600],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <form onSubmit={handleSubmit}>
                    {formData.map((data, index) => (
                        <div key={index} className={style.textFields_form}>
                            <TextField
                                onChange={(e) => handleInputChange(index, e)}
                                label={'Наименование процедуры'}
                                type="text"
                                name="name"
                                value={data.name}
                                variant="outlined"
                  
                            />
                            <TextField
                                onChange={(e) => handleInputChange(index, e)}
                                label={'Цена процедуры'}
                                type="text"
                                name="price"
                                value={data.price}
                                variant="outlined"
                  
                            />
                            <Button onClick={() => handleRemoveField(index)}>Удалить</Button>
                        </div>
                    ))}
                    <div className={style.btns}>
                        <Button onClick={addField}>Добавить поле</Button>
                        <Button variant="contained"  type="submit">Отправить</Button>
                    </div>
                </form>
            </DialogContent>
        </BootstrapDialog>
    );
};











