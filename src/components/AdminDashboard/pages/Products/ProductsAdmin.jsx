import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import { styled, emphasize } from "@mui/material/styles";
import { FaEye, FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Select,
  MenuItem,
  FormControl,
  PaginationItem,
  Checkbox,
} from "@mui/material";
import DashboardBox from "../Dashboard/components/DashboardBox";
import { Row, Col } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

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

const ProductsAdmin = ({
  search = "",
  sortBy = "price",
  category = "",
  size = 10,
}) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBy, setShowBy] = useState(size);
  const [catBy, setCatBy] = useState(category);
  const [sortOption, setSortOption] = useState(sortBy);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const url = new URL("http://localhost:3001/products");
    url.searchParams.append("page", currentPage - 1);
    url.searchParams.append("size", showBy);
    url.searchParams.append("sortBy", sortOption);
    if (search) url.searchParams.append("search", search);
    if (catBy) url.searchParams.append("category", catBy);

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.content || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, [currentPage, showBy, sortOption, search, catBy]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = event => {
    setCatBy(event.target.value);
  };

  const handleSortChange = event => {
    setSortOption(event.target.value);
  };

  const handleDelete = async id => {
    const confirmDelete = window.confirm(
      "Sei sicuro di voler eliminare questo prodotto?"
    );
    if (confirmDelete) {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Prodotto eliminato con successo!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Errore durante l'eliminazione del prodotto.");
      }
    }
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
            <h5 className="mb-0">Product List</h5>
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ml-auto breadcrumbs_"
            >
              <StyledBreadcrumb
                component="a"
                href="/dashboard"
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb
                label="Products"
                deleteIcon={<ExpandMoreIcon />}
              />
            </Breadcrumbs>
          </div>

          <div className="row dashboardBoxWrapperRow dashboardBoxWrapperRowV2">
            <div className="col-md-12">
              <div className="dashboardBoxWrapper d-flex">
                <DashboardBox
                  color={["#1da256", "#48d483"]}
                  icon={<FaUserCircle />}
                  grow={true}
                />
                <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<FaEye />} />
                <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<FaEye />} />
              </div>
            </div>
          </div>

          <div className="card shadow border-0 p-3 mt-4">
            <h3 className="hd">Best Selling Products</h3>

            <div className="row cardFilters mt-3">
              <div className="col-md-3">
                <h4>CATEGORY BY</h4>
                <FormControl size="small" className="w-100">
                  <Select
                    value={catBy}
                    onChange={handleCategoryChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    labelId="category-by-select-label"
                    className="w-100"
                  >
                    <MenuItem value="">
                      <em>Tutte le categorie</em>
                    </MenuItem>
                    <MenuItem value="TREKKING">Trekking</MenuItem>
                    <MenuItem value="VIAGGIO">Viaggio</MenuItem>
                    <MenuItem value="GIORNO">Giorno</MenuItem>
                    <MenuItem value="CAMPEGGIO">Campeggio</MenuItem>
                    <MenuItem value="SPORT">Sport</MenuItem>
                    <MenuItem value="LAPTOP">Laptop</MenuItem>
                    <MenuItem value="BAMBINO">Bambino</MenuItem>
                    <MenuItem value="IMPERMEABILI">Impermeabili</MenuItem>
                    <MenuItem value="ECO_SOSTENIBILI">Eco-sostenibili</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-3">
                <h4>SORT BY</h4>
                <FormControl size="small" className="w-100">
                  <Select
                    value={sortOption}
                    onChange={handleSortChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    labelId="sort-by-select-label"
                    className="w-100"
                  >
                    <MenuItem value="price">Ordina: Prezzo crescente</MenuItem>
                    <MenuItem value="createdAt">
                      Ordina: Data di aggiunta
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="table-responsive mt-3">
              <table className="table table-bordered table-striped v-align">
                <thead className="thead-dark">
                  <tr>
                    <th>UID</th>
                    <th style={{ width: "300px" }}>PRODUCT</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>CREATED AT</th>
                    <th>SALES</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <span>#{product.id}</span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center productBox">
                          <div className="imgWrapper">
                            <div className="img card shadow m-0">
                              <img
                                src={product.imageUrl}
                                className="w-100"
                                alt={product.name}
                              />
                            </div>
                          </div>
                          <div className="info pl-3 mx-3">
                            <h6>{product.name}</h6>
                            <p>{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <div style={{ width: "70px" }}>
                          <span>${product.price}</span>
                        </div>
                      </td>
                      <td>{product.inMagazzino}</td>
                      <td>{product.createdAt}</td>
                      <td>${product.discount}</td>
                      <td>
                        <div className="actions d-flex align-items-center">
                          <Link to={`/productDetailsAdmin/${product.id}`}>
                            <Button className="secondary" color="secondary">
                              <FaEye />
                            </Button>
                          </Link>
                          <Link to={`/productUploadAdmin/${product.id}`}>
                            <Button className="success" color="success">
                              <FaPencilAlt />
                            </Button>
                          </Link>
                          <Button
                            className="error"
                            color="error"
                            onClick={() => handleDelete(product.id)}
                          >
                            <MdDelete />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalPages > 1 && (
                <div className="d-flex tableFooter">
                  <Row className="my-5">
                    <Col>
                      <Pagination
                        page={currentPage}
                        className="d-flex justify-content-center"
                        count={totalPages}
                        onChange={handlePageChange}
                        renderItem={item => (
                          <PaginationItem
                            component={Link}
                            to={`/productAdmin?page=${item.page}`}
                            {...item}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsAdmin;
