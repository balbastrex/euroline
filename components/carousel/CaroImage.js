import React from "react";
import Image from "next/image";
const handleDragStart = (e) => e.preventDefault();

const CaroImage = (params) => {
  console.log(params.src);
  return (
    <picture onDragStart={handleDragStart} role="presentation">
      <img
        src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}` + params.src}
        type="image/webp"
        alt=""
      />
    </picture>
  );
};

export default CaroImage;

//NOTE: En caso de ser necesario usar el componente <Image>
/*
<Image
      onDragStart={handleDragStart}
      src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}` + params.src}
      alt=""
      width={500}
      height={500}
    />
*/
