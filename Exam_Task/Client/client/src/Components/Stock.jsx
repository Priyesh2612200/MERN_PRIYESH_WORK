import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Button, Modal, Typography, TextField, Grid } from "@mui/material";
import { postStockData } from "../Redux/Actions/postStockAction";
import { getAllStockApiData } from "../Redux/Actions/getStockAction";
import axios from "axios";
import Delete from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { daleteAPIstock } from "../ApiEndPoints.js";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";

const Stock = () => {
  const dispatch = useDispatch();
  const [stockData, setStockData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    qty: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    qty: "",
  });

  const handleDelete = async (id) => {
    try {
      await daleteAPIstock(id);
      // Refresh the data after successful deletion
      await fetchStockData();
      Swal.fire("Success", "Data deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting data:", error);
      Swal.fire("Error", "Failed to delete data", "error");
    }
  };

  const fetchStockData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getStock");
      console.log("response",response.data.data)
      setStockData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: "qty",
      sortable: true,
    },
    {
      name: "Order Qty",
      selector: "qty",
      sortable: true,
    },
    {
      name: "Actions",
      sortable: false,
      cell: (row) => (
        <div>
          <IconButton>
            <Delete color="error" onClick={() => handleDelete(row.id)} />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      qty: "",
    });
    setFormErrors({
      name: "",
      qty: "",
    });
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    if (formData.name.trim() === "") {
      errors.name = "Name is required";
    }
    const quantity = parseInt(formData.qty);
    if (isNaN(quantity) || quantity <= 0) {
      errors.qty = "Quantity must be a positive number";
    }

    if (Object.keys(errors).length === 0) {
      try {
        const res = await dispatch(postStockData(formData));
        fetchStockData(); // Fetch updated stock data
        handleCloseModal(); // Close the modal after successful submission
        setFormErrors({}); // Clear any existing errors
        setFormData({ name: "", qty: "" }); // Clear the form input values
      } catch (error) {
        console.error("Stock save failed:", error);
        setFormErrors({ name: "Stock with the same name already exists" });
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={2} lg={2} xl={2}>
          <div className="menu">
            <h1>Menu</h1>
            <ul>
              <li>
                <Link to="/">Stock</Link>
              </li>
              <li>
                <Link to="/order">Order</Link>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={10} lg={10} xl={10}>
          <Button variant="contained" onClick={handleOpenModal}>
            Add Stock
          </Button>
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                padding: "24px",
                minWidth: "300px",
                maxWidth: "400px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6" style={{ marginBottom: "16px" }}>
                Add Stock
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  style={{ marginBottom: "16px" }}
                />
                <TextField
                  name="qty"
                  label="Quantity"
                  value={formData.qty}
                  onChange={handleChange}
                  fullWidth
                  error={!!formErrors.qty}
                  helperText={formErrors.qty}
                  style={{ marginBottom: "16px" }}
                />
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </form>
            </div>
          </Modal>

          <DataTable
            title="Stock"
            columns={columns}
            data={stockData}
            pagination
            paginationPerPage={10}
            highlightOnHover
            striped
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Stock;
