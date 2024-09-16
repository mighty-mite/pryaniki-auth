import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "./Main.css";
import useHttp from "../../utils/useHttp";
import { useEffect, useState } from "react";
import { TableData } from "../../utils/types";
import TableSkeleton from "../../components/tableSkeleton/TableSkeleton";
import { createPortal } from "react-dom";
import Modal from "../../components/modal/Modal";

export default function MainPage() {
  const { getTable, deleteTableRow } = useHttp();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token)
      getTable(token).then((data) => {
        setTableData(data);
        setIsLoading(false);
      });
  }, [token, tableData]);

  const onDelete = (id: string) => {
    if (token) deleteTableRow(token, id);
  };

  const renderData = (arr: TableData[]) => {
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

  const content = renderData(tableData);
  const loader = isLoading ? <TableSkeleton /> : null;

  return isLoading ? (
    loader
  ) : (
    <section className="main">
      <div className="main__header">
        <h2 className="main__heading">Main Page</h2>
        <Button
          onClick={() => setShowModal(true)}
          variant="contained"
          style={{ position: "absolute", right: "0", top: "0" }}>
          New Entry
        </Button>
      </div>
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
      {showModal &&
        createPortal(
          <Modal onClose={() => setShowModal(false)} />,
          document.body
        )}
    </section>
  );
}
