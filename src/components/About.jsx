import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import Footer from "./Footer";
import MyNavbar from "./MyNavbar";

const chiSiamoData = [
  {
    id: 1,
    titolo: "Il nostro impegno per l'eccellenza",
    paragrafo:
      "Da anni siamo specializzati nella produzione di zaini di alta qualità, progettati per soddisfare le esigenze di ogni avventura. Ogni nostro zaino è realizzato con materiali durevoli e design innovativo per garantire comfort e stile.",
    image:
      "https://images.unsplash.com/photo-1612257186416-418ec625fae3?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    textPosition: "left",
  },
  {
    id: 2,
    titolo: "Qualità e comfort in ogni dettaglio",
    paragrafo:
      "La nostra missione è offrire zaini che combinano qualità, comfort e funzionalità. Collaboriamo con i migliori designer per garantire prodotti che superano le aspettative e si adattano a ogni stile di vita.",
    image:
      "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    textPosition: "right",
  },
  {
    id: 3,
    titolo: "Innovazione e Sostenibilità",
    paragrafo:
      "Con oltre 10 anni di esperienza nel settore, ci impegniamo a innovare continuamente e a mantenere standard di sostenibilità elevati. Offriamo zaini progettati per durare e rispettare l'ambiente.",
    image:
      "https://images.unsplash.com/photo-1502486005555-5ed345168b71?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    textPosition: "left",
  },
];

const About = () => {
  return (
    <>
      <MyNavbar />
      <Container
        maxWidth="xxl"
        sx={{
          backgroundColor: "#FAF1DA",
          py: 0,
          px: 0,
        }}
      >
        <Grid container spacing={0}>
          {chiSiamoData.map(item => (
            <Grid item xs={12} key={item.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column", // stacked vertically on small screens
                    md: item.textPosition === "left" ? "row" : "row-reverse",
                  },
                  height: { xs: "auto", md: "70vh" }, // auto height on small screens
                  boxShadow: "none",
                  border: "none",
                  backgroundColor: "#FAF1DA",
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "left",
                    px: { xs: 2, md: 5 },
                  }}
                >
                  <Typography
                    variant="h3"
                    component="div"
                    gutterBottom
                    className="fw-bold"
                  >
                    {item.titolo}
                  </Typography>
                  <Typography className="fw-bold">{item.paragrafo}</Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    height: { xs: "auto", md: "100%" },
                    objectFit: "cover",
                  }}
                  image={item.image}
                  alt="Chi siamo"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default About;
