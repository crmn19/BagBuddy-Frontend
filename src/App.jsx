import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// Import dei componenti
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Dashboard from "./components/AdminDashboard/pages/Dashboard/Dashboard";
import ProductDetails from "./components/AdminDashboard/pages/ProductDetails/ProductDetails";
import ProductUpload from "./components/AdminDashboard/pages/ProductUpload/ProductUpload";
import Login from "./components/Login";
import Registration from "./components/Registration";
import UtenteDashboard from "./components/UtenteDashboard/UtenteDashboard";
import ProductDetailsCustomer from "./components/ProductDetailsCustomer";
import AllProducts from "./components/AllProducts";
import DatiOrdineCustomers from "./components/UtenteDashboard/DatiOrdineCustomers";
import SuccessPayment from "./components/SuccessPayment";
import UnsuccessPayment from "./components/UnsuccessPayment";
import Paypal from "./components/Paypal";
import ProductsAdmin from "./components/AdminDashboard/pages/Products/ProductsAdmin";
import CreateProduct from "./components/AdminDashboard/pages/Products/CreateProduct";
import LoginAdmin from "./components/AdminDashboard/pages/Login/LoginAdmin";
import AccountSettings from "./components/AdminDashboard/pages/AccountSettings/AccountSettings";
import RiepilogoOrdine from "./components/UtenteDashboard/RiepilogoOrdine";
import MultiStepForm from "./components/StepFormConfirmOrder/MultiStepForm";
import ChangePassword from "./components/AdminDashboard/pages/AccountSettings/ChangePassword";
import ModificaIndirizzo from "./components/UtenteDashboard/Indirizzo";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";

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
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<AllProducts />} />

        <Route path="/product/:id" element={<ProductDetailsCustomer />} />
        <Route path="/dashboardUtente" element={<UtenteDashboard />} />
        <Route path="/order" element={<DatiOrdineCustomers />} />
        <Route path="/order/:id" element={<DatiOrdineCustomers />} />
        <Route path="pay/success" element={<SuccessPayment />} />
        <Route path="/pay/cancel" element={<UnsuccessPayment />} />
        <Route path="/paypal" element={<Paypal />} />
        <Route path="/riepilogo-ordine" element={<RiepilogoOrdine />} />
        <Route path="/form" element={<MultiStepForm />} />
        <Route path="/myAccount" element={<AccountSettings />} />
        <Route path="/modificaPassword" element={<ChangePassword />} />
        <Route path="/modifica-indirizzo/:id" element={<ModificaIndirizzo />} />
        {/* ADMIN */}
        <Route path="/products/list" element={<ProductsAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productUploadAdmin/:id" element={<ProductUpload />} />
        <Route path="/productDetailsAdmin/:id" element={<ProductDetails />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
