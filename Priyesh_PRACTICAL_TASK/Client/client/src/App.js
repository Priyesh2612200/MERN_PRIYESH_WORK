import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegistrationPage from './Components/Registration';
import Dashboard from './Components/Dashboard';
import Protected from './Components/ProtectedRoutes';
import UserProfile from './Components/UserProfile';
import UserProfilepageget from './Components/UserProfileGet';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route
            exact
            path="/navbar"
            element={<Protected Component={Dashboard} />}
          ></Route>
        <Route
            exact
            path="/userprofile/:id"
            element={<Protected Component={UserProfile} />}
          ></Route>
            <Route
            exact
            path="/userprofileget"
            element={<Protected Component={UserProfilepageget} />}
          ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
