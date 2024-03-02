import { FC } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';

import { TextFieldController } from "@/shared/ui/TextFieldController/TextFieldController";
import WomenHeart from "@/shared/assets/woman-with-heart.svg?react";

import style from "./Form.module.scss";

interface IFormProps {
  onSubmit: (data: FormInterface) => void;
  registr?: boolean;
}

export const Form: FC<IFormProps> = ({ onSubmit, registr }) => {
    const { handleSubmit, control } = useForm<FormInterface>();

    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <WomenHeart />
            <Typography variant="h5" gutterBottom>
                {registr ? "Регистрация" : "Авторизация"}
            </Typography>
            <TextFieldController name="login" label="Электронная почта" control={control} />
            <TextFieldController
                name="password"
                label="Пароль"
                control={control}
                type="password"
            />
            {registr && (
                <TextFieldController
                    name="name"
                    label="Имя пользователя"
                    control={control}
                />
            )}
            <Button variant="contained" type="submit">
                {registr ? "Зарегистрироваться" : "Войти"}
            </Button>
            {!registr && (
                <span className={style.form_description}>
                    Если у вас нет профиля, то {" "}
                    <Link className={style.form_link} to="/registr">
                        зарегистрируетесь
                    </Link>
                </span>
            )}
        </form>
    );
};
