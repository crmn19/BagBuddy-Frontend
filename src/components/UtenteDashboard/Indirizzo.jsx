import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Select,
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import MyNavbar from "../MyNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMetodoSpedizione } from "../../redux/actions";

const Indirizzo = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Ottieni l'id dell'indirizzo dalla URL
  const metodoSpedizioneRedux = useSelector(
    state => state.shipping.metodoSpedizione
  );

  const [indirizzo, setIndirizzo] = useState({
    via: "",
    cap: "",
    provincia: "",
    comune: "",
    civico: "",
  });

  const [province, setProvince] = useState([]);
  const [comuni, setComuni] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedComune, setSelectedComune] = useState("");
  const [selectedComuneName, setSelectedComuneName] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddressDetails();
    fetchProvinces();
  }, [token]);

  const fetchAddressDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/indirizzi/find`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIndirizzo({
          via: data.via,
          cap: data.cap,
          provincia: data.provincia,
          comune: data.comune,
          civico: data.civico,
        });
        setSelectedProvince(data.provincia.id);
        setSelectedProvinceName(data.provincia.name);
        setSelectedComune(data.comune.codiceComune);
        setSelectedComuneName(data.comune.name);
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'indirizzo.");
      }
    } catch (error) {
      setError(error.message || "Errore nella richiesta.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/provincia", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProvince(data);
      } else {
        throw new Error("Failed to fetch provinces");
      }
    } catch (error) {
      setError("Errore nel caricamento delle province.");
      console.error("Errore nel caricamento delle province:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProvinceChange = async event => {
    const provinceId = event.target.value;
    const selectedProvince = province.find(prov => prov.id === provinceId);
    setSelectedProvince(provinceId);
    setSelectedProvinceName(selectedProvince.name);

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/provincia/${provinceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComuni(data);
      } else {
        throw new Error("Failed to fetch comuni");
      }
    } catch (error) {
      setError("Errore nel caricamento dei comuni.");
      console.error("Errore nel caricamento dei comuni:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComuneChange = event => {
    const comuneCode = event.target.value;
    const selectedComune = comuni.find(com => com.codiceComune === comuneCode);
    setSelectedComune(comuneCode);
    setSelectedComuneName(selectedComune.name);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setIndirizzo(prevIndirizzo => ({
      ...prevIndirizzo,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const payload = {
      via: indirizzo.via,
      civico: indirizzo.civico,
      cap: indirizzo.cap,
      provincia: selectedProvinceName,
      comune: selectedComuneName,
    };

    setLoading(true);
    try {
      const addressResponse = await fetch(
        `http://localhost:3001/indirizzi/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (addressResponse.ok) {
        navigate("/riepilogo-ordine");
      } else {
        throw new Error("Failed to submit address");
      }
    } catch (error) {
      setError(
        error.message || "Errore nella procedura di invio dell'indirizzo."
      );
      console.error("Errore nella procedura di invio dell'indirizzo", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMetodoSpedizioneChange = event => {
    const selectedMetodo = event.target.value;
    dispatch(setMetodoSpedizione(selectedMetodo));
  };

  return (
    <>
      <MyNavbar />
      <Container maxWidth="sm">
        <Typography variant="h5" gutterBottom>
          Modifica il tuo indirizzo
        </Typography>
        {error && (
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={() => setError("")}
          >
            <Alert onClose={() => setError("")} severity="error">
              {error}
            </Alert>
          </Snackbar>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Via"
                name="via"
                value={indirizzo.via}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="CAP"
                name="cap"
                value={indirizzo.cap}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="province-label">Seleziona Provincia</InputLabel>
                <Select
                  labelId="province-label"
                  id="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  required
                >
                  {province.map(provincia => (
                    <MenuItem key={provincia.id} value={provincia.id}>
                      {provincia.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="comune-label">Seleziona Comune</InputLabel>
                <Select
                  labelId="comune-label"
                  id="comune"
                  value={selectedComune}
                  onChange={handleComuneChange}
                  disabled={!selectedProvince}
                  required
                >
                  {comuni.map(comune => (
                    <MenuItem
                      key={comune.codiceComune}
                      value={comune.codiceComune}
                    >
                      {comune.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Numero Civico"
                name="civico"
                value={indirizzo.civico}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Opzioni di consegna
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="metodoSpedizione"
                  name="metodoSpedizione"
                  value={metodoSpedizioneRedux}
                  onChange={handleMetodoSpedizioneChange}
                >
                  <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label={
                      <Box>
                        <div className="d-flex">
                          <Typography className="fw-bold">
                            Consegna Standard
                          </Typography>
                          <Typography className="mx-5 text-dark-emphasis">
                            € 6,00
                          </Typography>
                          <Typography className="text-dark-emphasis">
                            3-5 giorni lavorativi*
                          </Typography>
                        </div>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="express"
                    control={<Radio />}
                    label={
                      <Box>
                        <div className="d-flex">
                          <Typography className="fw-bold">
                            Consegna Express
                          </Typography>
                          <Typography className="mx-5 text-dark-emphasis">
                            € 12,00
                          </Typography>
                          <Typography className="text-dark-emphasis">
                            2-4 giorni lavorativi*
                          </Typography>
                        </div>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                className="bg-black text-white"
                fullWidth
                disabled={loading}
              >
                {loading ? "Caricamento..." : "Salva e continua"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default Indirizzo;
