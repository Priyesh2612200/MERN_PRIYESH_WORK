import "./App.css";

import Viewdata from "../src/components/view";
import Updatepost from "../src/components/updatepost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostTable from "./components/PostTable";

import RegistrationPage from "../src/components/Registration";
import LoginPage from "../src/components/Login";

import UserProfilepage from "../src/components/userProfile";
import AllUserProfilepage from "../src/components/getAllUser";
import Protected from "./components/Protected";
import UpdateUserInfo from "./components/userupdate";
import UserViewdata from "./components/UserView";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

        <Route exact path="/navbar/" element={<Navbar />}></Route>
       

          <Route exact path="/View" element={<Viewdata />}></Route>
          <Route exact path="/Update/:id" element={<Updatepost />}></Route>
          {/* <Route exact path="/" element={<PostTable />}></Route> */}
          <Route exact path="/getdataandpostdata" element={<PostTable />}></Route>
          <Route exact path="/view/:id" element={<Viewdata />}></Route>

          <Route
            exact
            path="/Registartion"
            element={<RegistrationPage/>}
          ></Route>
          <Route exact path="/" element={<LoginPage />}></Route>
          <Route exact path="/getalluser" element={<Protected Component={AllUserProfilepage} />}></Route>
          <Route exact path="/userProfilepage" element={<Protected Component={UserProfilepage}/>}></Route>
          <Route exact path="/Updateuser/:id" element={<UpdateUserInfo />}></Route>
          <Route exact path="/userview/:id" element={<UserViewdata />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
