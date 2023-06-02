// import React, { useState } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   TextField,
//   Button,
//   Link,
//   Typography,
//   makeStyles,
// } from '@material-ui/core';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   form: {
//     width: '100%',
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// const LoginPage = () => {
//   const classes = useStyles();
//   const navigate = useNavigate()

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/userroutes/login', { email, password });

//       // Access token
//       const token = response.data.token;

//       // Save the token to local storage
//       localStorage.setItem('token', token);

//       navigate('/userProfilepage'); // Redirect to user-profile page
//     } catch (error) {
//       console.log('Login failed:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'First Register yourself and then login!',
//       });
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <div className={classes.container}>
//         <Typography component="h1" variant="h5">
//           Log In
//         </Typography>
//         <form className={classes.form} onSubmit={handleSubmit}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             value={password}
//             onChange={handlePasswordChange}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Log In
//           </Button>
//         </form>
//         <Typography>
//           Don't have an account?{' '}
//           <Link href="/Registartion" variant="body2">
//             Sign Up
//           </Link>
//         </Typography>
//       </div>
//     </Container>
//   );
// };

// export default LoginPage;

// // import loginImage from './loginimage.png';

// // image: {
// //     backgroundImage: `url(${loginImage})`,

// //   }

import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3002/userroutes/login",
        { email, password }
      );

      localStorage.setItem("Response",JSON.stringify(response))
  
      // Access token
      const token = response?.data?.data?.accessToken;
      console.log("TOKEN______", response);
  
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login failed. Please try again!",
        });
        return;
      }
  
      // Save the token to local storage
      localStorage.setItem("token", token);
  
      navigate("/navbar"); // Redirect to navbar page
    } catch (error) {
      console.log("Login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed. Please try again!",
      });
    }
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
        </form>
        <Typography>
          Don't have an account?{" "}
          <Link href="/Registartion" variant="body2">
            Sign Up
          </Link>
        </Typography>
      </div>
    </Container>
  );
};

export default LoginPage;
