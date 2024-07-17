import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInUp from "./page/SignInUp";
import NotFound from "./components/NotFound";

function App() {
  return (
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
  );
}

export default App;
