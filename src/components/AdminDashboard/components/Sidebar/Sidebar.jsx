import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdDashboard } from "react-icons/md";
import { FaProductHunt, FaCartArrowDown, FaList } from "react-icons/fa";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navigate = useNavigate();

  const handleClick = index => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/loginAdmin");
  };

  return (
    <div className="sidebar mt-4 mx-4 ">
      <List
        className=""
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton component={Link} to="/dashboard">
          <ListItemIcon>
            <MdDashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton onClick={() => handleClick(0)}>
          <ListItemIcon>
            <FaProductHunt />
          </ListItemIcon>
          <ListItemText primary="Prodotti" />
          {openSubmenu === 0 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSubmenu === 0} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="/products/create"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <AiFillProduct />
              </ListItemIcon>
              <ListItemText primary="Crea prodotto" />
            </ListItemButton>
            <ListItemButton component={Link} to="/products/list" sx={{ pl: 4 }}>
              <ListItemIcon>
                <FaList />
              </ListItemIcon>
              <ListItemText primary="Lista prodotti" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton component={Link} to="/orders">
          <ListItemIcon>
            <FaCartArrowDown />
          </ListItemIcon>
          <ListItemText primary="Ordini" />
        </ListItemButton>
        <ListItemButton component={Link} to="/settings">
          <ListItemIcon>
            <IoIosSettings />
          </ListItemIcon>
          <ListItemText primary="Impostazioni" />
        </ListItemButton>
      </List>

      <br />

      <div className="logoutWrapper mt-5">
        <div className="logoutBox">
          <Button variant="contained" onClick={handleLogout}>
            <IoMdLogOut /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
