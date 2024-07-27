import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/BAGBBUNNY.png";
import Button from "@mui/material/Button";
import { MdOutlineLightMode } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { IoShieldHalfSharp } from "react-icons/io5";
import Divider from "@mui/material/Divider";
import UserAvatarImgComponent from "../userAvatarImg/UserAvatarImgComponent";
import { Container } from "react-bootstrap";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpennotificationDrop, setisOpennotificationDrop] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openNotifications = Boolean(isOpennotificationDrop);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [admin, setAdmin] = useState(null);

  const handleOpenMyAccDrop = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleOpenotificationsDrop = () => {
    setisOpennotificationDrop(true);
  };

  const handleClosenotificationsDrop = () => {
    setisOpennotificationDrop(false);
  };
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch("http://localhost:3001/customers/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const adminData = await response.json();
        setAdmin(adminData);
      } catch (error) {
        console.error("Errore nel caricamento dei dati del cliente", error);
      }
    };

    fetchCliente();
  }, [token]);

  return (
    <>
      <header className="d-flex align-items-center">
        <Container fluid className=" w-100">
          <div className="row d-flex align-items-center justify-content-between w-100">
            {/* Logo Wraooer */}
            <div className="col-sm-2 part1">
              <Link to={"/"} className="d-flex align-items-center logo">
                <img src={logo} style={{ width: "15vh" }} alt="Logo" />
              </Link>
            </div>

            <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
              <div className="dropdownWrapper position-relative">
                <Button
                  className="rounded-circle mr-3"
                  onClick={handleOpenotificationsDrop}
                >
                  <FaRegBell />
                </Button>

                <Menu
                  anchorEl={isOpennotificationDrop}
                  className="notifications dropdown_list"
                  id="notifications"
                  open={openNotifications}
                  onClose={handleClosenotificationsDrop}
                  onClick={handleClosenotificationsDrop}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <div className="head pl-3 pb-0 mx-3">
                    <h4> Ordini (1) </h4>
                  </div>

                  <Divider className="mb-1" />

                  <div className="scroll">
                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <div className="d-flex">
                        <div>
                          <UserAvatarImgComponent
                            img={
                              "https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg"
                            }
                          />
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Giovanni Rossi </b>
                              ha acquistato
                              <b> Zaino Sport</b>
                            </span>
                          </h4>
                          <p className="text-sky mb-0">pochi secondi fa</p>
                        </div>
                      </div>
                    </MenuItem>
                  </div>
                </Menu>
              </div>

              <div className="myAccWrapper">
                <Button
                  className="myAcc d-flex align-items-center"
                  onClick={handleOpenMyAccDrop}
                >
                  <div className="userImg">
                    <span className="rounded-circle">
                      {admin?.sesso == "UOMO" ? (
                        <img src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg" />
                      ) : (
                        <img src="https://img.freepik.com/free-photo/portrait-beautiful-young-woman-with-stylish-hairstyle-glasses_1142-40217.jpg" />
                      )}
                    </span>
                  </div>

                  <div className="userInfo res-hide">
                    <h4>
                      {admin?.nome} {admin?.cognome}
                    </h4>
                    <p className="mb-0">ADMIN</p>
                  </div>
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMyAcc}
                  onClose={handleCloseMyAccDrop}
                  onClick={handleCloseMyAccDrop}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <ListItemIcon>
                      <IoShieldHalfSharp />
                    </ListItemIcon>
                    Reset Password
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
