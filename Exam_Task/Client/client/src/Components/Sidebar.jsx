import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { SidebarData } from "./SidebarData";

function Sidebar({ children }) {
  return (
    <>
      <div className="sidebar">
        <ul className="SidebarList">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                className="row"
              >
                <NavLink
                  to={val.link}
                  activeClassName="active"
                >
                <div  className="icon">{val.icon}</div>
                  <div  className="title">{val.title}</div>  
                </NavLink>
            
              </li>
            );
          })}
        </ul>
      </div>

      <div className="anypage">{children}</div>
    </>
  );
}

export default Sidebar;



