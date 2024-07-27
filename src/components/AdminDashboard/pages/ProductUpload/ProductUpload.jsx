import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

//breadcrumb code
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
  const [product, setProduct] = useState(null);
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
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching product details:", error);
        setError(error);
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
      .then(data => {
        if (image) {
          const formData = new FormData();
          formData.append("avatar", image);

          fetch(`http://localhost:3001/products/${id}/avatar`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          })
            .then(response => response.json())
            .then(() => {
              setSuccessMessage("Product updated successfully!");
              setErrorMessage("");
            })
            .catch(error => {
              console.error("Error uploading image:", error);
              setErrorMessage("Error uploading image.");
            });
        } else {
          setSuccessMessage("Product updated successfully!");
          setErrorMessage("");
        }
      })
      .catch(error => {
        console.error("Error updating product:", error);
        setErrorMessage("Error updating product.");
      });
  };

  const handleImageChange = event => {
    setImage(event.target.files[0]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product Upload</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb
              component="a"
              label="Products"
              href="#"
              deleteIcon={<ExpandMoreIcon />}
            />
            <StyledBreadcrumb
              label="Product Upload"
              deleteIcon={<ExpandMoreIcon />}
            />
          </Breadcrumbs>
        </div>

        <form className="form">
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <h5 className="mb-4">Modifica prodotto</h5>
                {/* Success and Error Messages */}
                {successMessage && (
                  <p style={{ color: "green" }}>{successMessage}</p>
                )}
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                <div className="form-group">
                  <h6>Nome</h6>
                  <input
                    type="text"
                    value={product.name || ""}
                    onChange={e =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <h6>Descrizione</h6>
                  <textarea
                    rows={5}
                    cols={10}
                    value={product.description || ""}
                    onChange={e =>
                      setProduct({ ...product, description: e.target.value })
                    }
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
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
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>BRAND</h6>
                      <input
                        type="text"
                        value={product.brand || ""}
                        placeholder={product.brand}
                        onChange={e =>
                          setProduct({ ...product, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>Prezzo</h6>
                      <input
                        type="number"
                        value={product.price || ""}
                        onChange={e =>
                          setProduct({
                            ...product,
                            regularPrice: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>Prezzo scontato</h6>
                      <input
                        type="number"
                        value={product.priceDiscount || ""}
                        onChange={e =>
                          setProduct({
                            ...product,
                            priceDiscount: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>In magazzino</h6>
                      <input
                        type="number"
                        value={product.inMagazzino || ""}
                        onChange={e =>
                          setProduct({ ...product, stock: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <h6>UPLOAD IMAGE</h6>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>

                <br />

                <Button
                  className="btn-blue btn-lg btn-big"
                  onClick={handleSave}
                >
                  ICONA &nbsp; PUBLISH AND VIEW
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductUpload;
