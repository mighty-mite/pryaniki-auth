import { Skeleton } from "@mui/material";

export default function TableSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Skeleton
        style={{ alignSelf: "center" }}
        variant="rounded"
        animation="wave"
        width={200}
        height={60}
      />
      <Skeleton variant="rounded" animation="wave" height={60} />
      <Skeleton variant="rounded" animation="wave" height={60} />
      <Skeleton variant="rounded" animation="wave" height={60} />
      <Skeleton variant="rounded" animation="wave" height={60} />
    </div>
  );
}
