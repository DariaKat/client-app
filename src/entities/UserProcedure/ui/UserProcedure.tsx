import { FC } from "react";
import style from "./UserProcedure.module.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useGetUserProcedure } from "../hooks/useGetUserProcedure";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/providers/authProvider";

interface IUserProcedureProps {
    uuid: string;
}

export const UserProcedure: FC<IUserProcedureProps> = ({ uuid }) => {
    const { procedure } = useGetUserProcedure(uuid);

    const onClick = (id: string) => async () => {
        if (procedure) { 
            await deleteDoc(doc(db, "AppointmentsProcedure", id));
            await deleteDoc(doc(db, "UserProcedure", id));
        }
    }; 

    return (
        <div className={style.userProcedure}>
            {procedure && <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Дата</TableCell>
                            <TableCell>Время</TableCell>
                            <TableCell>Наименование</TableCell>
                            <TableCell>Действие</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {procedure.map((item) => (
                            <TableRow
                                key={item._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item?.date}
                                </TableCell>
                                <TableCell>{item?.time}</TableCell>
                                <TableCell>{item?.procedure}</TableCell>
                                <TableCell>
                                    <Button onClick={onClick(item._id)} variant="outlined" color="error">
                                        Отменить запись
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) } 
                    </TableBody>
                </Table>
            </TableContainer>}    
        </div>
    );
};

