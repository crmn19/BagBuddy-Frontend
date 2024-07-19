import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInUp from "./page/SignInUp";
import NotFound from "./components/NotFound";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <BrowserRouter>
          {/* <MyNavbar /> */}
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/signInUp" element={<SignInUp />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/dettagli/:" element={< />} /> */}
          </Routes>
          {/* <MyFooter /> */}
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
