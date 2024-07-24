import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// Import dei componenti
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Dashboard from "./components/AdminDashboard/pages/Dashboard/Dashboard";
import Products from "./components/AdminDashboard/pages/Products/Products";
import ProductDetails from "./components/AdminDashboard/pages/ProductDetails/ProductDetails";
import ProductUpload from "./components/AdminDashboard/pages/ProductUpload/ProductUpload";
import Login from "./components/Login";
import Registration from "./components/Registration";
import UtenteDashboard from "./components/UtenteDashboard/UtenteDashboard";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/details" element={<ProductDetails />} />
        <Route path="/product/upload" element={<ProductUpload />} />
        <Route path="/dashboardUtente" element={<UtenteDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
