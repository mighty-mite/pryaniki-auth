import { Button } from "@mui/material";

interface Props {
  showModal: (a: boolean) => void;
}

export default function ShowModalBtn(props: Props) {
  const { showModal } = props;
  return (
    <Button
      onClick={() => showModal(true)}
      variant="contained"
      style={{ position: "absolute", right: "0", top: "0" }}>
      New Entry
    </Button>
  );
}
