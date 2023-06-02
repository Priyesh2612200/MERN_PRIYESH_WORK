import * as React from "react";
import { Container } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { UserGETAPIDATA } from "../redux/Actions/usergetAPIAction";
import { useEffect } from "react";

import { Grid, Card, CardContent, Typography } from "@material-ui/core";

const UserProfilepage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserGETAPIDATA());
  }, []);

  const apiData = useSelector((state) => state);
  console.log("State DATA_____", apiData);
  console.log("API DATA", apiData?.usergetapidata?.FETCH_DATA);

  const styles = {
    card: {
      boxShadow: "0px 4px 6px rgba(0, 0, 255, 0.3)",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      backgroundColor: "#eaf6ff",
    },
  };
  return (
    <Container>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        {apiData?.usergetapidata?.FETCH_DATA.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              style={{
                ...styles.card,
                padding: "16px",
                height: "100%",
                fontSize: "25px",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  style={{ fontWeight: "bold", fontSize: "30px" }}
                >
                  User Name: {item.name}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ fontSize: "20px" }}
                >
                  User Email: {item.email}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ fontSize: "20px" }}
                >
                  User Mobile: {item.mobile}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ fontSize: "20px" }}
                >
                  User Address: {item.address}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ fontSize: "20px" }}
                >
                  User Pincode: {item.pincode}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default UserProfilepage;
