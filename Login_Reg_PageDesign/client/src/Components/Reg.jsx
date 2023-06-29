import React from 'react'
import "../App.css";
import { TextField, Button, Typography, Container, Grid} from "@mui/material";
import RegImg from '../Sources/Reg.jpg'
import { useNavigate } from "react-router-dom";

const Reg = () => {

    const navigate = useNavigate();

  return (
    <>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <div className="Reg">
              <Typography variant="h4" gutterBottom>
                Sign up
              </Typography>
              <form>
              <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                 <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
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
                <Button variant="contained" color="primary" fullWidth
                 onClick={() => {
                    navigate("/"); // Redirect to the login page
                  }}
                  >
                  Register
                </Button>
              </form>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
          <img className="Regimg" src={RegImg} alt="Reg" />
          </Grid>
        </Grid>
      </Container>

    </>
  )
}

export default Reg