import {
  Button,
  Input,
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
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: string,
    field: keyof TableData
  ) => {
    const updatedData = e.target.value;
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
            <Input
              onChange={(e) =>
                onInputChange(e, item.id, "companySignatureName")
              }
              readOnly={isReadOnly}
              value={item.companySignatureName}
            />
          </TableCell>

          <TableCell>
            <Input
              onChange={(e) => onInputChange(e, item.id, "documentName")}
              readOnly={isReadOnly}
              value={item.documentName}
            />
          </TableCell>
          <TableCell>
            <Input
              onChange={(e) => onInputChange(e, item.id, "documentStatus")}
              readOnly={isReadOnly}
              value={item.documentStatus}
            />
          </TableCell>
          <TableCell>
            <Input
              onChange={(e) => onInputChange(e, item.id, "documentType")}
              readOnly={isReadOnly}
              value={item.documentType}
            />
          </TableCell>
          <TableCell>
            <Input
              onChange={(e) => onInputChange(e, item.id, "employeeNumber")}
              readOnly={isReadOnly}
              value={item.employeeNumber}
            />
          </TableCell>
          <TableCell>{item.employeeSigDate}</TableCell>
          <TableCell>
            <Input
              onChange={(e) =>
                onInputChange(e, item.id, "employeeSignatureName")
              }
              readOnly={isReadOnly}
              value={item.employeeSignatureName}
            />
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

  return retrieveLoading ? (
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
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
