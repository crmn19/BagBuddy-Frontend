import Hero from "./Hero";
import MyNavbar from "./MyNavbar";

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

      <section className=" border-2 border-x-0 sm:px-16 px-8 sm:py-24 py-12"></section>

      <section className="sm:px-16 px-8 sm:pt-24 pt-12 pb-8">
        {/* <Footer /> */}
      </section>
    </main>
  );
};
export default Home;
