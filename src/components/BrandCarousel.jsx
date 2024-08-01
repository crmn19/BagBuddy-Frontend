import { Image } from "react-bootstrap";
import "../style/Carousel.css";
import nikeLogo from "../assets/images/brand/Nike Swoosh.svg";
import adidasLogo from "../assets/images/brand/Adidas with Wordmark.svg";
import theNorthFaceLogo from "../assets/images/brand/The North Face.png";
import reeboktLogo from "../assets/images/brand/Reebok Horizontal.svg";
import eastPackLogo from "../assets/images/brand/EASTPAK.svg";
import newBalancenLogo from "../assets/images/brand/New Balance Grey.svg";
import vansLogo from "../assets/images/brand/Vans.svg";
import converseLogo from "../assets/images/brand/Converse.svg";

const BrandCarousel = () => {
  const skills = [
    { name: "Nike", logo: nikeLogo },
    { name: "Adidas", logo: adidasLogo },
    { name: "The North Face", logo: theNorthFaceLogo },
    { name: "reebok", logo: reeboktLogo },
    { name: "EastPack", logo: eastPackLogo },
    { name: "New Balance", logo: newBalancenLogo },
    { name: "Vans", logo: vansLogo },
    { name: "Converse", logo: converseLogo },
    { name: "Nike", logo: nikeLogo },
    { name: "Adidas", logo: adidasLogo },
    { name: "The North Face", logo: theNorthFaceLogo },
    { name: "reebok", logo: reeboktLogo },
    { name: "EastPack", logo: eastPackLogo },
    { name: "New Balance", logo: newBalancenLogo },
    { name: "Vans", logo: vansLogo },
    { name: "Converse", logo: converseLogo },
    { name: "Nike", logo: nikeLogo },
    { name: "Adidas", logo: adidasLogo },
    { name: "The North Face", logo: theNorthFaceLogo },
    { name: "reebok", logo: reeboktLogo },
    { name: "EastPack", logo: eastPackLogo },
    { name: "New Balance", logo: newBalancenLogo },
    { name: "Vans", logo: vansLogo },
    { name: "Converse", logo: converseLogo },
  ];

  return (
    <>
      <div id="skillPage">
        <div id="skills" className="carousel-container-skill element-to-watch">
          <div className="carousel-track-skill">
            {skills.map((skill, id) => (
              <div key={id} className="carousel-card-skill">
                <Image
                  src={skill.logo}
                  alt={skill.name}
                  width={80}
                  height={80}
                  className="mt-2"
                />
                <p className="mt-2 fw-bold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandCarousel;
