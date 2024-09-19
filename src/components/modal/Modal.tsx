import useHttp from "../../utils/useHttp";
import { Button, TextField } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";

import "./Modal.css";
import { ModalFormValues } from "../../utils/types";

interface Props {
  onClose: () => void;
  token: string;
}

const schema = yup
  .object({
    companySigDate: yup.string().required(),
    companySignatureName: yup.string().required(),
    documentName: yup.string().required(),
    documentStatus: yup.string().required(),
    documentType: yup.string().required(),
    employeeNumber: yup.string().required(),
    employeeSigDate: yup.string().required(),
    employeeSignatureName: yup.string().required(),
  })
  .required();

const defaultValues = {
  companySigDate: "",
  companySignatureName: "",
  documentName: "",
  documentStatus: "",
  documentType: "",
  employeeNumber: "",
  employeeSigDate: "",
  employeeSignatureName: "",
};

export default function Modal(props: Props) {
  const { onClose, token } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    register,
    reset,
  } = useForm<ModalFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ModalFormValues> = (data) => {
    data.companySigDate = new Date(data.companySigDate).toISOString();
    data.employeeSigDate = new Date(data.employeeSigDate).toISOString();
    console.log(data);
    const newEntry = { ...data, id: uuidv4() };
    createTableRow(token, newEntry);
    reset();
  };

  const { createTableRow } = useHttp();

  return (
    <div className="modal">
      <form onSubmit={handleSubmit(onSubmit)} className="modal__form">
        <Controller
          render={({ field }) => (
            <TextField
              placeholder="Company Signature Name"
              size="small"
              {...field}
              onBlur={() => trigger("companySignatureName")}
              error={!!errors.companySignatureName}
              helperText={errors?.companySignatureName?.message ?? " "}
            />
          )}
          name="companySignatureName"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <TextField
              placeholder="Document Name"
              size="small"
              {...field}
              onBlur={() => trigger("documentName")}
              error={!!errors.documentName}
              helperText={errors?.documentName?.message ?? " "}
            />
          )}
          name="documentName"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <TextField
              placeholder="Document Status"
              size="small"
              {...field}
              onBlur={() => trigger("documentStatus")}
              error={!!errors.documentStatus}
              helperText={errors?.documentStatus?.message ?? " "}
            />
          )}
          name="documentStatus"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <TextField
              placeholder="Document Type"
              size="small"
              {...field}
              onBlur={() => trigger("documentType")}
              error={!!errors.documentType}
              helperText={errors?.documentType?.message ?? " "}
            />
          )}
          name="documentType"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <TextField
              placeholder="Employee Number"
              size="small"
              {...field}
              onBlur={() => trigger("employeeNumber")}
              error={!!errors.employeeNumber}
              helperText={errors?.employeeNumber?.message ?? " "}
            />
          )}
          name="employeeNumber"
          control={control}
        />

        <Controller
          render={({ field }) => (
            <TextField
              placeholder="Employee Signature Name"
              size="small"
              {...field}
              onBlur={() => trigger("employeeSignatureName")}
              error={!!errors.employeeSignatureName}
              helperText={errors?.employeeSignatureName?.message ?? " "}
            />
          )}
          name="employeeSignatureName"
          control={control}
        />

        <label className="modal__input-container">
          Choose Employee Signature Date
          <input
            type="datetime-local"
            step="1"
            {...register("employeeSigDate")}
            onBlur={() => trigger("employeeSigDate")}
          />
          {errors && (
            <p className="modal__error">{errors?.employeeSigDate?.message}</p>
          )}
        </label>

        <label className="modal__input-container">
          Company Signature Date
          <input
            type="datetime-local"
            step="1"
            {...register("companySigDate")}
            onBlur={() => trigger("companySigDate")}
          />
          {errors && (
            <p className="modal__error">{errors?.companySigDate?.message}</p>
          )}
        </label>

        <Button
          className="modal__btn close "
          variant="contained"
          color="error"
          onClick={() => onClose()}>
          close
        </Button>
        <Button type="submit" variant="contained">
          submit
        </Button>
      </form>
    </div>
  );
}
