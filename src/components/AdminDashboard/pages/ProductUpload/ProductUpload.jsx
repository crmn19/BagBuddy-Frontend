import React, { useState, useEffect, useCallback } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import Button from "@mui/material/Button";
import { useDropzone } from "react-dropzone";
import "../../../../style/ProductUpload.css";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

// Breadcrumb styling
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

const ProductUpload = () => {
  const [categoryVal, setCategoryVal] = useState("");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch(`http://localhost:3001/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setCategoryVal(data.category || "");
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching product details:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleChangeCategory = event => {
    setCategoryVal(event.target.value);
  };

  const handleSave = () => {
    const token = localStorage.getItem("authToken");

    fetch(`http://localhost:3001/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...product,
        category: categoryVal,
      }),
    })
      .then(response => response.json())
      .then(() => {
        if (image) {
          const formData = new FormData();
          formData.append("avatar", image);

          return fetch(`http://localhost:3001/products/${id}/avatar`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          })
            .then(response => response.json())
            .then(() => {
              setSuccessMessage("Prodotto modificato con successo!");
              setErrorMessage("");
              setTimeout(() => {
                navigate(`/productDetailsAdmin/${id}`);
              }, 1500);
            })
            .catch(error => {
              console.error("Errore nel caricamento dell'immagine:", error);
              setErrorMessage("Errore nel caricamento dell'immagine.");
            });
        }
      })
      .catch(error => {
        console.error("Error updating product:", error);
        setErrorMessage("Errore nella modifica del prodotto.");
      });
  };

  const onDrop = useCallback(acceptedFiles => {
    setImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>Error: {error}</p>;

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
          <h5 className="mb-0">Modifica Prodotto</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="/dashboard"
              label="Dashboard"
              style={{ cursor: "pointer" }}
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              component="a"
              href="/productAdmin"
              label="Lista Prodotti"
              style={{ cursor: "pointer" }}
              deleteIcon={<ExpandMoreIcon />}
            />
            <StyledBreadcrumb
              label="Modifica Prodotto"
              style={{ cursor: "pointer" }}
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </div>

        <Form>
          <Row>
            <Col className="col-sm-9">
              <Card className="p-4">
                <h3 className="mb-4 text-center">Modifica prodotto</h3>

                {/* Success and Error Messages */}
                {successMessage && (
                  <Alert
                    className="mb-2 alert-success"
                    variant="success"
                    onClose={() => setSuccessMessage("")}
                    dismissible
                  >
                    {successMessage}
                  </Alert>
                )}

                {errorMessage && (
                  <Alert
                    className="mb-2 alert-danger"
                    variant="danger"
                    onClose={() => setErrorMessage("")}
                    dismissible
                  >
                    {errorMessage}
                  </Alert>
                )}

                <Form.Group className="mb-2" controlId="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    value={product.name || ""}
                    onChange={e =>
                      setProduct({ ...product, name: e.target.value })
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
                </Form.Group>

                <Row className="row">
                  <Col className="col">
                    <Form.Group className="form-group">
                      <h6>Categoria</h6>
                      <Select
                        value={categoryVal}
                        onChange={handleChangeCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                        required
                      >
                        <MenuItem value={product.category}>
                          <em>Attuale: {product.category}</em>
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
                        value={product.brand || ""}
                        placeholder={product.brand}
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
                        value={product.price || ""}
                        onChange={e =>
                          setProduct({
                            ...product,
                            price: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group>
                      <h6>Prezzo scontato</h6>
                      <Form.Control
                        type="number"
                        value={product.priceDiscount || ""}
                        onChange={e =>
                          setProduct({
                            ...product,
                            priceDiscount: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group>
                      <h6>In magazzino</h6>
                      <Form.Control
                        type="number"
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

                  <Col>
                    <Form.Group>
                      <h6>UPLOAD IMAGE</h6>
                      <div
                        {...getRootProps({
                          className: `dropzone ${isDragActive ? "active" : ""}`,
                        })}
                      >
                        <input {...getInputProps()} />
                        <p>Trascina l'immagine qui o clicca per selezionare</p>
                      </div>
                      <div className="image-preview">
                        {image && (
                          <img src={URL.createObjectURL(image)} alt="Preview" />
                        )}
                        {!image && product.imageUrl && (
                          <div>
                            <span>Immagine Attuale</span>
                            <img src={product.imageUrl} alt={product.name} />
                          </div>
                        )}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <br />

                <Button
                  className="w-100 bg-black text-white"
                  onClick={handleSave}
                >
                  MODIFICA PRODOTTO
                </Button>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ProductUpload;
