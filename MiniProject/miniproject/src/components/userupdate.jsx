import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { updateuserAPIData } from "../redux/Actions/userUpdateAPIAction";


function UpdateUserInfo(){

  const navigate = useNavigate();
    const { id } = useParams();
  const dispatch = useDispatch();
//   const apiData = useSelector((state) => state.getApiData);
  const apiData = useSelector((state) => state);

  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    dispatch(updateuserAPIData(id, data));
  };

  useEffect(() => {
    const response = apiData?.alluserapidata?.FETCHALL_DATA.filter(
      (items) => items?.id === id
    )[0];
    setData({
      ...data,
      name: response?.name,
      email: response?.email,
      mobile: response?.mobile,
      address: response?.address,
      pincode: response?.pincode,
    });
  }, [apiData]);

  const handleBack = () => {
    navigate("/getalluser");
  };

  return (
    <Container>
      <form>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Typography variant="h4">UPDATE USER DATA</Typography>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="User Name"
              variant="outlined"
              fullWidth
              value={data?.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="User Email"
              variant="outlined"
              fullWidth
              value={data?.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="mobile"
              label="User Mobile"
              variant="outlined"
              fullWidth
              value={data?.mobile}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="address"
              label="User Address"
              variant="outlined"
              fullWidth
              value={data?.address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="pincode"
              label="User Pincode"
              variant="outlined"
              fullWidth
              value={data?.pincode}
              onChange={handleChange}
            />
          </Grid>


        </Grid>

    
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Button
                variant="contained"
                color="primary"
                type="button"
                fullWidth
                onClick={handleUpdate}
                style={{ marginTop: "10px" }}
              >
                UPDATE
              </Button>
            </Grid>
          </Grid>
      

        <Grid item xs={12} style={{marginTop:"20px"}}>
        <Grid container spacing={3}>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back
            </Button>
        </Grid>
          </Grid>

      </form>
    </Container>
  );
};
export default UpdateUserInfo;