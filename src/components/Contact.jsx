import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import FacebookIcon from "@mui/icons-material/Facebook";
import MyNavbar from "./MyNavbar";
import Footer from "./Footer";

const contactData = [
  {
    id: 1,
    title: "Telefono",
    description: "Chiamaci per parlare direttamente con un nostro operatore.",
    icon: <PhoneIcon sx={{ fontSize: 60 }} />,
  },
  {
    id: 2,
    title: "Email",
    description: "Invia un'email e ricevi assistenza dettagliata.",
    icon: <EmailIcon sx={{ fontSize: 60 }} />,
  },
  {
    id: 3,
    title: "Chiedi",
    description:
      "Hai domande? Visita le nostre FAQ per trovare le risposte alle domande più frequenti",
    icon: <QuestionMarkIcon sx={{ fontSize: 60 }} />,
    faq: [
      {
        question: "Qual è il vostro orario di apertura?",
        answer: "Siamo aperti dalle 9:00 alle 18:00 dal lunedì al venerdì.",
      },
      {
        question: "Come posso contattare il supporto?",
        answer: "Puoi contattarci via email o telefono.",
      },
      // Aggiungi altre FAQ se necessario
    ],
  },
  {
    id: 4,
    title: "Social Media",
    description: "Seguici sui nostri canali social per le ultime novità.",
    icon: <FacebookIcon sx={{ fontSize: 60 }} />,
  },
];

const Contact = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = id => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <>
      <MyNavbar />
      <Container maxWidth="lg" sx={{ my: 5, mb: 5 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className="my-5 fw-bold"
        >
          CONTATTACI
        </Typography>
        <Grid container spacing={4} className="my-5">
          {contactData.map(item => (
            <Grid item xs={12} md={6} lg={3} key={item.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  boxShadow: "none",
                  borderRadius: "10px",
                  position: "relative",
                  transition: "border-color 0.3s ease",
                  "&:hover .hoverBorder": {
                    backgroundColor: "#C9182E",
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "#C9182E",
                  },
                }}
                onClick={() => handleCardClick(item.id)}
              >
                <Box
                  className="hoverBorder"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    borderTop: "1px solid black",
                    borderRadius: "10px 10px 0 0",
                    transition: "background-color 0.3s ease",
                  }}
                />
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "#C9182E",
                      },
                    }}
                  >
                    <IconButton color="inherit">{item.icon}</IconButton>
                  </Box>
                  <Typography variant="h6" component="div" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" className="mb-5">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
