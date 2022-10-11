import React, { useEffect } from "react";
import Layout from "components/layout/Layout";
import { getTopCategories, getTopDesigns, confirmCart } from "api/apiRoutes";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Image from "next/image";

function Home({ topCategories, topDesigns }) {
  const handleDragStart = (e) => e.preventDefault();
  const responsive = {
    0: {
      items: 1,
    },
    1024: {
      items: 3,
    },
  };

  return (
    <Layout page="Personaliza su pequeño mundo">
      <div className="container">
        <h1>mi pipo</h1>
      </div>
      {/*  <div>
          <h1 className={styles["top-title"]}>Top Categories</h1>
          <div className={styles.prodList}>
            <AliceCarousel
              autoPlay
              infinite
              autoPlayInterval={1000}
              mouseTracking
              responsive={responsive}
            >
              {topCategories.map((category) => (
                <div className={styles.product} key={category.id}>
                  <Image
                    priority="true"
                    src={
                      category.src
                        ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${category.src}`
                        : "/mi_pipo.jpg"
                    }
                    alt={
                      category.main_image
                        ? `${category.main_image.alt} image`
                        : category.name
                    }
                    width={300}
                    height={300}
                  />
                </div>
              ))}
            </AliceCarousel>
          </div>
        </div>
        <div> */}
      {/*  <h1 className={styles["top-title"]}>Top Designs</h1>
          <div className={styles.prodList}>
            <AliceCarousel
              autoPlay
              infinite
              autoPlayInterval={1000}
              mouseTracking
              responsive={responsive}
            >
              {topDesigns.map((category) => (
                <div className={styles.product} key={category.id}>
                  <Image
                    priority="true"
                    src={
                      category.design.src
                        ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${category.design.src}`
                        : "/mi_pipo.jpg"
                    }
                    alt={`${category.alt} imagen`}
                    width={300}
                    height={300}
                  />
                </div>
              ))}
            </AliceCarousel>
          </div> 
        </div>*/}
    </Layout>
  );
}

/* export async function getStaticProps() {
  const topCategories = await getTopCategories();
  const topDesigns = await getTopDesigns();

  return {
    props: {
      topCategories: topCategories || null,
      topDesigns: topDesigns || null,
    },
    revalidate: 10,
  };
} */

export default Home;
