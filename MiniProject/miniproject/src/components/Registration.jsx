import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { PostApiData } from "../redux/Actions/userPostAPIAction";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

const RegistrationPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const classes = useStyles();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mobile, setmobile] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setpincode] = useState("");

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
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
            onChange={(event) => setname(event.target.value)}
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
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile"
            name="mobile"
            autoFocus
            value={mobile}
            onChange={(event) => setmobile(event.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoFocus
            value={address}
            onChange={(event) => setaddress(event.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="pincode"
            label="Pincode"
            name="pincode"
            autoFocus
            value={pincode}
            onChange={(event) => setpincode(event.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              dispatch(
                PostApiData({ name, email, password, mobile, address, pincode })
              );
              navigate("/"); // Redirect to the login page
            }}
          >
            Sign Up
          </Button>
        </form>
        <Typography>
          Already have an account?{" "}
          <Link href="/Login" variant="body2">
            Log in
          </Link>
        </Typography>
      </div>
    </Container>
  );
};

export default RegistrationPage;
