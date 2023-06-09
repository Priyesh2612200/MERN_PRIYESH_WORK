import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { productPostApiData } from "../redux/Actions/productPostAction";
import { useDispatch } from "react-redux";
import axios from "axios";

const ProductForm = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required("Image is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    categoryId: Yup.string()
    .oneOf(categories.map((category) => category.id), "Invalid category")
    .required("Category is required"),
  });

  const formik = useFormik({
    initialValues: {
      file: "",
      title: "",
      description: "",
      categoryId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      let formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      console.log("Form Data:", values);

      dispatch(productPostApiData(formData));

      formik.resetForm(); // Reset form fields
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/allcategory");
        setCategories(response.data.data);
        console.log("RESPONSE DATA___",response)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = (event) => {
    formik.setFieldValue("file", event.target.files[0]);
    setLoading(true);

    // Simulating file upload delay
    setTimeout(() => {
      console.log("Selected file:", event.target.files[0]);
      setLoading(false);
    }, 2000); // Replace with your file upload logic
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h3"
        component="h2"
        align="center"
        style={{ fontWeight: "bold" }}
        gutterBottom
      >
        ADD PRODUCT
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              id="file"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <label htmlFor="file">
              <Button
                variant="contained"
                component="span"
                disabled={loading || formik.isSubmitting}
              >
                {loading ? (
                  <CircularProgress size={24} /> // Displaying loader while uploading
                ) : (
                  "Upload Image"
                )}
              </Button>
            </label>
            {formik.errors.file && formik.touched.file && (
              <p style={{ color: "red" }}>{formik.errors.file}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.errors.title && formik.touched.title}
              helperText={
                formik.errors.title &&
                formik.touched.title &&
                formik.errors.title
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.errors.description && formik.touched.description}
              helperText={
                formik.errors.description &&
                formik.touched.description &&
                formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Select Category</InputLabel>
            <Select
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              variant="outlined"
              fullWidth
              error={formik.errors.category && formik.touched.category}
              disabled={formik.isSubmitting}
            >
              <MenuItem value="">Select Category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {formik.errors.categoryId && formik.touched.categoryId && (
              <p style={{ color: "red" }}>{formik.errors.categoryId}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={formik.isSubmitting}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
        <Button color="primary" onClick={handleBack}>
          Back
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;

