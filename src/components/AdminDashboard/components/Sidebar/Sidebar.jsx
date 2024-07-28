import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdDashboard, MdMessage } from "react-icons/md";
import {
  FaAngleRight,
  FaProductHunt,
  FaCartArrowDown,
  FaBell,
  FaUser,
} from "react-icons/fa";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const handleClick = index => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <Button className={`w-100 ${openSubmenu === null ? "active" : ""}`}>
              <span className="icon">
                <MdDashboard />
              </span>
              Dashboard
            </Button>
          </Link>
        </li>
        <li>
          <Button
            className={`w-100 ${openSubmenu === 1 ? "active" : ""}`}
            onClick={() => handleClick(1)}
          >
            <span className="icon mx-2">
              <FaProductHunt />
            </span>
            Prodotti
            <span className="arrow">
              {openSubmenu === 1 ? <ExpandLess /> : <ExpandMore />}
            </span>
          </Button>
          <Collapse in={openSubmenu === 1} timeout="auto" unmountOnExit>
            <List className="submenu">
              <Collapse in={openSubmenu === 1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <Link to="/productAdmin">Lista prodotti</Link>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Collapse>
        </li>
        <li>
          <Link to="/">
            <Button
              className={`w-100 ${openSubmenu === 1 ? "active" : ""}`}
              onClick={() => handleClick(1)}
            >
              <span className="icon mx-2">
                <FaCartArrowDown />
              </span>
              Ordini
              <span className="arrow">
                {openSubmenu === 1 ? <ExpandLess /> : <ExpandMore />}
              </span>
            </Button>
          </Link>
        </li>

        <li>
          <Link to="/">
            <Button
              className={`w-100 ${openSubmenu === 1 ? "active" : ""}`}
              onClick={() => handleClick(1)}
            >
              <span className="icon mx-2">
                <FaBell />
              </span>
              Notifiche
              <span className="arrow">
                {openSubmenu === 1 ? <ExpandLess /> : <ExpandMore />}
              </span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/">
            <Button
              className={`w-100 ${openSubmenu === 1 ? "active" : ""}`}
              onClick={() => handleClick(1)}
            >
              <span className="icon mx-2">
                <IoIosSettings />
              </span>
              Impostazioni
              <span className="arrow">
                {openSubmenu === 1 ? <ExpandLess /> : <ExpandMore />}
              </span>
            </Button>
          </Link>
        </li>
      </ul>

      <br />

      <div className="logoutWrapper">
        <div className="logoutBox">
          <Button variant="contained">
            <IoMdLogOut /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
