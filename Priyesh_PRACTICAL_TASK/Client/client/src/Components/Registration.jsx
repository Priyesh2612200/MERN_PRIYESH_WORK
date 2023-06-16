import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Link,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostApiData } from "../Redux/Actions/userPostAPIAction";



const RegistrationPage = () => {

const navigate = useNavigate();

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "50px" }}>
      <div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
             value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoFocus
             value={phone}
             onChange={(event) => setPhone(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
                dispatch(
                  PostApiData({ name,email,phone,password})
                );
                navigate("/"); // Redirect to the login page
              }}
          >
            Sign Up
          </Button>
        </form>
        <Typography>
          Already have an account?{" "}
          <Link href="/" variant="body2">
            Log in
          </Link>
        </Typography>
      </div>
    </Container>
  );
};

export default RegistrationPage;
