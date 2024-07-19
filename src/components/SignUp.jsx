import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const SignUp = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dataDiNascita, setDataDiNascita] = useState(null);
  const [sesso, setSesso] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case "nome":
        setNome(value);
        break;
      case "cognome":
        setCognome(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "sesso":
        setSesso(value);
        break;
      default:
        break;
    }
  };

  const handleDateChange = date => {
    setDataDiNascita(date);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidated(true);
    } else {
      try {
        const response = await fetch("http://localhost:3001/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            cognome,
            email,
            password,
            dataDiNascita,
            sesso,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setResponseMessage("Registration successful");
          setErrorMessages([]);
          navigate("/");
        } else {
          const errorData = await response.json();
          setErrorMessages(errorData.errors || [errorData.message]);
        }
      } catch (error) {
        setErrorMessages([...errorMessages, error.message]);
      }
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
        <h1>Crea il tuo account</h1>
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
        <span>oppure usa la tua email per la registrazione</span>
        <TextField
          variant="standard"
          type="text"
          name="nome"
          value={nome}
          onChange={handleChange}
          placeholder="Nome"
          required
          fullWidth
        />
        <TextField
          type="text"
          name="cognome"
          value={cognome}
          onChange={handleChange}
          placeholder="Cognome"
          required
          variant="standard"
          fullWidth
        />
        <TextField
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
          variant="standard"
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required
          variant="standard"
          className="mt-5"
          fullWidth
        />
        <DatePicker
          label="Data di nascita"
          fullWidth
          value={dataDiNascita}
          onChange={handleDateChange}
          renderInput={params => <TextField {...params} required />}
        />

        <InputLabel htmlFor="sesso-select">Genere</InputLabel>
        <Select
          id="sesso-select"
          value={sesso}
          onChange={handleChange}
          name="sesso"
          required
          variant="standard"
          fullWidth
        >
          <MenuItem value="UOMO">Uomo</MenuItem>
          <MenuItem value="DONNA">Donna</MenuItem>
          <MenuItem value="ALTRO">Preferisco non dirlo</MenuItem>
        </Select>

        {responseMessage && (
          <div className="success-message">{responseMessage}</div>
        )}
        {errorMessages.length > 0 && (
          <div className="error-message">
            {errorMessages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mt-2"
        >
          Registrati
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
