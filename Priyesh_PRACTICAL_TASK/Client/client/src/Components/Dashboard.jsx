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
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import autoTable from "jspdf-autotable";
import { green } from "@mui/material/colors";

const Dashboard = () => {
  const formatCurrency = (params) => {
    const value = Number(params.value);

    if (!isNaN(value)) {
      return value.toFixed(2);
    } else {
      return 0;
    }
  };

  const [rowData, setRowData] = useState([]);

  const [updateData, updatesetRowData] = useState([]);

  //On Value Change
  const onCellValueChanged = (params) => {
    console.log("params---", params);
    const vatRate = 0.2;
    console.log("params?.data:", params?.data);
    console.log("month: ", month);
    // const temp = {
    //   Col1: Number(params?.data["Col1"]) || 0,
    //   Col2: Number(params?.data["Col2"]) || 0,
    //   Col3: Number(params?.data["Col3"]) || 0,
    //   Col4: Number(params?.data["Col4"]) || 0,
    //   Col5: Number(params?.data["Col5"]) || 0,
    //   Col6: Number(params?.data["Col6"]) || 0,
    //   Col7: Number(params?.data["Col7"]) || 0,
    //   Col8: Number(params?.data["Col8"]) || 0,
    //   Col9: Number(params?.data["Col9"]) || 0,
    //   Col10: Number(params?.data["Col10"]) || 0,
    //   Col11: Number(params?.data["Col11"]) || 0,
    //   Col12: Number(params?.data["Col12"]) || 0,
    //   Net: 0,
    //   VAT: 0,
    //   Advance: 0,
    //   Balance: 0,
    //   supplierId: params?.data.id || "",
    //   month: month,
    //   status: false
    // };  

    if (updateData.length > 0) {
      console.log("IF");
      let index = updateData.findIndex((x) => x.id === params?.data?.id);
      if (index >= 0) {
        updateData[index] = params.data;
      } else {
        updateData.push(params?.data);
      }
    } else {
      updateData.push(params?.data);
    }

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

    const vatAmount = Number(finalnet) * Number(vatRate);
    const netWithVAT = Number(vatAmount);
    const balance = Number(netWithVAT) - Number(advance);
    console.log("finalnet: ", finalnet);
    console.log("Advance: ", advance);

    setRowData((prev) => {
      const updatedRowData = prev.map((item) => {
        console.log("item.id: ", item.id);
        console.log("params.data.id: ", params?.data?.id);
        if (item?.id === params?.data?.id) {
          return {
            ...item,
            Net: finalnet,
            VAT: netWithVAT,
            Balance: balance,
            supplierId: item.supplierId,
            month: month,
          };
        }
        return item;
      });
      return updatedRowData;
    });

    updatesetRowData(() => {
      const updatedRowData = updateData.map((item) => {
        console.log("item.id: ", item.id);
        console.log("params.data.id: ", params?.data?.id);
        if (item?.id === params?.data?.id) {
          return {
            ...item,
            Net: finalnet,
            VAT: netWithVAT,
            Balance: balance,
            supplierId: item.id,
            month: month,
          };
        }
        return item;
      });

      console.log("UPDATED ROW DATA: ", updatedRowData);
      return updatedRowData;
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
      //onCellValueChanged,
    },
    {
      field: "Col2",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },
    {
      field: "Col3",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },
    {
      field: "Col4",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },
    {
      field: "Col5",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },
    {
      field: "Col6",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },
    {
      field: "Col7",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },
    {
      field: "Col8",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },
    {
      field: "Col9",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },
    {
      field: "Col10",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },
    {
      field: "Col11",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },
    {
      field: "Col12",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },

    {
      field: "Net",
      width: 80,
      // valueGetter: () => net,
      //onCellValueChanged,
      valueFormatter: formatCurrency,
    },

    {
      field: "VAT",
      width: 80,
      // valueGetter: calculateVAT,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
    },
    {
      field: "Advance",
      editable: true,
      width: 80,
      valueFormatter: formatCurrency,
      //onCellValueChanged,
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
      //onCellValueChanged,
    },

    {
      field: "checkbox",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      rowMultiSelectWithClick: true,
      width: 50,
      //onCellValueChanged,
    },
  ]);

//On Grid Ready

  const onGridReady = () => {
    console.log("AgGrid is Ready");

    fetch("http://localhost:4000/authroutes/supplier")
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);

        if (Array.isArray(resp.data)) {
          const rowData = resp.data.map((item) => {
            // console.log("ITEM LOG", item);
            return {
              name: item.name,
              Col1: Number(item.Col1) || 0,
              Col2: Number(item.Col2) || 0,
              Col3: Number(item.Col3) || 0,
              Col4: Number(item.Col4) || 0,
              Col5: Number(item.Col5) || 0,
              Col6: Number(item.Col6) || 0,
              Col7: Number(item.Col7) || 0,
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

    //month and data dynamic chnage
  

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

  const getUserDetails = (month) => {
    axios
      .get(`http://localhost:4000/authroutes/getinvoicedetails?month=${month}`)
      .then((response) => {
        console.log("RESPONSE___", response);

        if (response?.data?.data && response.data.data.length > 0) {
          const newResponse = response.data.data.map((item) => {
            return {
              name: String(item?.supplier?.name),
              Col1: parseInt(item.Col1) || 0,
              Col2: parseInt(item.Col2) || 0,
              Col3: parseInt(item.Col3) || 0,
              Col4: parseInt(item.Col4) || 0,
              Col5: parseInt(item.Col5) || 0,
              Col6: parseInt(item.Col6) || 0,
              Col7: parseInt(item.Col7) || 0,
              Col8: parseInt(item.Col8) || 0,
              Col9: parseInt(item.Col9) || 0,
              Col10: parseInt(item.Col10) || 0,
              Col11: parseInt(item.Col11) || 0,
              Col12: parseInt(item.Col12) || 0,
              Net: parseInt(item.Net) || 0,
              VAT: parseInt(item.VAT) || 0,
              Advance: parseInt(item.advance) || 0,
              Balance: parseInt(item.Balance) || 0,
              id: String(item.supplierId),
              status: Boolean(item.status)
            };
          });

          console.log("NEW REP", newResponse);

          setRowData((prev) => {
            const updatedRowData = prev.map((item) => {
              for (let i = 0; i < newResponse.length; i++) {
                if (item?.id === newResponse[i].id) {
                  const temp = newResponse[i];
                  return {
                    name: String(temp.name),
                    Col1: parseFloat(temp.Col1) || 0,
                    Col2: parseFloat(temp.Col2) || 0,
                    Col3: parseFloat(temp.Col3) || 0,
                    Col4: parseFloat(temp.Col4) || 0,
                    Col5: parseFloat(temp.Col5) || 0,
                    Col6: parseFloat(temp.Col6) || 0,
                    Col7: parseFloat(temp.Col7) || 0,
                    Col8: parseFloat(temp.Col8) || 0,
                    Col9: parseFloat(temp.Col9) || 0,
                    Col10: parseFloat(temp.Col10) || 0,
                    Col11: parseFloat(temp.Col11) || 0,
                    Col12: parseFloat(temp.Col12) || 0,
                    Net: parseFloat(temp.Net) || 0,
                    VAT: parseFloat(temp.VAT) || 0,
                    Advance: parseFloat(temp.advance) || 0,
                    Balance: parseFloat(temp.Balance) || 0,
                    id: String(temp.id),
                    status: temp.status
                  };
                }
              }
              return item;
            });
            console.log("UPDATED DATA",updatedRowData)
            return updatedRowData;
          });
        } else {
          onGridReady();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Save data

  const saveData = () => {
    console.log("__", updateData, month);

    if (updateData.length == 0) {
      return;
    }

    const filteredData = updateData?.map((item) => {
      return {
        month,
        Col1: parseFloat(item.Col1),
        Col2: parseFloat(item.Col2),
        Col3: parseFloat(item.Col3),
        Col4: parseFloat(item.Col4),
        Col5: parseFloat(item.Col5),
        Col6: parseFloat(item.Col6),
        Col7: parseFloat(item.Col7),
        Col8: parseFloat(item.Col8),
        Col9: parseFloat(item.Col9),
        Col10: parseFloat(item.Col10),
        Col11: parseFloat(item.Col11),
        Col12: parseFloat(item.Col12),
        Net: parseFloat(item.Net),
        VAT: parseFloat(item.VAT),
        Advance: parseFloat(item.Advance),
        Balance: parseFloat(item.Balance),
        supplierId: String(item.supplierId),
        status: item.status
      };
    });
    console.log("__filter", filteredData);

    axios
      .post("http://localhost:4000/authroutes/postinvoicedetails", {
        data: filteredData,
      })
      .then((response) => {
        getUserDetails(month); // Call getUserDetails() with the desired month
        updatesetRowData([]); //empty erray
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  useEffect(() => {
    getUserDetails(month);
  }, [month]);

  const [invoiveSelectData, setInvoiveSelectData] = useState([]);
  //On Row Select
  const handleRowSelected = (event) => {
    const selectedRows = event.api.getSelectedRows();
    setInvoiveSelectData(selectedRows)
    console.log("selectedRows", selectedRows);
  };

  //On Submit Email Button
  const handleSendEmail = async () => {
    try {
      await axios.post("http://localhost:4000/authroutes/send-email", {
        data: invoiveSelectData,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  //PDF
  const handleCombineAndDownload = () => {
    if (invoiveSelectData.length <= 0) {
      Swal.fire(
        "No rows selected",
        "Please select at least one row to download.",
        "warning"
      );
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setTextColor("#008080");
    doc.text("Invoice Month: " + month, 10, 10);

    const tableHeaders = ["Invoice Description", "Amount(GBP)"];

    invoiveSelectData.forEach((row, index) => {
      if (index > 0) {
        doc.addPage();
      }

      const supplierName = row.name;
      doc.setFontSize(14);
      doc.setTextColor("#800080");
      doc.text("Name: " + supplierName, 10, 20);

      const tableData = [
        ["Col1", row.Col1],
        ["Col2", row.Col2],
        ["Col3", row.Col3],
        ["Col4", row.Col4],
        ["Col5", row.Col5],
        ["Col6", row.Col6],
        ["Col7", row.Col7],
        ["Col8", row.Col8],
        ["Col9", row.Col9],
        ["Col10", row.Col10],
        ["Col11", row.Col11],
        ["Col12", row.Col12],
        ["Net", row.Net],
        ["VAT", row.VAT],
        ["Advance", row.Advance],
        ["Balance", row.Balance],
      ];

      const options = {
        theme: "striped",
        headStyles: {
          fillColor: "#008080",
          textColor: "#ffffff",
        },
        bodyStyles: {
          textColor: "#333333",
        },
        alternateRowStyles: {
          fillColor: "#f5f5f5",
        },
        startY: 40,
      };

      doc.autoTable({
        head: [tableHeaders],
        body: tableData,
        ...options,
      });
    });

    doc.save("InvoiceDetails.pdf");
  };

 // Approve Invoice
const approveInvoice = () => {  
  invoiveSelectData.forEach((row) => {
    row.status = true;
    console.log("invoiveSelectData for Approve",invoiveSelectData)
  });

  updatesetRowData(() => {
    const updatedRowData = invoiveSelectData.map((item) => {
      item =  {
        ...item,
        supplierId: item.id,
        month: month,
      };
      return item;
    });

    console.log("UPDATED ROW DATA: ", updatedRowData);
    return updatedRowData;
  });
  saveData();
};

//color chnage
const gridOptions = {
  getRowStyle: (params) => ({
    background: params.data.status ? "#CEFCBA" : "",
 }),
}

  

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
            id="secondMonthInput"
            name="secondMonthInput"

            readOnly
              />
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-6"></div>
          <div className="col-lg-6">
            <button
              type="button"
              className="btn btn-primary mx-3"
              onClick={handleSendEmail}
            >
              Email Invoices
            </button>
            <button type="button" className="btn btn-primary mx-3"
            onClick={approveInvoice}>

              Approve Invoices
            </button>
            <button
              type="button"
              className="btn btn-primary mx-3"
              onClick={handleCombineAndDownload}
            >
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
            rowSelection="multiple"
            onRowSelected={handleRowSelected}
            gridOptions={gridOptions}
          ></AgGridReact>
        </div>

        <button className="btn btn-primary" onClick={saveData}>
          Save
        </button>
      </div>
    </>
  );
};

export default Dashboard;
