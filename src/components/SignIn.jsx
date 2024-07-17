import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

let SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleChange = evt => {
    const { name, value } = evt.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("authToken", token);
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.sub;

        if (userRole === "1") {
          navigate("/cliente/dashboard");
        } else if (userRole === "2") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (error) {
      setResponseMessage(error.message);
      setShowError(true);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        {showError && <div className="error-message">{responseMessage}</div>}
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
