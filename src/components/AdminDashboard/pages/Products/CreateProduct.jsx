import { useCallback, useState } from "react";
import { Form, Button, Alert, Row, Col, Card } from "react-bootstrap";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDropzone } from "react-dropzone";
import { FormHelperText } from "@mui/material";

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

const CreateProduct = () => {
  const [categoryProduct, setCategoryProduct] = useState("");
  const [product, setProduct] = useState({
    nome: "",
    description: "",
    brand: "",
    price: "",
    inMagazzino: "",
  });
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const handleSave = () => {
    if (
      !product.nome ||
      !product.description ||
      !product.brand ||
      !categoryProduct
    ) {
      setErrorMessage("Tutti i campi devono essere compilati.");
      return;
    }
    const price = Number(product.price);
    const inMagazzino = Number(product.inMagazzino);
    if (isNaN(price) || isNaN(inMagazzino) || price <= 0 || inMagazzino < 0) {
      setErrorMessage(
        "Prezzo deve essere un numero positivo e quantità in magazzino non può essere negativa."
      );
      return;
    }

    const payload = {
      nome: product.nome,
      description: product.description,
      brand: product.brand,
      price: price,
      inMagazzino: inMagazzino,
      categoryProduct: categoryProduct,
    };

    fetch(`http://localhost:3001/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(`Errore ${response.status}: ${err.message}`);
          });
        }
        return response.json();
      })
      .then(data => {
        if (image) {
          const formData = new FormData();
          formData.append("avatar", image);

          fetch(`http://localhost:3001/products/${data.id}/avatar`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          })
            .then(response => response.json())
            .then(() => {
              setSuccessMessage("Prodotto aggiunto con successo!");
              setErrorMessage("");

              setTimeout(() => {
                navigate(`/productDetailsAdmin/${data.id}`);
              }, 2000);
            })
            .catch(error => {
              console.error("Errore nel caricamento dell'immagine:", error);
              setErrorMessage("Errore nel caricamento dell'immagine.");
            });
        } else {
          setSuccessMessage("Prodotto aggiunto con successo!");
          setErrorMessage("");

          setTimeout(() => {
            navigate(`/productDetailsAdmin/${data.id}`);
          }, 1500);
        }
      })
      .catch(error => {
        console.error("Error adding product:", error);
        setErrorMessage(`${error.message}`);
      });
  };

  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleChangeCategory = event => {
    setCategoryProduct(event.target.value);
  };

  return (
    <>
      <div className="main d-flex mt-5">
        <div className="mt-5">
          <Header />
        </div>
        <div className="mt-5">
          <Sidebar />
        </div>
        <div className="right-content w-100">
          <div className="card shadow border-0 w-100 flex-row p-4">
            <h5 className="mb-0">Crea un nuovo prodotto</h5>
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ml-auto breadcrumbs_"
            >
              <StyledBreadcrumb
                component="a"
                href="/dashboard"
                label="Dashboard"
                style={{ cursor: "pointer" }}
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb
                label="Crea prodotto"
                style={{ cursor: "pointer" }}
                deleteIcon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>
          </div>

          <Form>
            <Row>
              <Col className="col-sm-9">
                <Card className="p-4">
                  <h5 className="mb-4">Crea prodotto</h5>

                  <Form.Group className="mb-2" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.nome || ""}
                      onChange={e =>
                        setProduct({ ...product, nome: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="description">
                    <Form.Label>Descrizione</Form.Label>
                    <Form.Control
                      required
                      placeholder="Descrizione"
                      type="text"
                      value={product.description || ""}
                      onChange={e =>
                        setProduct({ ...product, description: e.target.value })
                      }
                    />

                    {errorMessage && (
                      <FormHelperText> {errorMessage}</FormHelperText>
                    )}
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group>
                        <h6>Categoria</h6>
                        <Select
                          value={categoryProduct}
                          onChange={handleChangeCategory}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          className="w-100"
                          required
                        >
                          <MenuItem value="">
                            <em>Nessuna</em>
                          </MenuItem>
                          <MenuItem value="TREKKING">Trekking</MenuItem>
                          <MenuItem value="VIAGGIO">Viaggio</MenuItem>
                          <MenuItem value="GIORNO">Giorno</MenuItem>
                          <MenuItem value="CAMPEGGIO">Campeggio</MenuItem>
                          <MenuItem value="SPORT">Sport</MenuItem>
                          <MenuItem value="LAPTOP">Laptop</MenuItem>
                          <MenuItem value="BAMBINO">Bambino</MenuItem>
                          <MenuItem value="IMPERMEABILI">Impermeabili</MenuItem>
                          <MenuItem value="ECO_SOSTENIBILI">
                            Eco-sostenibili
                          </MenuItem>
                        </Select>
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group>
                        <h6>BRAND</h6>
                        <Form.Control
                          type="text"
                          minLength={3}
                          maxLength={20}
                          required
                          value={product.brand || ""}
                          placeholder="Inserisci brand"
                          onChange={e =>
                            setProduct({ ...product, brand: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group>
                        <h6>Prezzo</h6>
                        <Form.Control
                          type="number"
                          required
                          value={product.price || ""}
                          onChange={e =>
                            setProduct({ ...product, price: e.target.value })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <h6>In magazzino</h6>
                        <Form.Control
                          type="number"
                          required
                          value={product.inMagazzino || ""}
                          onChange={e =>
                            setProduct({
                              ...product,
                              inMagazzino: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group>
                        <h6>UPLOAD IMAGE</h6>
                        <div
                          {...getRootProps({
                            className: `dropzone ${
                              isDragActive ? "active" : ""
                            }`,
                          })}
                        >
                          <input {...getInputProps()} />
                          <p>
                            Trascina l'immagine qui o clicca per selezionare
                          </p>
                        </div>
                        <div className="image-preview">
                          {image && (
                            <img
                              src={URL.createObjectURL(image)}
                              alt="Preview"
                            />
                          )}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <br />
                  {/* Success and Error Messages */}

                  {successMessage && (
                    <Alert
                      className="mb-2"
                      variant="success"
                      onClose={() => setSuccessMessage("")}
                      dismissible
                    >
                      {successMessage}
                    </Alert>
                  )}

                  {errorMessage && (
                    <Alert
                      className="mb-2"
                      variant="danger"
                      onClose={() => setErrorMessage("")}
                      dismissible
                    >
                      {errorMessage}
                    </Alert>
                  )}
                  <Button
                    className="w-100 bg-black text-white"
                    onClick={handleSave}
                  >
                    Crea Prodotto
                  </Button>
                </Card>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
