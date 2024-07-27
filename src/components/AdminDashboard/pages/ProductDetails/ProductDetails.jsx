import React, { useEffect, useState } from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";

import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";

import { BsPatchCheckFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

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

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          throw new Error("Network response was not ok");
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

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <>
      <div className="main d-flex mt-5">
        <div className="mt-5">
          <Header />
        </div>
        <div className="mt-5">
          <Sidebar />
        </div>
        <div className="right-content ">
          <div className="card shadow border-0 w-100 flex-row p-4 res-col">
            <h5 className="mb-0">Prodotto</h5>

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
                component="a"
                href="/productAdmin"
              />
              <StyledBreadcrumb label="Product View" />
            </Breadcrumbs>
          </div>

          <div className="card productDetailsSEction">
            <div className="row">
              <div className="col-md-5">
                <div className="sliderWrapper pt-3 pb-3 pl-4 pr-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    width={"100%"}
                  />
                </div>
              </div>

              <div className="col-md-7">
                <div className=" pt-3 pb-3 pl-4 pr-4">
                  <h6 className="mb-4">Dettagli</h6>

                  <h4>{product.name}</h4>

                  <div className="productInfo mt-4">
                    <div className="row mb-2">
                      <div className="col-sm-3 d-flex align-items-center">
                        <span className="icon">
                          <MdBrandingWatermark />
                        </span>
                        <span className="name">Brand</span>
                      </div>

                      <div className="col-sm-9">
                        <span>{product.brand}</span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-3 d-flex align-items-center">
                        <span className="icon">
                          <BiSolidCategoryAlt />
                        </span>
                        <span className="name">Categoria</span>
                      </div>

                      <div className="col-sm-9">
                        <span>{product.category}</span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-3 d-flex align-items-center">
                        <span className="icon">
                          <FaShoppingCart />
                        </span>
                        <span className="name">In magazzino</span>
                      </div>

                      <div className="col-sm-9">
                        <span>({product.inMagazzino}) Pz</span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-3 d-flex align-items-center">
                        <span className="icon">
                          <BsPatchCheckFill />
                        </span>
                        <span className="name">Pubblicato il:</span>
                      </div>

                      <div className="col-sm-9">
                        <span>{product.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h6 className="mt-4 mb-3">Descrizione del prodotto</h6>
              <p>{product.description}</p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
