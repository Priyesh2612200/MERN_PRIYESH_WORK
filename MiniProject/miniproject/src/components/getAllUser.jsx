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

import { getApiData } from "../redux/Actions/getAPIAction";

import { deleteApiData } from "../redux/Actions/deleteAPIActions";
import { Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllApiData } from "../redux/Actions/allUserAPIAction";
import { useEffect } from "react";
import { deleteUSERApiData } from "../redux/Actions/userDeleteAPIAction";
import { UserGETAPIDATA } from "../redux/Actions/usergetAPIAction";
import { PermissionData } from "../Permission/PermissionData";
import permissionCheck from "../Permission/LocalStorageData";

const AllUserProfilepage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllApiData());
  }, []);

  const handleDeleteButtonClick = (item) => {
    const idvalue = item.id;
    dispatch(deleteUSERApiData(idvalue));
    UserGETAPIDATA()(dispatch);
  };

  const apiData = useSelector((state) => state);
  console.log("API DATA", apiData?.alluserapidata?.FETCHALL_DATA);

  const handleBack = () => {
    navigate("/navbar");
  };

  return (
    <Container style={{marginTop:"10px"}}>
      <Table
        style={{
          border: "1px solid #333",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#333",
                fontSize: "18px",
              }}
            >
              User Name
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#333",
                fontSize: "18px",
              }}
            >
              User Email
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#333",
                fontSize: "18px",
              }}
            >
              User Mobile
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#333",
                fontSize: "18px",
              }}
            >
              User Address
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#333",
                fontSize: "18px",
              }}
            >
              User Pincode
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#333",
                fontSize: "18px",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {apiData?.alluserapidata?.FETCHALL_DATA.map((item, index) => (
            <TableRow
              key={item.id}
              style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#fff" }}
            >
              <TableCell style={{ fontSize: "16px" }}>{item.name}</TableCell>
              <TableCell style={{ fontSize: "16px" }}>{item.email}</TableCell>
              <TableCell style={{ fontSize: "16px" }}>{item.mobile}</TableCell>
              <TableCell style={{ fontSize: "16px" }}>{item.address}</TableCell>
              <TableCell style={{ fontSize: "16px" }}>{item.pincode}</TableCell>

              <TableCell>
                <IconButton
                  onClick={() => navigate(`/Updateuser/${item.id}`)}
                  style={{ color: "#007bff" }} // Custom color for update button
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  style={{ color: "#28a745" }} // Custom color for view button
                  onClick={() => navigate(`/userview/${item.id}`)}
                >
                  <VisibilityIcon />
                </IconButton>
                {permissionCheck(PermissionData.DELETE_USER_PERMISSION) && (
                  <IconButton
                    onClick={() => handleDeleteButtonClick(item)}
                    style={{ color: "#dc3545" }} // Custom color for delete button
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          style={{ marginTop: "10px" }}
        >
          Back
        </Button>
      </Grid>
    </Container>
  );
};
export default AllUserProfilepage;
