import { useState } from "react";
import * as React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { FetchApiData } from "../redux/Actions/postAPIAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getApiData } from "../redux/Actions/getAPIAction";

import { deleteApiData } from "../redux/Actions/deleteAPIActions";
import { Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
const PostTable = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    getApiData()(dispatch);
  };

  const apiData = useSelector((state) => state.getApiData);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);

  const handleDeleteButtonClick = (item) => {
    const idvalue = item.id;
    dispatch(deleteApiData(idvalue));
    getApiData()(dispatch);
  };

  return (
    <Container>
      <form>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          {" "}
          <Typography variant="h4">POST DATA</Typography>
          <Grid item xs={12}>
            <TextField
              label="Post Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Post Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="post-category-label">
                Select Post Category
              </InputLabel>
              <Select
                labelId="post-category-label"
                label="Post Category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
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
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  fullWidth
                  onClick={() =>
                    dispatch(FetchApiData({ title, description, category }))
                  }
                  style={{ marginTop: "10px" }}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  fullWidth
                  onClick={handleButtonClick}
                  style={{ marginTop: "10px" }}
                >
                  GET DATA
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Post Title</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              Post Description
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Post Category</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData?.FETCH_DATA?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <IconButton onClick={() => navigate(`/Update/${item.id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton>
                  <VisibilityIcon
                    onClick={() => navigate(`/view/${item.id}`)}
                  />
                </IconButton>
                <IconButton onClick={() => handleDeleteButtonClick(item)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default PostTable;
