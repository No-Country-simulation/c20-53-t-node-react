// components/DailySpecialsCarousel.jsx
import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

function DailySpecialsCarousel() {
  const [dailySpecials, setDailySpecials] = useState([]);

  useEffect(() => {
    // Obtener los platos del día desde el backend
    axios
      .get("/api/daily-specials")
      .then((response) => setDailySpecials(response.data))
      .catch((error) => console.error(error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {dailySpecials.map((special) => (
        <div key={special.id}>
          <h3>{special.name}</h3>
          <p>Precio: ${special.price}</p>
        </div>
      ))}
    </Slider>
  );
}

export default DailySpecialsCarousel;
