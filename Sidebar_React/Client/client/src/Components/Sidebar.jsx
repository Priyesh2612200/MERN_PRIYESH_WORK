import React from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
function Sidebar({children}) {
 
  return (
    // <>

    //   <div className="sidebar">
    //     <ul className="SidebarList">
    //       {SidebarData.map((val, key) => {
    //         return (
    //           <li
    //             key={key}
    //             className="row"
    //           >
    //             <NavLink
    //               to={val.link}
    //               activeClassName="active"
    //             >
    //             <div  className="icon">{val.icon}</div>
    //             <div className="title" >{val.title}</div>  
    //             </NavLink>
            
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   </div>


    <>
    <div className="sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li key={key} className="row">
              <NavLink
                to={val.link}
                activeClassName="active"
                className="sidebar-link"
              >
                <div className="icon">{val.icon}</div>
                <div className="title">{val.title}</div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>

      {/* <div className="homepage">{children}</div> */}
    
    </>
  );
}

export default Sidebar;
