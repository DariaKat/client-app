import { FC } from 'react';
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

import { useGetData } from '../hooks/useGetData';

import style from './AdminPanel.module.scss';

export const AdminPanel: FC = () => {
    const { profiles, loading } = useGetData();

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
                                            <Button variant="contained"><ModeEditIcon /></Button>
                                            <Button variant="contained"><DeleteIcon /></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
           
        </div>
    );
};
