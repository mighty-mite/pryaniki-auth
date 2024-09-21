import { useState } from "react";
import { TableData, Url } from "../utils/types";

export default function useCreate() {
  const [isCreateError, setIsCreateError] = useState(false);
  const create = async (token: string, newData: TableData) => {
    try {
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
    } catch (e) {
      setIsCreateError(true);
      throw e;
    }
  };
  return { create, isCreateError };
}
