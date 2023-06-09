import { Button, Container, Grid, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateuserAPIData } from "../Redux/Actions/userUpdateAPIAction";

const UserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const apiData = useSelector((state) => state);
  
 

  console.log("API DATA FOR UPDATE___", apiData);

  const [data, setData] = useState({
    name: "",
    phone: "",
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
      phone: response?.phone,
    });
  }, [apiData]);

  const handleBack = () => {
    navigate("/navbar");
  };

  return (
    <Container>
      <form>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Typography variant="h4">UPDATE USER DATA</Typography>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={data?.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phone"
              label="Phone"
              variant="outlined"
              fullWidth
              value={data?.phone}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
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

        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={handleBack}>
            Back
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default UserProfile;

