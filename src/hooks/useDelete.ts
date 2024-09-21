import { useState } from "react";
import { Url } from "../utils/types";

export default function useDelete() {
  const [isDeleteDataError, setIsDeleteDataError] = useState(false);

  const deleteData = async (token: string, id: string) => {
    try {
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
    } catch (e) {
      setIsDeleteDataError(true);
      throw e;
    }
  };

  return { deleteData, isDeleteDataError };
}
