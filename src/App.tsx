import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";
import AuthContext from "./context";
import { useState } from "react";
import "./App.css";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token") ?? "");
  return (
    <>
      <AuthContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/main" element={<MainPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
