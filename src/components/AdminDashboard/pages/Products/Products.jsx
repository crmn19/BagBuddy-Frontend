import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import { styled, emphasize } from "@mui/material/styles";
import { FaEye, FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Select, MenuItem, FormControl } from "@mui/material";
import DashboardBox from "../Dashboard/components/DashboardBox";

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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showBy, setShowBy] = useState("");
  const [showBysetCatBy, setCatBy] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products", {
          method: "GET",
          headers: { "Content-Type": "application/json" }, // Corretto
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4">
          <h5 className="mb-0">Product List</h5>
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
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
              <h4>SHOW BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBy}
                  onChange={e => setShowBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  labelId="show-by-select-label"
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-md-3">
              <h4>CATEGORY BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBysetCatBy}
                  onChange={e => setCatBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  labelId="category-by-select-label"
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
                  <th>RATING</th>
                  <th>ORDER</th>
                  <th>SALES</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <Checkbox /> <span>#{index + 1}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center productBox">
                        <div className="imgWrapper">
                          <div className="img card shadow m-0">
                            <img
                              src={product.image}
                              className="w-100"
                              alt={product.name}
                            />
                          </div>
                        </div>
                        <div className="info pl-3">
                          <h6>{product.name}</h6>
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <div style={{ width: "70px" }}>
                        <del className="old">${product.oldPrice}</del>
                        <span className="new text-danger">
                          ${product.newPrice}
                        </span>
                      </div>
                    </td>
                    <td>{product.stock}</td>
                    <td>
                      <Rating
                        name="read-only"
                        defaultValue={product.rating}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                    </td>
                    <td>{product.order}</td>
                    <td>${product.sales}</td>
                    <td>
                      <div className="actions d-flex align-items-center">
                        <Link to={`/product/details/${product.id}`}>
                          <Button className="secondary" color="secondary">
                            <FaEye />
                          </Button>
                        </Link>
                        <Button className="success" color="success">
                          <FaPencilAlt />
                        </Button>
                        <Button className="error" color="error">
                          <MdDelete />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex tableFooter">
              <p>
                Showing <b>{products.length}</b> of <b>60</b> results
              </p>
              <Pagination
                count={10}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
