import { Container } from "react-bootstrap";
import BrandCarousel from "./BrandCarousel";
import Footer from "./Footer";
import Hero from "./Hero";
import MyNavbar from "./MyNavbar";
import { Divider } from "@mui/material";

const Home = () => {
  return (
    <main className="relative mx-auto">
      <MyNavbar />

      <section className="sm:pl-16 pl-8 sm:pr-16 pr-8 sm:pb-24 pb-12">
        <Hero />
      </section>

      <section className="border-2 border-x-0 sm:px-16 px-8 sm:py-24 py-12"></section>

      <section className="sm:px-16 px-8 py-8 flex justify-center">
        {/* <ShoeOffer /> */}
      </section>

      <section className=" border-2 border-x-0 border-bottom sm:px-16 px-8 sm:py-24 py-12">
        <Container>
          <Divider>
            <h2 className="pt-3 fw-bold">I NOSTRI BRAND</h2>
          </Divider>
        </Container>
        <BrandCarousel />
      </section>

      <section className="sm:px-16 px-8 sm:pt-24 pt-12 pb-8 mt-5">
        <Footer />
      </section>
    </main>
  );
};
export default Home;
