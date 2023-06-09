import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import Logo from "../Source/GillyLogo.png";
import "../Style/tableStyle.css";
import axios from "axios";

const Navbar = () => {
  const formatCurrency = (params) => {
    const value = Number(params.value);

    if (!isNaN(value)) {
      return value.toFixed(2);
    } else {
      return 0;
    }
  };


  
  const [rowData, setRowData] = useState([]);

  const onCellValueChanged = (params) => {
    const vatRate = 0.2;

    const finalnet =
      Number(params?.data["Col1"]) +
      Number(params?.data["Col2"]) +
      Number(params?.data["Col3"]) +
      Number(params?.data["Col4"]) +
      Number(params?.data["Col5"]) +
      Number(params?.data["Col6"]) +
      Number(params?.data["Col7"]) +
      Number(params?.data["Col8"]) +
      Number(params?.data["Col9"]) +
      Number(params?.data["Col10"]) +
      Number(params?.data["Col11"]) +
      Number(params?.data["Col12"]);

    const advance = Number(params?.data["Advance"]) || 0;

    const vatAmount = Number( finalnet) * Number( vatRate);
    const netWithVAT = Number( vatAmount);
    const balance = Number( netWithVAT) - Number( advance);

    setRowData((prev) => {
      console.log("PREV: ", prev);

      const final = prev.map((item) => {
        if (item?.id === params?.data?.id) {
          return { ...item, Net: finalnet, VAT: netWithVAT, Balance: balance };
        } else {
          return item;
        }
      });



      console.log("UPDATED ROW DATA: ", final);
      return final;
    });
  };

  const [columnDefs] = useState([
    { headerName: "Index", valueGetter: "node.rowIndex + 1", width: 80 },
    { headerName: "Name", field: "name" },

    {
      field: "Col1",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Col2",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Col3",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Col4",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Col5",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Col6",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Col7",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Col8",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Col9",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Col10",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Col11",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Col12",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },

    {
      field: "Net",
      width: 80,
      // valueGetter: () => net,
      onCellValueChanged,
      valueFormatter: formatCurrency,
    },

    {
      field: "VAT",
      width: 80,
      // valueGetter: calculateVAT,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Advance",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },
    {
      field: "Balance",
      width: 80,
      valueGetter: (params) => {
        const vatRate = 0.2;
        const net = params?.data?.Net || 0;
        const advance = params?.data?.Advance || 0;
        const balance = net + vatRate * net - advance;
        return balance;
      },
      valueFormatter: formatCurrency,
      onCellValueChanged,
    },

    {
      // headerName: 'Select',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
    },
  ]);

  // useEff

  const onGridReady = (params) => {
    console.log("AgGrid is Ready");

    fetch("http://localhost:4000/authroutes/supplier")
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);

        if (Array.isArray(resp.data)) {
          const rowData = resp.data.map((item) => {
            console.log("ITEM LOG", item);
            return {
              name: item.name,
              Col1: Number(item.Col1) || 0,
              Col2:Number( item.Col2) || 0,
              Col3: Number(item.Col3 )|| 0,
              Col4: Number(item.Col4) || 0,
              Col5:Number( item.Col5 )|| 0,
              Col6: Number(item.Col6) || 0,
              Col7: Number(item.Col7 )|| 0,
              Col8: Number(item.Col8) || 0,
              Col9: Number(item.Col9) || 0,
              Col10: Number(item.Col10) || 0,
              Col11: Number(item.Col11) || 0,
              Col12: Number(item.Col12) || 0,
              Net: Number(item.Net) || 0,
              VAT: Number(item.VAT) || 0,
              Advance: Number(item.advance) || 0,
              Balance: Number(item.Balance) || 0,
              ...item,
            };
          });
       
 


          console.log("ROW DATA_", rowData);
          setRowData(rowData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //month and data dynamic chnage
  const [month, setMonth] = useState("");
  const [lastDate, setLastDate] = useState("");

  const updateLastDate = (event) => {
    const selectedMonth = event.target.value;
    const year = selectedMonth.substr(0, 4);
    const month = selectedMonth.substr(5, 2);
    const lastDay = new Date(year, month, 0).getDate();

    setMonth(selectedMonth);
    setLastDate(`${year}-${month}-${lastDay}`);

     // Call the API only if a month is selected
  if (selectedMonth) {
    getUserDetails(selectedMonth);
  }
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to the login page
    window.location.href = "/";
  };

  const handleUserProfile = () => {
    navigate("/userprofileget");
  };

  const navigate = useNavigate();

  //get Invoive_Details
  const [userData, setUserData] = useState({});
  const getUserDetails = (month) => {
    axios
      .get(`http://localhost:4000/authroutes/getinvoicedetails?month=${month}`)
      .then((response) => {
console.log("RESPONSE___",response)
       const newresponse= response?.data?.data?.map((item)=>{
          return { 
                name:String(item?.supplier?.name),
                Col1: Number(item.Col1) || 0,
                Col2:Number( item.Col2) || 0,
                Col3: Number(item.Col3 )|| 0,
                Col4: Number(item.Col4) || 0,
                Col5:Number( item.Col5 )|| 0,
                Col6: Number(item.Col6) || 0,
                Col7: Number(item.Col7 )|| 0,
                Col8: Number(item.Col8) || 0,
                Col9: Number(item.Col9) || 0,
                Col10: Number(item.Col10) || 0,
                Col11: Number(item.Col11) || 0,
                Col12: Number(item.Col12) || 0,
                Net: Number(item.Net) || 0,
                VAT: Number(item.VAT) || 0,
                Advance: Number(item.advance) || 0,
                Balance: Number(item.Balance) || 0,
               
  
          }
        })
         console.log("NEW REP",newresponse)
        setRowData(newresponse);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 console.log("INVOICE DATA___",userData);

// Save and Update Invoices 
//  const saveData = () => {
//   console.log("__", rowData, month);
//   const filteredData = rowData.map((item) => {
//     return { ...item, month };
//   });
//   console.log('__filter', filteredData);

//   // Get the user details first to check if data already exists
//   getUserDetails(month)
//     .then((userData) => {
//       const userExists = userData.length > 0;

//       if (userExists) {
//         // User data exists, update it
//         const userId = userData[0].id; // Assuming you have an 'id' property for user data
//         axios
//           .put(`http://localhost:4000/authroutes/updateinvoicedetails/${userId}`, {
//             data: filteredData,
//           })
//           .then((response) => {
//             console.log("Data updated successfully!");
//           })
//           .catch((error) => {
//             console.error("Error updating data:", error);
//           });
//       } else {
//         // User data doesn't exist, post new data
//         axios
//           .post("http://localhost:4000/authroutes/postinvoicedetails", {
//             data: filteredData,
//           })
//           .then((response) => {
//             console.log("Data saved successfully!");
//           })
//           .catch((error) => {
//             console.error("Error saving data:", error);
//           });
//       }
//     })
//     .catch((error) => {
//       console.error("Error getting user details:", error);
//     });
// };

 
  //Save data
  
  
  const saveData = () => {
    console.log("__", rowData, month);
    const filteredData = rowData?.map((item) => {
      return { ...item, month };
    });
    console.log('__filter',filteredData);

    const finaldata = filteredData.map((item)=>{

    })

    axios
      .post("http://localhost:4000/authroutes/postinvoicedetails", {
        data: filteredData,
      })
      .then((response) => {
       getUserDetails(month); // Call getUserDetails() with the desired month
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  useEffect(() => {
    getUserDetails(month);
  }, [month])
  

  return (
    <>
      <AppBar
        position="static"
        style={{ backgroundColor: "#F3F3F3", color: "#D1A84D" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "11%", marginTop: "10px" }}
            />
          </Typography>
          <IconButton
            color="inherit"
            aria-label="user profile"
            onClick={handleUserProfile}
          >
            <AccountCircleIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="container-fluid">
        <div className="row mt-3">
          <h4> Monthly Invoice List </h4>
        </div>

        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-6">
              <form>
                <label htmlFor="monthInput" className="form-label">
                  Month:
                </label>

                <input
                  type="month"
                  className="form-control"
                  id="monthInput"
                  name="monthInput"
                  onChange={updateLastDate}
                />

                <label htmlFor="dateInput" className="form-label">
                  Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateInput"
                  name="dateInput"
                  value={lastDate}
                  readOnly
                />
              </form>
            </div>

            <div className="col-lg-6 mt-5">
              <label htmlFor="monthInput" className="form-label">
                Invoice Reference:
              </label>
              <input
                type="month"
                className="form-control"
                id="monthInput"
                name="monthInput"
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-6"></div>
          <div className="col-lg-6">
            <button type="button" className="btn btn-primary mx-3">
              Email Invoices
            </button>
            <button type="button" className="btn btn-primary mx-3">
              Approve Invoices
            </button>
            <button type="button" className="btn btn-primary mx-3">
              Combine and Download
            </button>
          </div>
        </div>

        {/* AgGrid Table */}
        <div
          className="ag-theme-alpine"
          style={{ height: 400, width: 1330, marginTop: "10px" }}
        >
          <AgGridReact
            rowData={rowData}
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            onCellValueChanged={onCellValueChanged}
          ></AgGridReact>
        </div>

        <button className="btn btn-primary" onClick={saveData}>
          Save
        </button>
      </div>
    </>
  );
};

export default Navbar;
