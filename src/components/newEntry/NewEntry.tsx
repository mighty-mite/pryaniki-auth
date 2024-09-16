import { Button } from "@mui/material";

interface Props {
  onAdd: () => void;
}

export default function NewEntry(onAdd: Props) {
  return (
    <Button
      onClick={() => onAdd}
      variant="contained"
      style={{ position: "absolute", right: "0", top: "0" }}>
      New Entry
    </Button>
  );
}
