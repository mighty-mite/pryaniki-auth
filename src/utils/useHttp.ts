import { useState } from "react";
import { ModalFormValues, TableData } from "./types";

enum Url {
  hostUrl = "https://test.v5.pryaniky.com",
  authUrl = "/ru/data/v3/testmethods/docs/login",
  getUrl = "/ru/data/v3/testmethods/docs/userdocs/get",
  createUrl = "/ru/data/v3/testmethods/docs/userdocs/create",
  deleteUrl = "/ru/data/v3/testmethods/docs/userdocs/delete/",
  editUrl = "/ru/data/v3/testmethods/docs/userdocs/set/",
}

export default function useHttp() {
  const [authError, setAuthError] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const authorize = async (username: string, password: string) => {
    try {
      const response = await fetch(`${Url.hostUrl}${Url.authUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      setAuthLoading(true);

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const token = data.data.token;
      sessionStorage.setItem("token", token);

      setAuthLoading(false);
      return token;
    } catch (e) {
      setAuthLoading(false);
      setAuthError(true);
      throw e;
    }
  };

  const getTable = async (token: string) => {
    const response = await fetch(`${Url.hostUrl}${Url.getUrl}`, {
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
    const response = await fetch(`${Url.hostUrl}${Url.createUrl}`, {
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
    const response = await fetch(`${Url.hostUrl}${Url.deleteUrl}${id}`, {
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

  const editTableRow = async (
    token: string,
    id: string,
    tableRow: ModalFormValues
  ) => {
    const response = await fetch(`${Url.hostUrl}${Url.editUrl}${id}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "x-auth": token,
      },
      body: JSON.stringify(tableRow),
    });

    if (!response.ok) {
      throw new Error("Data sending failed");
    }
  };

  return { authorize, getTable, createTableRow, deleteTableRow, editTableRow };
}
