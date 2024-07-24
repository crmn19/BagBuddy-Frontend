import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../style/Login.css";
import BackgroundImage from "../assets/images/ali-kazal-qPZ2KT9yPpU-unsplash.jpg";
import Logo from "../assets/images/BAGBBUNNY.png";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
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

        const decodedToken = jwtDecode(token).sub;
        console.log(decodedToken);
        const userRole = decodedToken;
        console.log(userRole);

        navigate("/");
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (error) {
      setResponseMessage(error.message);
      setShowError(true);
    }
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Login</div>

        {showError && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            {responseMessage}
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <Button className="w-100" variant="primary" type="submit">
          Log In
        </Button>

        <div className="d-grid justify-content-center">
          <Button className="text-muted px-0" variant="link">
            Password dimenticata?
          </Button>
        </div>
        <div className="d-grid text-center mt-2">
          Non sei già registrato?
          <Link to="/registration" className="text-muted px-0">
            Registrati
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
