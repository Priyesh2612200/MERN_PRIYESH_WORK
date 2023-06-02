import React, { useEffect, useState } from "react";
import { Container, Grid, TextField,Button  } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

function Viewdata() {

  const navigate = useNavigate();

  const { id } = useParams();
  const apiData = useSelector((state) => state.getApiData);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const response = apiData?.FETCH_DATA?.filter(
      (items) => items?.id === id
    )[0];
    setData({
      ...data,
      title: response?.title,
      description: response?.description,
      category: response?.category,
    });
  }, [apiData]);

  const handleBack = () => {
    navigate("/navbar");
  };


  return (
    <Container>
      <form>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Typography variant="h4">VIEW DETAIL</Typography>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Post Title"
              variant="outlined"
              fullWidth
              value={data?.title}
              aria-readonly
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Post Description"
              variant="outlined"
              fullWidth
              value={data?.description}
              aria-readonly
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="category"
              label="Post Category"
              variant="outlined"
              fullWidth
              value={data?.category}
              aria-readonly
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleBack}>
              Back
            </Button>
          </Grid>

        </Grid>
      </form>
    </Container>
  );
}
export default Viewdata;
