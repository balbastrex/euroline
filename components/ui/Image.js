import Image from "next/image";

export const imageComponent = (src, alt, layout, width, height) => {
  return (
    <Image
      priority={false}
      src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${src}`}
      alt={alt ? alt : src}
      layout={layout}
      width={width}
      height={height}
    />
  );
};
