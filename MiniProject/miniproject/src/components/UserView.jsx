import React, { useEffect, useState } from "react";
import { Container, Grid, TextField,Typography,Button,
 
  makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  },
  heading: {
    marginBottom: theme.spacing(2),
    color: "#333333",
    fontWeight: "bold"
  },
  textField: {
    marginBottom: theme.spacing(2)
  }
}));



function UserViewdata() {

  const navigate = useNavigate();

  const classes = useStyles();

  const { id } = useParams();
//   const apiData = useSelector((state) => state.getApiData);
  const apiData = useSelector((state) => state);
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  useEffect(() => {
    const response = apiData?.alluserapidata?.FETCHALL_DATA?.filter(
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
    // <Container>
    //   <form>
    //     <Grid container spacing={2} style={{ marginTop: "10px" }}>
    //       <Typography variant="h4">USER VIEW DETAIL</Typography>
    //       <Grid item xs={12}>
    //         <TextField
    //           name="name"
    //           label="User Name"
    //           variant="outlined"
    //           fullWidth
    //           value={data?.name}
    //           aria-readonly
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           name="email"
    //           label="User Email"
    //           variant="outlined"
    //           fullWidth
    //           value={data?.email}
    //           aria-readonly
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           name="mobile"
    //           label="User Mobile"
    //           variant="outlined"
    //           fullWidth
    //           value={data?.mobile}
    //           aria-readonly
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           name="address"
    //           label="User Address"
    //           variant="outlined"
    //           fullWidth
    //           value={data?.address}
    //           aria-readonly
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           name="pincode"
    //           label="User Pincode"
    //           variant="outlined"
    //           fullWidth
    //           value={data?.pincode}
    //           aria-readonly
    //         />
    //       </Grid>
    //     </Grid>
    //   </form>
    // </Container>
    <Container className={classes.container}>
    <form>
      <Grid container spacing={2}>
        <Typography variant="h4" className={classes.heading}>
          USER VIEW DETAIL
        </Typography>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="User Name"
            variant="outlined"
            fullWidth
            value={data?.name}
            InputProps={{ readOnly: true }}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="User Email"
            variant="outlined"
            fullWidth
            value={data?.email}
            InputProps={{ readOnly: true }}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="mobile"
            label="User Mobile"
            variant="outlined"
            fullWidth
            value={data?.mobile}
            InputProps={{ readOnly: true }}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            label="User Address"
            variant="outlined"
            fullWidth
            value={data?.address}
            InputProps={{ readOnly: true }}
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="pincode"
            label="User Pincode"
            variant="outlined"
            fullWidth
            value={data?.pincode}
            InputProps={{ readOnly: true }}
            className={classes.textField}
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
export default UserViewdata;
