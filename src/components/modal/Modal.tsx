import { Button, TextField } from "@mui/material";
import "./Modal.css";

interface Props {
  onClose: () => void;
}

export default function Modal(props: Props) {
  const { onClose } = props;
  return (
    <div className="modal">
      <form className="modal__form" action="">
        <TextField placeholder="Company Signature Name" size="small" />
        <TextField placeholder="Document Name" size="small" />
        <TextField placeholder="Document Status" size="small" />
        <TextField placeholder="Document Type" size="small" />
        <TextField placeholder="Employee Number" size="small" />
        <TextField placeholder="Employee Signature Name" size="small" />
        <label htmlFor="company-signature-date">
          Choose Company Signature Date
        </label>
        <input id="company-signature-date" type="datetime-local" step="1" />
        <label htmlFor="employee-signature-date">
          Choose Employee Signature Date
        </label>
        <input id="employee-signature-date" type="datetime-local" step="1" />
        <Button variant="contained" color="error" onClick={() => onClose()}>
          close
        </Button>
        <Button variant="contained">submit</Button>
      </form>
    </div>
  );
}
