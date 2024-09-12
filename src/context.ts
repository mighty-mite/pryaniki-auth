import { createContext } from "react";
import { AuthContextType } from "./utils/types";

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => {},
  token: "",
});

export default AuthContext;
