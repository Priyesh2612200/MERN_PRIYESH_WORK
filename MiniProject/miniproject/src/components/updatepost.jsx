import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

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

import { updateAPIData } from "../redux/Actions/updateAPIAction";

function Viewdata() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const apiData = useSelector((state) => state.getApiData);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    dispatch(updateAPIData(id, data));
  };

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

  return (
    <Container>
      <form>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          <Typography variant="h4">UPDATE DATA</Typography>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Post Title"
              variant="outlined"
              fullWidth
              value={data?.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Post Description"
              variant="outlined"
              fullWidth
              value={data?.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="post-category-label">
                Select Post Category
              </InputLabel>
              <Select
                name="category"
                labelId="post-category-label"
                label="Post Category"
                value={data?.category}
                onChange={handleChange}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="categoryOne">Category One</MenuItem>
                <MenuItem value="categoryTwo">Category Two</MenuItem>
                <MenuItem value="categoryThree">Category Three</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
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
        </Grid>
      </form>
    </Container>
  );
}
export default Viewdata;
