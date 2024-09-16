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
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => onClose()}>
          close
        </Button>
      </form>
    </div>
  );
}
