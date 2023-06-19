import React, { useState } from "react";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import CardImg from "../Images/31213.jpg";
import * as Yup from "yup";

import { postAPIData } from "../frontendApi";
import imageUplode from "../Images/31213.jpg";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { useFormikContext } from "formik";

import { CardActionArea } from "@mui/material";

const Formvalue = () => {
  const [allEntry, setAllEntry] = useState([]);

  const handleSubmit = async (values, { resetForm }) => {
    const newEntry = {
      email: values.email,
      text: values.text,
      password: values.password,
      radio: values.radio,
      checkbox: values.checkbox,
      color: values.color,
      date: values.date,
      file: values.file,
      number: values.number,
      range: values.range,
      time: values.time,
    };

    let formdata = new FormData();
    formdata.append("file", values.file);
    formdata.append("email", values.email);
    formdata.append("text", values.text);
    formdata.append("password", values.password);
    formdata.append("radio", values.radio);
    formdata.append("checkbox", Boolean(values.checkbox));
    formdata.append("color", values.color);
    formdata.append("date", values.date);
    formdata.append("number", parseInt(values.number));
    formdata.append("range", parseInt(values.range));
    formdata.append("time", values.time);

    setAllEntry([...allEntry, newEntry]);
    console.log("newEntry___", values.file);

    try {
      // const response = await axios.post('http://localhost:4000/form', newEntry);
      const response = await postAPIData(formdata);
      console.log("Form data sent successfully:", response.data);
      setAllEntry([...allEntry, response.data]);
    } catch (error) {
      console.error("Error sending form data:", error);
    }

    // Clear the form fields
    resetForm();
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    text: Yup.string().required("Text is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[^\w\s]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    radio: Yup.string().required("Please select an option"),

    checkbox: Yup.boolean().oneOf([true], "Checkbox must be checked"),

    color: Yup.string().required("Color is required"),
    date: Yup.date().required("Date is required"),
    number: Yup.number().required("Number is required"),
    range: Yup.number().required("Range is required"),
    time: Yup.string().required("Time is required"),
  });

  //Loading

  // const [loading, setLoading] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   setFieldValue(file);
  //   setLoading(true);
  //   // Simulating file upload delay
  //   setTimeout(() => {
  //     console.log("Selected file:", file);
  //     setLoading(false);
  //   }, 2000); // Replace with your file upload logic
  // };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: 1000, boxShadow: 3, margin: 5 }}>
        <CardActionArea>
          <CardMedia component="img" height="300" image={CardImg} />
          <CardContent>
            <Container maxWidth="md">
              <h1>FORM VALIDATION</h1>

              <Formik
                initialValues={{
                  email: "",
                  text: "",
                  password: "",
                  radio: "",
                  checkbox: false,
                  color: "#000000",
                  date: "",
                  file: null,
                  number: "",
                  range: 50,
                  time: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(
                  { errors, touched, setFieldValue } //this line to destructure errors and touched from Formik props
                ) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          label="email"
                          type="email"
                          id="email"
                          name="email"
                          as={TextField}
                          error={touched.email && errors.email}
                          helperText={touched.email && errors.email}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          label="Text"
                          type="text"
                          id="text"
                          name="text"
                          as={TextField}
                          error={touched.text && errors.text}
                          helperText={touched.text && errors.text}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          label="Password"
                          type="password"
                          id="password"
                          name="password"
                          as={TextField}
                          error={touched.password && errors.password}
                          helperText={touched.password && errors.password}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Radio</FormLabel>
                          <Field name="radio">
                            {({ field }) => (
                              <RadioGroup
                                {...field}
                                aria-label="radio"
                                value={field.value}
                                onChange={field.onChange}
                                row
                              >
                                <FormControlLabel
                                  value="option1"
                                  control={<Radio />}
                                  label="Option 1"
                                />
                                <FormControlLabel
                                  value="option2"
                                  control={<Radio />}
                                  label="Option 2"
                                />
                              </RadioGroup>
                            )}
                          </Field>
                          {errors.radio && touched.radio && (
                            <div style={{ color: "red" }}>{errors.radio}</div>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <Field name="checkbox">
                          {({ field }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  {...field}
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              }
                              label="Checkbox"
                            />
                          )}
                        </Field>
                        {errors.checkbox && touched.checkbox && (
                          <div style={{ color: "red" }}>{errors.checkbox}</div>
                        )}
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          label="Color Picker"
                          type="color"
                          id="color"
                          name="color"
                          as={TextField}
                          error={touched.color && errors.color}
                          helperText={touched.color && errors.color}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <label htmlFor="date">Date</label>
                        <Field
                          type="date"
                          id="date"
                          name="date"
                          as={TextField}
                          error={touched.date && errors.date}
                          helperText={touched.date && errors.date}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          label="Number"
                          type="number"
                          id="number"
                          name="number"
                          as={TextField}
                          error={touched.number && errors.number}
                          helperText={touched.number && errors.number}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <InputLabel id="range-label">Range</InputLabel>
                          <Field
                            as={Select}
                            labelId="range-label"
                            id="range"
                            name="range"
                            error={touched.range && errors.range}
                            fullWidth
                          >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={75}>75</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                          </Field>
                          {errors.range && touched.range && (
                            <div style={{ color: "red" }}>{errors.range}</div>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <label htmlFor="time">Time</label>
                        <Field
                          type="time"
                          id="time"
                          name="time"
                          as={TextField}
                          error={touched.time && errors.time}
                          helperText={touched.time && errors.time}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <input
                          id="file"
                          type="file"
                          accept="image/*, application/pdf, video/*"
                          onChange={(event) => {
                            const file = event.target.files[0];
                            setFieldValue("file", file);

                            console.log("Selected file:", file);
                          }}
                          style={{ display: "none" }}
                        />
                        <label htmlFor="file">
                          <Button variant="contained" component="span">
                            Upload File
                          </Button>
                        </label>
                      </Grid>

                      {/* <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <input
                          id="file"
                          type="file"
                          accept="image/*, application/pdf, video/*"
                          onChange={handleFileUpload}
                          style={{ display: "none" }}
                        />
                        <label htmlFor="file">
                          <Button
                            variant="contained"
                            component="span"
                            disabled={loading}
                          >
                            {loading ? (
                              <CircularProgress size={24} /> // Displaying loader while uploading
                            ) : (
                              "Upload File"
                            )}
                          </Button>
                        </label>
                        {selectedFile && (
                          <p>Selected File: {selectedFile.name}</p>
                        )}
                      </Grid> */}

                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Container>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Formvalue;
