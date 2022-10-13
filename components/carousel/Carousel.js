import React, { useEffect, useState } from "react";
import { getTopCategories } from "/api/apiRoutes";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import CaroImage from "./CaroImage";

const handleDragStart = (e) => e.preventDefault();

const Carousel = () => {
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    const getTop = async () => {
      const topCategoriesResponse = await getTopCategories();
      setTopCategories(topCategoriesResponse);
      console.log(topCategories);
    };
    getTop();
  }, []);
  return (
    <AliceCarousel
      infinite
      autoPlay={false}
      autoPlayInterval={2500}
      mouseTracking
    >
      {topCategories.map((item, key) => (
        <CaroImage src={item.src} key={key} />
      ))}
    </AliceCarousel>
  );
};

export default Carousel;
