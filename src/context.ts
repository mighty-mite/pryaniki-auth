import { createContext } from "react";
import { AuthContextType } from "./utils/types";

export const AuthContext = createContext<AuthContextType>({
  setToken: () => {},
  token: "",
});

export default AuthContext;
