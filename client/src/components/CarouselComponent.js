// CarouselComponent.js

import { useState, useEffect } from "react";
import Slider from "react-slick"; // Asegúrate de tener slick-carousel instalado
import { getRandomMenuItems } from "../services/menuService"; // Ajusta la ruta según corresponda

const CarouselComponent = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const randomDishes = await getRandomMenuItems();
        setDishes(randomDishes);
      } catch (error) {
        console.error("Error fetching random dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        {dishes.map((dish) => (
          <div key={dish.id}>
            <h3>{dish.name}</h3>
            <img src={dish.photo} alt={dish.name} />
            <p>{dish.description}</p>
            <p>Price: ${dish.price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
