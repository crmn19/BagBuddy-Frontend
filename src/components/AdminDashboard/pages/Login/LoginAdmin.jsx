import { useState } from "react";
import Logo from "../../../../assets/images/BAGBBUNNY.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Form } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

const LoginAdmin = () => {
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const focusInput = index => {
    setInputIndex(index);
  };

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

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        if (userRole === "ADMIN") {
          navigate("/dashboard");
        } else {
          setResponseMessage(
            "Non sei autorizzato ad accedere a questa pagina!"
          );
          setShowError(true);
        }
      } else {
        throw new Error("Email o password non validi.");
      }
    } catch (error) {
      setResponseMessage(error.message);
      setShowError(true);
    }
  };

  return (
    <>
      <img src={Logo} className="loginPatern" alt="Logo" />
      <section className="loginSection">
        <div className="loginBox">
          <div className="logo text-center">
            <img src={Logo} width="60px" alt="Logo" />
            <h5 className="font-weight-bold">Login to Bad Bunny</h5>
          </div>

          <div className="wrapper mt-3 card border">
            <Form
              className="shadow p-4 bg-white rounded"
              onSubmit={handleSubmit}
            >
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
              <div
                className={`form-group position-relative ${
                  inputIndex === 0 ? "focus" : ""
                }`}
              >
                <span className="icon">
                  <MdEmail />
                </span>
                <Form.Group className="mb-2" controlId="email">
                  <Form.Control
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onFocus={() => focusInput(0)}
                    onBlur={() => setInputIndex(null)}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </Form.Group>
              </div>

              <div
                className={`form-group position-relative ${
                  inputIndex === 1 ? "focus" : ""
                }`}
              >
                <span className="icon">
                  <RiLockPasswordFill />
                </span>
                <input
                  type={isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  onFocus={() => focusInput(1)}
                  onBlur={() => setInputIndex(null)}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <span
                  className="toggleShowPassword"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>

              <div className="form-group">
                <Button type="submit" className="btn-blue btn-lg w-100 btn-big">
                  Login
                </Button>
              </div>

              <div className="form-group text-center mb-0">
                <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                  <span className="line"></span>
                  <span className="txt">o</span>
                  <span className="line"></span>
                </div>
                <Link to="/forgot-password" className="link">
                  Password dimenticata?
                </Link>
              </div>
            </Form>
          </div>

          <div className="wrapper mt-3 card border footer p-3">
            <span className="text-center">
              Non hai un account?
              <br />
              <Link to="/signUp" className="link color ml-2">
                Contatta un amministratore della pagina
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginAdmin;
