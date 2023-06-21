// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   TextField,
//   Select,
//   MenuItem,
//   Container,
//   Checkbox,
//   Button,
// } from "@mui/material";
// import { Edit, Delete, Search, Sort } from "@mui/icons-material";
// import axios from "axios";
// import { Pagination } from "@mui/lab";
// import { useNavigate } from "react-router-dom";

// const Category = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [sortField, setSortField] = useState("title");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(2);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("AllCategory");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const navigate = useNavigate();
//   const handleBack = () => {
//     navigate("/");
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/filltercategory",
//         {
//           params: {
//             category:
//               selectedCategory !== "AllCategory" ? selectedCategory : undefined,
//           },
//         }
//       );
//       console.log("RESPONSE", response);
//       setData(response.data.data);
//       setFilteredData(response.data.data);
//     } catch (error) {
//       console.log("Error fetching data:", error);
//     }
//   };

//   const handleSearchChange = (event) => {
//     const value = event.target.value;
//     setSearchValue(value);
//   };

//   const handleSearchClick = () => {
//     filterData(searchValue, sortField, sortOrder, selectedCategory);
//   };

//   const handleSortChange = (field) => {
//     let order = "asc";
//     if (sortField === field && sortOrder === "asc") {
//       order = "desc";
//     }
//     setSortField(field);
//     setSortOrder(order);
//     filterData(searchValue, field, order, selectedCategory);
//   };

//   const filterData = (search, field, order, category) => {
//     let filtered = data.filter((item) =>
//       item.title.toLowerCase().includes(search.toLowerCase())
//     );

//     if (category !== "AllCategory") {
//       filtered = filtered.filter((item) => item.categorylist.name === category);
//     }

//     if (order === "asc") {
//       filtered.sort((a, b) => (a[field] > b[field] ? 1 : -1));
//     } else {
//       filtered.sort((a, b) => (a[field] < b[field] ? 1 : -1));
//     }

//     setFilteredData(filtered);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (event, page) => {
//     setCurrentPage(page);
//   };

//   const handleCheckboxChange = (event, productId) => {
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       setSelectedItems((prevSelectedItems) => [
//         ...prevSelectedItems,
//         productId,
//       ]);
//     } else {
//       setSelectedItems((prevSelectedItems) =>
//         prevSelectedItems.filter((item) => item !== productId)
//       );
//     }
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     filterData(searchValue, sortField, sortOrder, category);
//   };

//   const handleDeleteSelected = async () => {
//     try {
//       await Promise.all(
//         selectedItems.map((itemId) =>
//           axios.delete(`http://localhost:5000/deleteProduct/${itemId}`)
//         )
//       );
//       setSelectedItems([]);
//       fetchData();
//     } catch (error) {
//       console.log("Error deleting selected items:", error);
//     }
//   };

//   const renderTableData = () => {
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     const currentData = filteredData.slice(start, end);

//     return currentData.map((item) => (
//       <TableRow key={item.id}>
//         <TableCell>
//           <img
//             // src={require(`D:/MERN_PRIYESH_WORK_GIT/MERN_PRIYESH_WORK/Product_Category/server/uplodes/${item.file}`)}
//             src={`http://localhost:5000/uplodes/${item.file}`}
//             alt={item.file}
//             style={{ width: "100px", height: "50px" }}
//           />
//         </TableCell>
//         <TableCell>{item.title}</TableCell>
//         <TableCell>{item.description}</TableCell>
//         <TableCell>{item?.categorylist?.name}</TableCell>
//         <TableCell>
//           <IconButton aria-label="Edit">
//             <Edit />
//           </IconButton>
//           <IconButton
//             aria-label="Delete Selected"
//             onClick={handleDeleteSelected}
//             disabled={selectedItems.length === 0}
//           >
//             <Delete />
//           </IconButton>
//         </TableCell>
//         <TableCell>
//           <Checkbox
//             checked={selectedItems.includes(item.id)}
//             onChange={(e) => handleCheckboxChange(e, item.id)}
//           />
//         </TableCell>
//       </TableRow>
//     ));
//   };

//   const renderTableHeader = () => (
//     <TableHead>
//       <TableRow>
//         <TableCell></TableCell>
//         <TableCell>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               cursor: "pointer",
//             }}
//             onClick={() => handleSortChange("title")}
//           >
//             <div style={{ fontWeight: "bold" }}>Title</div>
//             {sortField === "title" && <Sort style={{ marginLeft: "0.5rem" }} />}
//           </div>
//         </TableCell>
//         <TableCell>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               cursor: "pointer",
//             }}
//             onClick={() => handleSortChange("description")}
//           >
//             <div style={{ fontWeight: "bold" }}>Description</div>
//             {sortField === "description" && (
//               <Sort style={{ marginLeft: "0.5rem" }} />
//             )}
//           </div>
//         </TableCell>
//         <TableCell>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               cursor: "pointer",
//             }}
//             onClick={() => handleSortChange("category")}
//           >
//             <div style={{ fontWeight: "bold" }}>Category</div>
//             {sortField === "category" && (
//               <Sort style={{ marginLeft: "0.5rem" }} />
//             )}
//           </div>
//         </TableCell>
//         <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
//         <TableCell style={{ fontWeight: "bold" }}>
//           <Checkbox
//             checked={selectedItems.length === filteredData.length}
//             onChange={(e) => handleCheckboxChangeAll(e)}
//           />
//         </TableCell>
//       </TableRow>
//     </TableHead>
//   );

//   const handleCheckboxChangeAll = (event) => {
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       const allItemIds = filteredData.map((item) => item.id);
//       setSelectedItems(allItemIds);
//     } else {
//       setSelectedItems([]);
//     }
//   };

//   const renderPagination = () => {
//     const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           marginTop: "1rem",
//         }}
//       >
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={handlePageChange}
//           color="primary"
//           showFirstButton
//           showLastButton
//         />
//       </div>
//     );
//   };

//   return (
//     <>
//       <Container sx={{ mt: 2 }}>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             marginBottom: "1rem",
//           }}
//         >
//           <TextField
//             label="Search"
//             variant="outlined"
//             value={searchValue}
//             onChange={handleSearchChange}
//             InputProps={{
//               endAdornment: (
//                 <IconButton aria-label="Search" onClick={handleSearchClick}>
//                   <Search />
//                 </IconButton>
//               ),
//             }}
//           />
//           <Select
//             value={sortField}
//             onChange={(e) => handleSortChange(e.target.value)}
//             style={{ marginLeft: "1rem" }}
//           >
//             <MenuItem value="title">Title</MenuItem>
//             <MenuItem value="description">Description</MenuItem>
//             <MenuItem value="category">Category</MenuItem>
//           </Select>

//           <Select
//             title="Select Category"
//             value={selectedCategory}
//             onChange={(e) => handleCategoryChange(e.target.value)}
//             style={{ marginLeft: "1rem" }}
//           >
//             <MenuItem value="AllCategory">All Category</MenuItem>
//             <MenuItem value="car">Car</MenuItem>
//             <MenuItem value="bike">Bike</MenuItem>
//           </Select>
//         </div>
//         <TableContainer component={Paper}>
//           <Table>
//             {renderTableHeader()}
//             <TableBody>{renderTableData()}</TableBody>
//           </Table>
//         </TableContainer>
//         {renderPagination()}
//         <Button color="primary" variant="contained" onClick={handleBack}>
//           Back
//         </Button>
//       </Container>
//     </>
//   );
// };

// export default Category;


import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Container,
  Checkbox,
  Button,
} from "@mui/material";
import { Edit, Delete, Search, Sort } from "@mui/icons-material";
import axios from "axios";
import { Pagination } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("AllCategory");

  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSortType] = useState("asc");



  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedCategory]);
  

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/filltercategory", {
        params: {
          page: currentPage,
          search: searchQuery,
          sort: sort,
          sortFieldName: "title",
          category: selectedCategory // Send selected category to the backend
        },
      });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  

  const handleSearchChange = async () => {
    try {
      const response = await axios.get("http://localhost:5000/filltercategory", {
        params: {
          page: currentPage,
          search: searchQuery,
          sortFieldName: "title", // Provide the desired sort field name here
          sort: sort, // Set the desired sort type (asc or desc)
          category: selectedCategory
        },
      });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  

  const handleSortChange = async () => {
    const newSortType = sort === "asc" ? "desc" : "asc";
    try {
      const response = await axios.get("http://localhost:5000/filltercategory", {
        params: {
          page: currentPage,
          search: searchQuery,
          sortFieldName: "title", // Provide the desired sort field name here
          sort:newSortType, // Set the desired sort type (asc or desc)
          category: selectedCategory
        },
      });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
      setSortType(newSortType); // Update the sortType state
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  
  

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(); // Reset the current page to fetch the first page of data
  };
  

  const handleCheckboxChange = (event, productId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedItems([productId]); // Replace the selectedItems array with a new array containing only the current productId
    } else {
      setSelectedItems([]); // Clear the selectedItems array
    }
  };
  

  const handleDelete = async () => {
    try {
      for (const productId of selectedItems) {
        await axios.delete(`http://localhost:5000/products/${productId}`);
      }
      setSelectedItems([]); // Clear the selectedItems array after deletion
      fetchData(); // Fetch the updated data
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  const renderTableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox />
          </TableCell>
          <TableCell>
            <IconButton onClick={handleSortChange}>
              <Sort />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton onClick={handleSortChange}>
              <Sort />
            </IconButton>
          </TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
    );
  };
  

  const renderTableBody = () => {
    return (
      <TableBody>
        {data.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <Checkbox
                checked={selectedItems.includes(item._id)}
                onChange={(event) => handleCheckboxChange(event, item._id)}
              />
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item?.categorylist?.name}</TableCell>
            <TableCell>
              <img
                src={`http://localhost:5000/uplodes/${item.file}`}
                alt={item.file}
                style={{ width: "100px", height: "50px" }}
              />
            </TableCell>
            <TableCell>
              <IconButton>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(item._id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      
      <div>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <IconButton onClick={handleSearchChange}>
          <Search />
        </IconButton>
        <Select
          value={selectedCategory}
          onChange={(event) => handleCategoryChange(event.target.value)}
        >
          <MenuItem value="AllCategory">All Categories</MenuItem>
          <MenuItem value="car">Car</MenuItem>
          <MenuItem value="bike">Bike</MenuItem>
        </Select>


      </div>
      <TableContainer component={Paper}>
        <Table>
          {renderTableHeader()}
          {renderTableBody()}
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
      <Button onClick={handleBack}>Back</Button>
    </Container>
  );
};

export default Category;







