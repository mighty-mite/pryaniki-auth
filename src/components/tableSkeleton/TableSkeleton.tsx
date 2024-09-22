import { Skeleton, TableCell, TableRow } from "@mui/material";

export default function TableSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="rounded" animation="wave" height={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" animation="wave" height={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" animation="wave" height={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" animation="wave" height={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" animation="wave" height={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" animation="wave" height={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" animation="wave" height={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" animation="wave" height={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" animation="wave" height={60} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" animation="wave" height={60} />
      </TableCell>
    </TableRow>
  );
}
