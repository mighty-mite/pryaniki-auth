import { useState } from "react";
import { Url } from "../utils/types";

export default function useAuthorize() {
  const [authError, setAuthError] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const authorize = async (username: string, password: string) => {
    setAuthLoading(true);
    try {
      const response = await fetch(`${Url.hostUrl}${Url.authUrl}`, {
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

      setAuthLoading(false);
      return token;
    } catch (e) {
      setAuthLoading(false);
      setAuthError(true);
      throw e;
    }
  };

  return { authError, authLoading, authorize };
}
