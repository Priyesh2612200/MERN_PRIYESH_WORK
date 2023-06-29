import {
  Button,
  Modal,
  Typography,
  TextField,
  MenuItem,
  Container
} from "@mui/material";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { postOrderData } from "../Redux/Actions/postOrderAction";
import { useDispatch } from "react-redux";
import { daleteAPIOrder } from "../ApiEndPoints.js";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

import "../App.css";

const Order = () => {
  const dispatch = useDispatch();

  const [orderData, setOrderData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
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
      const selectedStock = stockOptions.find(
        (stock) => stock.name === formData.stock
      );
      if (selectedStock) {
        if (orderQty <= selectedStock.qty) {
          const requestData = {
            customerName: formData.customerName,
            orderQty: orderQty,
            stockId: selectedStock.id,
            stock: selectedStock,
          };

          setIsLoading(true); // Set loading state to true

          dispatch(postOrderData(requestData))
            .then(() => {
              // Deduct the order quantity from the selected stock
              selectedStock.qty -= orderQty;
              handleCloseModal();

              setTimeout(() => {
                fetchOrderData(); // Fetch updated order data
                setIsLoading(false); // Set loading state to false
              }, 1000);
            })
            .catch((error) => {
              console.error("API Error:", error);
              handleCloseModal();
              setIsLoading(false); // Set loading state to false
            });
        } else {
          errors.orderQty = `Order Quantity cannot exceed the available quantity (${selectedStock.qty}) for selected stock`;
          setFormErrors(errors);
        }
      } else {
        console.error("Selected stock not found");
        handleCloseModal();
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleDelete = async (orderId) => {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await daleteAPIOrder(orderId);
          // Find the deleted order in orderData state and retrieve the stockId and orderQty
          const deletedOrder = orderData.find((order) => order.id === orderId);
          if (deletedOrder) {
            const { stockId, orderQty } = deletedOrder;
            const selectedStock = stockOptions.find((stock) => stock.id === stockId);
            if (selectedStock) {
              // Add the orderQty back to the selected stock
              const updatedQty = selectedStock.qty + orderQty;
              selectedStock.qty = updatedQty;
              setStockOptions([...stockOptions]);
              Swal.fire("Success", "Data deleted successfully", "success");
              fetchOrderData(); // Fetch updated Order data
            }
          }
        } catch (error) {
          console.error("API Error:", error);
          Swal.fire("Error", "Failed to delete data", "error");
        }
      }
    });
  };
  

  const columns = [
    {
      name: <div style={{fontWeight:'bold', fontSize:'20px'}}>Customer Name</div>, 
      selector: (row) => row.customerName,
      sortable: true,
      style:{ backgroundColor: '#3B9091', fontSize:'16px'},
    },
    {
      name: <div style={{fontWeight:'bold', fontSize:'20px'}}>Order Quantity</div>,
      selector: (row) => row.orderQty,
      sortable: true,
      style:{ backgroundColor: '#3B9091', fontSize:'16px'},
    },
    {
      name: <div style={{fontWeight:'bold', fontSize:'20px'}}>Stock</div>,
      selector: (row) => row.stock.name,
      sortable: true,
      style:{ backgroundColor: '#3B9091', fontSize:'16px'},
    },
    {
      name: <div style={{fontWeight:'bold', fontSize:'20px'}}>Actions</div>,
      sortable: false,
      style:{ backgroundColor: '#3B9091', fontSize:'16px'},
      cell: (row) => (
        <div>
          <IconButton onClick={() => handleDelete(row.id)}>
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
     <Container maxWidth="lg" style={{marginTop:'20px'}}>
        <Button style={{backgroundColor:'#00AAAA', color:'white', fontWeight:'bold'}} onClick={handleOpenModal}>
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
              <Button type="submit" style={{backgroundColor:'#00AAAA', color:'white', fontWeight:'bold'}}>
                Submit
              </Button>
            </form>
          </div>
        </Modal>

        {isLoading ? (
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    ) : (
      <DataTable
      title={<b>ORDER DATA</b>}
       columns={columns}
       data={orderData}
       pagination
       paginationPerPage={10}
       highlightOnHover
       striped
     />
      )}

        
     </Container>
    </>
  );
};

export default Order;
