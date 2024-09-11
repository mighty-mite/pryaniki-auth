import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "./Main.css";

export default function MainPage() {
  return (
    <section className="main">
      <h2 className="main__heading">Main Page</h2>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Company Signature Date</TableCell>
            <TableCell>Company Signature Name</TableCell>
            <TableCell>Document Name</TableCell>
            <TableCell>Document Status</TableCell>
            <TableCell>Document Type</TableCell>
            <TableCell>Employee Number</TableCell>
            <TableCell>Employee Signature Date</TableCell>
            <TableCell>Employee Signature Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
            <TableCell>4</TableCell>
            <TableCell>5</TableCell>
            <TableCell>6</TableCell>
            <TableCell>7</TableCell>
            <TableCell>8</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}
