import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "./Main.css";
import useHttp from "../utils/useHttp";
import { useEffect, useState } from "react";
import { TableData } from "../utils/types";

export default function MainPage() {
  const { getTable, deleteTableRow } = useHttp();
  const [tableData, setTableData] = useState<TableData[]>([]);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token) getTable(token).then((data) => setTableData(data));
  }, [token, tableData]);

  const onDelete = (id: string) => {
    if (token) deleteTableRow(token, id);
  };

  const renderIt = (arr: TableData[]) => {
    return arr.map((item) => {
      return (
        <TableRow key={item.id}>
          <TableCell>{item.companySigDate}</TableCell>
          <TableCell>{item.companySignatureName}</TableCell>
          <TableCell>{item.documentName}</TableCell>
          <TableCell>{item.documentStatus}</TableCell>
          <TableCell>{item.documentType}</TableCell>
          <TableCell>{item.employeeNumber}</TableCell>
          <TableCell>{item.employeeSigDate}</TableCell>
          <TableCell>{item.employeeSignatureName}</TableCell>
          <TableCell>
            <Button
              onClick={() => onDelete(item.id)}
              size="small"
              variant="contained"
              color="error">
              Delete
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  const content = renderIt(tableData);

  return (
    <section className="main">
      <h2 className="main__heading">Main Page</h2>
      <div></div>
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
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{content}</TableBody>
      </Table>
    </section>
  );
}
