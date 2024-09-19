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
import useHttp from "../../utils/useHttp";
import { useEffect, useState } from "react";
import { TableData } from "../../utils/types";
import TableSkeleton from "../../components/tableSkeleton/TableSkeleton";
import { createPortal } from "react-dom";
import CreateModalWindow from "../../components/createModalWindow/CreateModalWindow";

export default function MainPage() {
  const { getTable, deleteTableRow, editTableRow } = useHttp();
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editState, setEditState] = useState<{ [key: string]: boolean }>({});

  const token = sessionStorage.getItem("token")!;

  useEffect(() => {
    const fetchData = async () => {
      if (token)
        getTable(token).then((data) => {
          setTableData(data);
          setIsLoading(false);
        });
    };
    fetchData();
  }, [token]);

  const onDelete = (id: string) => {
    if (token)
      deleteTableRow(token, id).then(() => {
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
      if (target) editTableRow(token, id, target);
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
  console.log("render");

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
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{content}</TableBody>
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
