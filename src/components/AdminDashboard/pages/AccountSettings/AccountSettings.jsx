import { Avatar, Grid, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const AccountSettings = () => {
  const [profile, setProfile] = useState({
    nome: "",
    cognome: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    setProfile({
      nome: "Giovanni",
      cognome: "Rossi",
      email: "giovanni.rossi@example.com",
      phone: "123456789",
    });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Profile updated:", profile);
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
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper>
                <Avatar src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg" />
                <h2>
                  {profile.nome} {profile.cognome}
                </h2>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nome"
                        name="nome"
                        value={profile.nome}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
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
                        label="Email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Telefono"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Salva Modifiche
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default AccountSettings;
