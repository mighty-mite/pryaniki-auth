import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "./Main.css";
import useRetrieve from "../../hooks/useRetrieve";
import { useEffect, useState } from "react";
import { TableData } from "../../utils/types";
import TableSkeleton from "../../components/tableSkeleton/TableSkeleton";
import { createPortal } from "react-dom";
import CreateModalWindow from "../../components/createModalWindow/CreateModalWindow";
import TableError from "../../components/TableError/TableError";
import useDelete from "../../hooks/useDelete";
import useEdit from "../../hooks/useEdit";
import ShowModalBtn from "../../components/ShowModalBtn/ShowModalBtn";

export default function MainPage() {
  const { retrieve, retrieveLoading, retrieveError } = useRetrieve();
  const { deleteData } = useDelete();
  const { edit } = useEdit();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editState, setEditState] = useState<{ [key: string]: boolean }>({});

  const token = sessionStorage.getItem("token")!;

  useEffect(() => {
    const fetchData = async () => {
      if (token)
        retrieve(token).then((data) => {
          setTableData(data);
        });
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (retrieveError) setTableData([]);
  }, [retrieveError]);

  const onDelete = (id: string) => {
    if (token)
      deleteData(token, id).then(() => {
        setTableData((prevData) => prevData.filter((item) => item.id !== id));
      });
  };

  const onEdit = (id: string) => {
    setEditState((prevState) => ({
      ...prevState,
      [id]: !(prevState[id] ?? false),
    }));
    if (editState[id] === true) {
      const target = tableData.find((item) => item.id === id);
      if (target) edit(token, id, target);
    }
  };

  const onInputChange = (
    e: React.FormEvent<HTMLDivElement>,
    id: string,
    field: keyof TableData
  ) => {
    const updatedData = e.currentTarget.textContent;
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: updatedData } : item
      )
    );
  };

  const renderData = (arr: TableData[]) => {
    return arr.map((item) => {
      const isReadOnly = !(editState[item.id] ?? false);
      return (
        <TableRow key={item.id}>
          <TableCell>{item.companySigDate}</TableCell>
          <TableCell>
            <Box
              onInput={(e) => onInputChange(e, item.id, "companySignatureName")}
              contentEditable={!isReadOnly}
              suppressContentEditableWarning={true}>
              {item.companySignatureName}
            </Box>
          </TableCell>

          <TableCell>
            <Box
              onInput={(e) => onInputChange(e, item.id, "documentName")}
              contentEditable={!isReadOnly}
              suppressContentEditableWarning={true}>
              {item.documentName}
            </Box>
          </TableCell>
          <TableCell>
            <Box
              onInput={(e) => onInputChange(e, item.id, "documentStatus")}
              contentEditable={!isReadOnly}
              suppressContentEditableWarning={true}>
              {item.documentStatus}
            </Box>
          </TableCell>
          <TableCell>
            <Box
              onInput={(e) => onInputChange(e, item.id, "documentType")}
              contentEditable={!isReadOnly}
              suppressContentEditableWarning={true}>
              {item.documentType}
            </Box>
          </TableCell>
          <TableCell>
            <Box
              onInput={(e) => onInputChange(e, item.id, "employeeNumber")}
              contentEditable={!isReadOnly}
              suppressContentEditableWarning={true}>
              {item.employeeNumber}
            </Box>
          </TableCell>
          <TableCell>{item.employeeSigDate}</TableCell>
          <TableCell>
            <Box
              onInput={(e) =>
                onInputChange(e, item.id, "employeeSignatureName")
              }
              contentEditable={!isReadOnly}
              suppressContentEditableWarning={true}>
              {item.employeeSignatureName}
            </Box>
          </TableCell>
          <TableCell>
            <Button
              onClick={() => onEdit(item.id)}
              size="small"
              variant="outlined"
              color="primary">
              {editState[item.id] ? "Save" : "Edit"}
            </Button>
          </TableCell>
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
  const loader = retrieveLoading ? <TableSkeleton /> : null;
  const error = retrieveError ? <TableError /> : null;

  return (
    <section className="main">
      <div className="main__header">
        <h2 className="main__heading">Main Page</h2>
        <ShowModalBtn showModal={setShowModal} />
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
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loader}
          {content}
          {error}
        </TableBody>
      </Table>
      {showModal &&
        createPortal(
          <CreateModalWindow
            token={token}
            onClose={() => setShowModal(false)}
            setNewData={(data: TableData) =>
              setTableData((prev) => [...prev, data])
            }
          />,
          document.body
        )}
    </section>
  );
}
