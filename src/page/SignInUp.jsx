import { useState } from "react";
import "../style/SignInUp.css";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

let SignInUp = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="SignInUp">
      <div className={containerClass} id="container">
        <SignUp />
        <SignIn />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bentornato!</h1>
              <p>Effettua il login</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Benvenuto!</h1>
              <p>Registrati per accedere alla piattaforma</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Registrati
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignInUp;
