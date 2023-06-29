import React from "react";
import "../App.css";
import { TextField, Button, Typography, Container, Grid, Link } from "@mui/material";
import LoginImg from '../Sources/login3.jpg'

const Login = () => {
  return (
    <>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img className="loginimg" src={LoginImg} alt="Login" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="login">
              <Typography variant="h4" gutterBottom>
                Sign in
              </Typography>
              <form>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained" color="primary" fullWidth>
                  Loginin
                </Button>
              </form>
              <div style={{marginTop:'20px'}}>Dont't have an account yet?</div>
              <Link  style={{ color: "#417DFF" }}  href="/Reg">
              Create an account
          </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
