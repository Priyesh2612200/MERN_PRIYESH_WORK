import {
  Button,
  Modal,
  Typography,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { postOrderData } from "../Redux/Actions/postOrderAction";
import { useDispatch } from "react-redux";

const Order = () => {
  const dispatch = useDispatch();

  const [orderData, setOrderData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    stock: "",
    orderQty: "",
  });
  const [stockOptions, setStockOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({
    customerName: "",
    stock: "",
    orderQty: "",
  });

  useEffect(() => {
    fetchOrderData();
    fetchStockOptions();
  }, []);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getorder");
      const data = response.data.data;
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const fetchStockOptions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getStock");
      const options = response.data.data;
      setStockOptions(options);
    } catch (error) {
      console.error("Error fetching stock options:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      customerName: "",
      stock: "",
      orderQty: "",
    });
    setFormErrors({
      customerName: "",
      stock: "",
      orderQty: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear form errors when user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (formData.customerName.trim() === "") {
      errors.customerName = "Customer Name is required";
    }
    if (formData.stock.trim() === "") {
      errors.stock = "Stock is required";
    }
    const orderQty = parseInt(formData.orderQty);
    if (isNaN(orderQty) || orderQty <= 0) {
      errors.orderQty = "Order Quantity must be a positive number";
    }

    if (Object.keys(errors).length === 0) {

      // Find the stock object based on the selected stock name
      const selectedStock = stockOptions.find(
        (stock) => stock.name === formData.stock
      );
      if (selectedStock) {
        const requestData = {
          customerName: formData.customerName,
          orderQty: orderQty,
          stockId: selectedStock.id,
          stock: selectedStock,
        };

        dispatch(postOrderData(requestData))
          .then((response) => {
            handleCloseModal(); // Close the modal after successful submission
          })
          .catch((error) => {
            console.error("API Error:", error);
            // Handle error cases
            handleCloseModal(); // Close the modal even if there's an error
          });
      } else {
        console.error("Selected stock not found");
        handleCloseModal(); // Close the modal if the selected stock is not found
      }
    } else {
      setFormErrors(errors);
    }
  };

  const columns = [
    {
      name: "Customer Name",
      selector: "customerName",
      sortable: true,
    },
    {
      name: "Order Quantity",
      selector: "orderQty",
      sortable: true,
    },
    {
      name: "Stock",
    selector: (row) => row.stock.name,
      sortable: true,
    },
  ];

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
            Add Order
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
                maxWidth: "500px",
              }}
            >
              <Typography variant="h5">Add Order</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  name="customerName"
                  label="Customer Name"
                  value={formData.customerName}
                  onChange={handleChange}
                  error={!!formErrors.customerName}
                  helperText={formErrors.customerName}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="stock"
                  select
                  label="Stock"
                  value={formData.stock}
                  onChange={handleChange}
                  error={!!formErrors.stock}
                  helperText={formErrors.stock}
                  fullWidth
                  margin="normal"
                >
                  {stockOptions.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  name="orderQty"
                  label="Order Quantity"
                  type="number"
                  value={formData.orderQty}
                  onChange={handleChange}
                  error={!!formErrors.orderQty}
                  helperText={formErrors.orderQty}
                  fullWidth
                  margin="normal"
                />
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </form>
            </div>
          </Modal>
          <DataTable
            title="Order Data"
            columns={columns}
            data={orderData}
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

export default Order;
