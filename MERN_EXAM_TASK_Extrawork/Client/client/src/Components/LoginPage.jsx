import React, { useState } from "react";
import { Container, TextField, Button, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginImage from "../Source/loginimagecopy.png"; // Replace with the path to your image file
import axios from "axios";

const LoginPageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const LoginForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: `${theme.spacing(3)} ${theme.spacing(0)} ${theme.spacing(2)}`,
}));

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/authroutes/login",
        { email, password }
      );

      localStorage.setItem("Response", JSON.stringify(response));

      // Access token
      const token = response?.data?.data?.accessToken;
      console.log("TOKEN______", response);

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login failed. Please try again!",
        });
        return;
      }

      // Save the token to local storage
      localStorage.setItem("token", token);

      navigate("/navbar"); // Redirect to navbar page
    } catch (error) {
      console.log("Login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed. Please try again!",
      });
    }
  };


  return (
    <LoginPageContainer component="main" maxWidth="xs">
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <img src={loginImage} alt="Login" style={{ width: "100%" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <LoginForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <SubmitButton type="submit" fullWidth variant="contained" color="primary">
            Log In
          </SubmitButton>
        </LoginForm>
        <Typography>
          Don't have an account?{" "}
          <Link href="/registration" variant="body2">
            Sign Up
          </Link>
        </Typography>
      </div>
    </LoginPageContainer>
  );
};

export default LoginPage;
