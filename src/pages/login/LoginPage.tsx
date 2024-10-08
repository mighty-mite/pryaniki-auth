import { Button, TextField } from "@mui/material";
import AuthContext from "../../context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthorize from "../../hooks/useAuthorize";
import "./LoginPage.css";

export default function LoginPage() {
  const { setToken, token } = useContext(AuthContext);
  const [username, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { authorize, authError } = useAuthorize();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authorize(username, password).then((token) => {
      setToken(token);
      navigate("/main");
    });
  };

  useEffect(() => {
    if (token) navigate("/main");
  }, [token]);

  return (
    <section className="login">
      <form onSubmit={onSubmit} className="login-form">
        <h2 className="login-form__heading">Enter your login and password</h2>
        <p>try ' user13' and 'password'</p>
        <TextField
          value={username}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Login"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <Button type="submit" size="large" variant="contained">
          Enter
        </Button>
        {authError ? (
          <span style={{ color: "red" }}>
            your password or login incorrect, try again
          </span>
        ) : null}
      </form>
    </section>
  );
}
