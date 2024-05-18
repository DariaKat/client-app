import { FC, useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { Controller, useFormContext } from "react-hook-form";
import { timeSelector } from "../model/listTimeSlice";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from '@mui/material/Select';   
import style from "./AddProcedureDialog.module.scss";

interface ISecondStepProps {}

export const SecondStep: FC<ISecondStepProps> = () => {
    const timeList = useAppSelector(timeSelector);
    const { control } = useFormContext();
    const [selectedDate, setSelectedDate] = useState('');

    const handleChange = (event: string) => {
        setSelectedDate(event);
    };

    return (
        <div className={style.secondStep}>
            {timeList && (
                <div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Выберите дату</InputLabel>
                        <Controller
                            control={control}
                            name="date"
                            render={({ field }) => (
                                <Select
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...field}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Выберите дату"
                                    onChange={(e) => {
                                        const value = e.target ? e.target.value : '';
                                        field.onChange(value);
                                        handleChange(value);
                                    }}
                                >
                                    {timeList.timeList?.segments.map((item, index) => (
                                        <MenuItem key={index} value={item.date}>
                                            {item.date}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>

                    <div>
                        {selectedDate && (<Controller
                            control={control}
                            name="time"
                            render={({ field }) => (
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...field}
                                >
                                    {timeList.timeList?.segments
                                        .find((item) => item.date === selectedDate)
                                        ?.times.map((time, index) => (
                                            <FormControlLabel
                                                key={index}
                                                value={time}
                                                control={<Radio />}
                                                label={time}
                                            />
                                        ))}
                                </RadioGroup>
                            )}
                        />)}
                    </div>
                </div>
            )}
        </div>
    );
};
