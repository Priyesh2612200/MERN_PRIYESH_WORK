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
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Invalid phone number";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      dispatch(PostApiData({ name, email, phone, password }));
      navigate("/");
    }
  };

  const isFieldValid = (field) => {
    return !!field.trim() && !errors[field];
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "50px" }}>
      <div>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={!isFieldValid("name")}
            helperText={isFieldValid("name") ? "" : errors.name}
            InputProps={{
              style: { borderColor: isFieldValid("name") ? "green" : "" },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={!isFieldValid("email")}
            helperText={isFieldValid("email") ? "" : errors.email}
            InputProps={{
              style: { borderColor: isFieldValid("email") ? "green" : "" },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            error={!isFieldValid("phone")}
            helperText={isFieldValid("phone") ? "" : errors.phone}
            InputProps={{
              style: { borderColor: isFieldValid("phone") ? "green" : "" },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={!isFieldValid("password")}
            helperText={isFieldValid("password") ? "" : errors.password}
            InputProps={{
              style: { borderColor: isFieldValid("password") ? "green" : "" },
            }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
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

