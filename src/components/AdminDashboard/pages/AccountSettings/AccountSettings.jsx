import { Alert, Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MdOutlineMail } from "react-icons/md";
import { PiGenderFemaleBold } from "react-icons/pi";
import { TbGenderMale } from "react-icons/tb";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";

// breadcrumb code
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
const AccountSettings = () => {
  const [profile, setProfile] = useState({
    nome: "",
    cognome: "",
    email: "",
    sesso: "",
    dataDiNascita: "",
  });
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch("http://localhost:3001/customers/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error("Errore nel caricamento dei dati del cliente");
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati del cliente", error);
      }
    };

    fetchCliente();
  }, [token]);

  const uploadProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/customers/${profile.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        }
      );

      if (response.ok) {
        setFeedbackMessage("Profilo modificato con successo.");
        setErrorMessage("");
        const updatedData = await response.json();
        setProfile(updatedData);
      } else {
        setErrorMessage("Errore nell'aggiornamento del profilo.");
        console.error("Errore nell'aggiornamento del profilo");
      }
    } catch (error) {
      setErrorMessage("Errore nell'aggiornamento del profilo.");
      console.error("Errore nell'aggiornamento del profilo", error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    uploadProfile();
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
          <h5 className="mb-0">Profilo</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="/dashboard"
              label="Dashboard"
              style={{ cursor: "pointer" }}
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              label="Profilo"
              style={{ cursor: "pointer" }}
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </div>
        <Container fluid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: 20, textAlign: "center" }}>
                {profile?.sesso == "UOMO" ? (
                  <Avatar
                    src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                    style={{ width: 100, height: 100, margin: "auto" }}
                  />
                ) : (
                  <Avatar
                    src="https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-stylish-hairstyle-glasses_1142-40217.jpg"
                    style={{ width: 100, height: 100, margin: "auto" }}
                  />
                )}

                <h2>
                  {profile.nome} {profile.cognome}
                </h2>
                <div className="d-flex align-content-center justify-content-center">
                  <span className="mx-2">
                    <MdOutlineMail />
                  </span>
                  <p>{profile.email}</p>
                </div>
                <div className="d-flex align-content-center justify-content-center ">
                  <span className="mx-2">
                    {profile.sesso === "DONNA" ? (
                      <PiGenderFemaleBold />
                    ) : (
                      <TbGenderMale />
                    )}
                  </span>
                  <p>{profile.sesso.toLowerCase()}</p>
                </div>
                <div className="d-flex align-content-center justify-content-center ">
                  <span className="mx-2">
                    <LiaBirthdayCakeSolid />
                  </span>
                  <p>{profile.dataDiNascita}</p>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} style={{ padding: 20 }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nome"
                        name="nome"
                        required
                        value={profile.nome}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Cognome"
                        name="cognome"
                        value={profile.cognome}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Genere"
                        name="sesso"
                        select
                        SelectProps={{ native: true }}
                        value={profile.sesso}
                        onChange={handleChange}
                        variant="outlined"
                      >
                        <option value="UOMO">Uomo</option>
                        <option value="DONNA">Donna</option>
                        <option value="ALTRO">Preferisco non dirlo</option>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Data di nascita"
                        name="dataDiNascita"
                        type="date"
                        value={profile.dataDiNascita}
                        onChange={handleChange}
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        className="bg-black text-white w-100"
                      >
                        Salva Modifiche
                      </Button>
                    </Grid>
                  </Grid>
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
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default AccountSettings;
