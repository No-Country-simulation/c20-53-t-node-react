import { useEffect, useState } from "react";
import Slider from "react-slick";
import { getMenuItems } from "../services/menuService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/CustomerPage.module.css";

const CarouselComponent = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Función para obtener los platos desde el backend
    const fetchDishes = async () => {
      try {
        const fetchedDishes = await getMenuItems();
        setDishes(fetchedDishes);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []); // Solo se ejecuta una vez al montar el componente

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.carouselItem}>
      <h2> Featured Dishes </h2>
      <Slider {...settings}>
        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <div key={dish.id}>
              <img src={dish.photo} alt={dish.name} />
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <p>${dish.price}</p>
            </div>
          ))
        ) : (
          <p>Loading dishes...</p>
        )}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
