import { TableData } from "./types";

export default function useHttp() {
  const hostUrl = "https://test.v5.pryaniky.com";
  const authUrl = "/ru/data/v3/testmethods/docs/login";
  const getUrl = "/ru/data/v3/testmethods/docs/userdocs/get";
  const createUrl = "/ru/data/v3/testmethods/docs/userdocs/create";
  const deleteUrl = "/ru/data/v3/testmethods/docs/userdocs/delete/";

  const authorize = async (username: string, password: string) => {
    const response = await fetch(`${hostUrl}${authUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const token = data.data.token;
    sessionStorage.setItem("token", token);

    return token;
  };

  const getTable = async (token: string) => {
    const response = await fetch(`${hostUrl}${getUrl}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "x-auth": token,
      },
    });

    if (!response.ok) {
      throw new Error("Data loading failed");
    }

    const data = await response.json();
    return data.data;
  };

  const createTableRow = async (token: string, newData: TableData) => {
    const response = await fetch(`${hostUrl}${createUrl}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "x-auth": token,
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error("Data sending failed");
    }
  };

  const deleteTableRow = async (token: string, id: string) => {
    const response = await fetch(`${hostUrl}${deleteUrl}${id}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "x-auth": token,
      },
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      throw new Error("Data sending failed");
    }
  };

  return { authorize, getTable, createTableRow, deleteTableRow };
}
