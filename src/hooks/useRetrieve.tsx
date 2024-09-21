import { useState } from "react";
import { Url } from "../utils/types";

export default function useRetrieve() {
  const [retrieveLoading, setRetrieveLoading] = useState(true);
  const [retrieveError, setRetrieveError] = useState(false);

  const retrieve = async (token: string) => {
    setRetrieveLoading(true);
    try {
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
      setRetrieveLoading(false);
      return data.data;
    } catch (e) {
      setRetrieveLoading(false);
      setRetrieveError(true);
      throw e;
    }
  };
  return { retrieve, retrieveLoading, retrieveError };
}
