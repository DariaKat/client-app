import { FC, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/providers/authProvider";

import { IPanel } from '../model/userSlice';
import { UpdateProfile } from './UpdateProfile';
import { useGetData } from '../hooks/useGetData';

import style from './AdminPanel.module.scss';


export const AdminPanel: FC = () => {
    const { profiles, loading } = useGetData();

    const [isOpen, setIsOpen] = useState<IPanel | null>(null);

    const deleteProfile = (id: string) => async () => { 
        await deleteDoc(doc(db, "UserProfile", id));
    };

    const onOpen = (row: IPanel) => () => {
        setIsOpen(row);
    };

    const onClose = () => { 
        setIsOpen(null);
    };

    return (
        <div className={style.adminPanel}>
            {loading ?
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress
                        color="secondary"
                        variant="indeterminate"
                    />
                </div> :
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID пользователя</TableCell>
                                <TableCell>Имя пользователя</TableCell>
                                <TableCell>Роль пользователя</TableCell>
                                <TableCell align='center'>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {profiles?.data?.map((row) => (
                                <TableRow
                                    key={row._id}
                                >
                                    <TableCell>{row._id}</TableCell>
                                    <TableCell>
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.role}</TableCell>
                                    <TableCell>
                                        <div className={style.adminPanel_actions}>
                                            <Button variant="contained" onClick={onOpen(row)}><ModeEditIcon /></Button>
                                            <Button variant="contained" onClick={deleteProfile(row._id)}><DeleteIcon /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
            {isOpen && <UpdateProfile data={isOpen} onClose={onClose} />}
        </div>
    );
};
