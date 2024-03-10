import { FC } from "react";
import TextField from '@mui/material/TextField';
import { Control, Controller } from "react-hook-form";


interface ITextFieldControllerProps {
    name: NameType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    label: string;
    type?: string;
    required?: boolean;
}

export const TextFieldController: FC<ITextFieldControllerProps> = ({ name, control, label, type, required = true }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="outlined"
                    type={type}
                    aria-describedby="component-error-text"
                    required={required}
                />
            )}
        />
    );
};

