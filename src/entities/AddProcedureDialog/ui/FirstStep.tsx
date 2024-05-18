import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAppSelector } from "@/app/store/hooks";
import { priceSelector } from "@/entities/PriceList/model/listSlice";
import style from "./AddProcedureDialog.module.scss";

interface IFirstStepProps {}

export const FirstStep: FC<IFirstStepProps> = () => {
    const { priceList } = useAppSelector(priceSelector);

    const { control } = useFormContext();

    return (
        <div className={style.firstStep}>
            <Controller
                control={control}
                name="procedure"
                render={({ field }) => (
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...field}
                    >
                        {priceList &&
              priceList?.priceList?.map((item, index) => (
                  <FormControlLabel
                      key={index}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                  />
              ))}
                    </RadioGroup>
                )}
            />
        </div>
    );
};
