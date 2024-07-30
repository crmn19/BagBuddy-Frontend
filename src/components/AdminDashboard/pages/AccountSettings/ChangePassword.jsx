import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { emphasize, styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});
const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage("Tutti i campi sono obbligatori.");
      setFeedbackMessage("");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Le nuove password non corrispondono.");
      setFeedbackMessage("");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/customers/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        setFeedbackMessage("Password cambiata con successo.");
        setErrorMessage("");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else if (response.status === 400) {
        setErrorMessage("Vecchia password errata o nuova password non valida.");
        setFeedbackMessage("");
      } else {
        setErrorMessage("Errore nel cambiare la password.");
        setFeedbackMessage("");
      }
    } catch (error) {
      setErrorMessage("Errore nel cambiare la password.");
      setFeedbackMessage("");
    }
  };

  return (
    <div className="main d-flex mt-5">
      <div className="mt-5">
        <Header />
      </div>
      <div className="mt-5">
        <Sidebar />
      </div>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Cambia Password</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="/dashboard"
              label="Dashboard"
              style={{ cursor: "pointer" }}
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              label="Cambia Password"
              style={{ cursor: "pointer" }}
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </div>

        <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
          <Typography variant="h4" align="center">
            Cambia Password
          </Typography>
          <Typography className="my-2 text-center">
            *Password deve essere compresa tra 5 e 15 caratteri
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Vecchia Password"
              type={isShowPassword ? "text" : "password"}
              fullWidth
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsShowPassword(!isShowPassword)}
                      edge="end"
                    >
                      {isShowPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Nuova Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Conferma Nuova Password"
              type="password"
              fullWidth
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <Button
              type="submit"
              className="bg-black text-white"
              fullWidth
              style={{ marginTop: 20 }}
            >
              Ripristina password
            </Button>
          </form>
          {feedbackMessage && (
            <Alert severity="success" style={{ marginTop: 20 }}>
              {feedbackMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" style={{ marginTop: 20 }}>
              {errorMessage}
            </Alert>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default PasswordChange;
