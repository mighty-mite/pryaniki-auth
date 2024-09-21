import { useState } from "react";
import { ModalFormValues, Url } from "../utils/types";

export default function useEdit() {
  const [isEditError, setIsEditError] = useState(false);
  const edit = async (token: string, id: string, tableRow: ModalFormValues) => {
    try {
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
    } catch (e) {
      setIsEditError(true);
      throw e;
    }
  };
  return { edit, isEditError };
}
