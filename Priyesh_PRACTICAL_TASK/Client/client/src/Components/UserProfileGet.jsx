import { useState, useEffect } from "react";
import { Container, Grid, Button } from "@mui/material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const UserProfilepageget = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();
  
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const options = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    await fetch("http://localhost:4000/authroutes/getdata", options)
      .then((response) => response.json())
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);


  const handleBack = () => {
    navigate("/navbar");
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Table
        sx={{
          border: "1px solid #333",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#333",
                fontSize: "18px",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#333",
                fontSize: "18px",
              }}
            >
              Phone
            </TableCell>
            <TableCell
              sx={{
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
          {data?.length !== 0 && data?.map((item, index) => (
            <TableRow
              key={item.id}
              sx={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#fff" }}
            >
              <TableCell sx={{ fontSize: "16px" }}>{item.name}</TableCell>
              <TableCell sx={{ fontSize: "16px" }}>{item.email}</TableCell>
          <TableCell>
          <IconButton
             onClick={() => {navigate(`/userprofile/${item.id}`);  fetchData()}}
            sx={{ color: "#007bff" }} // Custom color for update button
          >
            <EditIcon />
          </IconButton>
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
          sx={{ marginTop: "10px" }}
        >
          Back
        </Button>
      </Grid>
    </Container>
  );
};
export default UserProfilepageget;
