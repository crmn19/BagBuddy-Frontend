import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MdOutlineMail } from "react-icons/md";
import { PiGenderFemaleBold } from "react-icons/pi";
import { TbGenderMale } from "react-icons/tb";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

const AccountSettings = () => {
  const [profile, setProfile] = useState({
    nome: "",
    cognome: "",
    email: "",
    sesso: "",
    dataDiNascita: "",
  });

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
        const updatedData = await response.json();
        setProfile(updatedData);
      } else {
        console.error("Errore nell'aggiornamento del profilo");
      }
    } catch (error) {
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
        <Container>
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
                        type="email"
                        value={profile.email}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
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
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default AccountSettings;
