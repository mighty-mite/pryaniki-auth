import { Button, TextField } from "@mui/material";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <section className="login">
      <form className="login-form">
        <h2 className="login-form__heading">Enter your login and password</h2>
        <TextField placeholder="Login" />
        <TextField placeholder="Password" type="password" />
        <Button type="submit" size="large" variant="contained">
          Enter
        </Button>
      </form>
    </section>
  );
}
