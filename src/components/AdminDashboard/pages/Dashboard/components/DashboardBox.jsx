import { HiDotsVertical } from "react-icons/hi";
import Button from "@mui/material/Button";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";

const DashboardBox = props => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const token = localStorage.getItem("authToken");

  const userFetch = async () => {
    try {
      const response = await fetch("http://localhost:3001/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching customers: ${response.statusText}`);
      }
      const data = await response.json();
      setCustomers(data.content || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const orderFetch = async () => {
    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.statusText}`);
      }
      const data = await response.json();
      setOrders(data.content || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      userFetch();
      orderFetch();
    }
  }, [token]);

  useEffect(() => {
    console.log(orders.length);
  }, [orders]);

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
      {props.grow ? (
        <span className="chart">
          <TrendingUpIcon />
        </span>
      ) : (
        <span className="chart">
          <TrendingDownIcon />
        </span>
      )}
      {props.user ? (
        <div className="d-flex w-100">
          <div className="col1">
            <h4 className="text-white mb-0">Utenti totali</h4>
            <span className="text-white">{customers.length}</span>
          </div>
        </div>
      ) : (
        <div className="d-flex w-100">
          <div className="col1">
            <h4 className="text-white mb-0">Ordini totali</h4>
            <span className="text-white">{orders.length}</span>
          </div>
        </div>
      )}
    </Button>
  );
};

export default DashboardBox;
