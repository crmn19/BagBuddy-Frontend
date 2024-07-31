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
  Divider,
} from "@mui/material";
import MyNavbar from "../MyNavbar";
import { useNavigate } from "react-router-dom";
import { Apartment, Home, LocationOn, PostAdd } from "@mui/icons-material";
import { BiBuilding } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setMetodoSpedizione } from "../../redux/actions";

const DatiOrdineCustomers = () => {
  const dispatch = useDispatch();
  const [ndirizzoId, setIndirizzoId] = useState("");
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
  const [addressDetails, setAddressDetails] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddressDetails();
    fetchProvinces();
  }, [token]);

  const fetchAddressDetails = async () => {
    const token = localStorage.getItem("authToken");
    const url = "http://localhost:3001/indirizzi/find";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAddressDetails(data);
        setIndirizzoId(data.id);
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'indirizzo.");
      }
    } catch (error) {
      throw new Error(error.message || "Errore nella richiesta.");
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
        "http://localhost:3001/indirizzi/create",
        {
          method: "POST",
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
        {addressDetails ? (
          <>
            <Typography variant="h5" gutterBottom className="mb-4">
              Il tuo indirizzo
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" alignItems="center">
                <Home />
                <Typography variant="body1" component="div" sx={{ ml: 1 }}>
                  <strong>Via:</strong> {addressDetails.via}
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <PostAdd />
                <Typography variant="body1" component="div" sx={{ ml: 1 }}>
                  <strong>CAP:</strong> {addressDetails.cap}
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <BiBuilding />
                <Typography variant="body1" component="div" sx={{ ml: 1 }}>
                  <strong>Provincia:</strong> {addressDetails.provincia?.name}
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <LocationOn />
                <Typography variant="body1" component="div" sx={{ ml: 1 }}>
                  <strong>Comune:</strong> {addressDetails.comune?.name}
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center">
                <Apartment />
                <Typography variant="body1" component="div" sx={{ ml: 1 }}>
                  <strong>Numero Civico:</strong> {addressDetails.civico}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} className="mt-4">
              <Divider />
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
            <Button
              className="bg-black text-white w-100"
              onClick={() => navigate("/riepilogo-ordine")}
            >
              Continua
            </Button>
            <Button
              className="bg-black text-white w-100 mt-3"
              onClick={() =>
                navigate(`/modifica-indirizzo/${addressDetails.id}`)
              }
            >
              Modifica indirizzo
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Inserisci il tuo indirizzo
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
                    <InputLabel id="province-label">
                      Seleziona Provincia
                    </InputLabel>
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
                    color="primary"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? "Caricamento..." : "Continua"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </Container>
    </>
  );
};

export default DatiOrdineCustomers;
