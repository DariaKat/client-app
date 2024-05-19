import { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useAppSelector } from "@/app/store/hooks";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/providers/authProvider";
import { useGetTimesSegment } from "../hooks/getTimesSegment";
import { timeSelector } from "../model/listTimeSlice";
import { v4 as uuidv4 } from 'uuid';

interface IAddProcedureDialogProps {
  onClose: () => void;
  uuid: string;
  myUuid: string;
}

interface ISubmitForm {
  procedure: string;
  time: string;
  date: string;
}

const steps = ["Выберите процедуру", "Выберите время"];

type StepElements = {
  [key: string]: JSX.Element;
};

const formStep: StepElements = {
    "0": <FirstStep />,
    "1": <SecondStep />,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export const AddProcedureDialog: FC<IAddProcedureDialogProps> = ({
    onClose,
    uuid,
    myUuid,
}) => {
    const methods = useForm<ISubmitForm>();
    const timeList = useAppSelector(timeSelector);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit: SubmitHandler<ISubmitForm> = async (data: ISubmitForm) => {
        const updatedData: { date: string; times: string[] }[] | undefined =
          timeList.timeList?.segments?.reduce(
              (acc: { date: string; times: string[] }[], item) => {
                  if (item.date === data.date && item.times.includes(data.time)) {
                      const updatedTimes = item.times.filter((t) => t !== data.time);
                      if (updatedTimes.length > 0) {
                          acc.push({ ...item, times: updatedTimes });
                      }
                  } else if (item.times.length > 0) {
                      acc.push(item);
                  }
                  return acc;
              },
              []
          );
      
        const uuidId = uuidv4();
        
        
        await setDoc(doc(db, "UserProcedure", uuidId), {
            ...data,
            _id: uuidId,
            masterUuid: uuid,
            userUuid: myUuid,
        });
        await setDoc(doc(db, "AppointmentsProcedure", uuidId), {
            ...data,
            _id: uuidId,
            userUuid: myUuid,
            masterUuid: uuid,
        });
      
        const washingtonRef = doc(db, "MasterProcedure", uuid);
        await updateDoc(washingtonRef, { _id: uuid, segments: updatedData });
      
        handleNext();
    };

    useGetTimesSegment(uuid);

    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={Boolean(open)}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Запись на процедуру
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[600],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
              optional?: React.ReactNode;
            } = {};
                        return (
                        // eslint-disable-next-line react/jsx-props-no-spreading
                            <Step key={label} {...stepProps}>
                                {/* eslint-disable-next-line react/jsx-props-no-spreading*/}
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Вы записаны. Можете проверить свою запись в профиле.
                        </Typography>
                    </>
                ) : (
                    <>
                        <>
                            {/* eslint-disable-next-line react/jsx-props-no-spreading*/}
                            <FormProvider {...methods}>
                                <form id="example">{formStep[`${activeStep}`]}</form>
                            </FormProvider>
                        </>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Назад
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            {activeStep === steps.length - 1 ? (
                                <Button onClick={methods.handleSubmit(onSubmit)}>Готово</Button>
                            ) : (
                                <Button onClick={handleNext}>Следующий шаг</Button>
                            )}
                        </Box>
                    </>
                )}
            </DialogContent>
        </BootstrapDialog>
    );
};
