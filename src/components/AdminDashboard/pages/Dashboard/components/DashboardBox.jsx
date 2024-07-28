import { HiDotsVertical } from "react-icons/hi";
import Button from "@mui/material/Button";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { IoIosTimer } from "react-icons/io";

const DashboardBox = props => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const token = localStorage.getItem("authToken");

  const userFetch = () => {
    fetch("http://localhost:3001/customers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setCustomers(data.content || []);
      })
      .catch(error => console.error("Error fetching products:", error));
  };

  const orderFetch = () => {
    fetch("http://localhost:3001/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching order: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setOrders(data.content || []);
      })
      .catch(error => console.error("Error fetching order:", error));
  };

  useEffect(() => {
    if (token) {
      userFetch();
      orderFetch();
    }
  }, [token]);

  const ITEM_HEIGHT = 48;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Button
      className="dashboardBox"
      style={{
        backgroundImage: `linear-gradient(to right, ${props.color?.[0]} , ${props.color?.[1]})`,
      }}
    >
      {props.grow === true ? (
        <span className="chart">
          <TrendingUpIcon />
        </span>
      ) : (
        <span className="chart">
          <TrendingDownIcon />
        </span>
      )}

      <div className="d-flex w-100">
        <div className="col1">
          {props.user ? (
            <>
              <h4 className="text-white mb-0">{props.details}</h4>
              <span className="text-white">{props.user}</span>
            </>
          ) : (
            <>
              <h4 className="text-white mb-0">Total Users</h4>
              <span className="text-white">{customers.length}</span>
            </>
          )}
        </div>
      </div>

      <div className="d-flex align-items-center w-100 bottomEle">
        <h6 className="text-white mb-0 mt-0">Last Month</h6>
        <div className="ml-auto">
          <Button className="ml-auto toggleIcon" onClick={handleClick}>
            <HiDotsVertical />
          </Button>
          <Menu
            className="dropdown_menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <IoIosTimer /> Last Day
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <IoIosTimer /> Last Week
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <IoIosTimer /> Last Month
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <IoIosTimer /> Last Year
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Button>
  );
};

export default DashboardBox;
