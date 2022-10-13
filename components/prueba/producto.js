import React, { Fragment } from "react";
import { DesignCard } from "components/ui/DesignCard";

const allDesigns = [
  {
    id: 1,
    name: "Paragolpes Delantero BMW E87/ E81/E82/E88 Look M 05-11 Antinieblas",
    canonical_uri:
      "bmw/e87-e81/paragolpes/paragolpes-delantero-bmw-e87-e81-e82-e88-look-m-05-11-antinieblas",
    description:
      "Paragolpes Delantero BMW E87 / E81 / E88 /81 3 Y 5 PUERTAS look M 2005 a 2011.",
    shop_design_group_id: null,
    slug: "paragolpes-delantero-bmw-e87-e81-e82-e88-look-m-05-11-antinieblas",
    variation: {
      id: 2,
      name: "Paragolpes Delantero BMW E87/ E81/E82/E88 Look M 05-11 Antinieblas",
      description:
        "Paragolpes Delantero BMW E87 / E81 / E88 /81 3 Y 5 PUERTAS look M 2005 a 2011.",
      discount: "0.0000",
      discount_type: "percentage",
      price: "327.8500",
      pvpr: null,
      ref: "PARAG.1653035419",
      ref_cat: "PARAG.1653035419",
      stock: 12,
      tax: {
        IVA: "21.00",
        RE: "5.20",
      },
      emptyStockAction: {
        action: "Invisible",
        message: "Stock 0",
      },
    },
    main_image: {
      alt: "",
      description: null,
      figcaption: null,
      id: 5,
      position: 1,
      shop_product_id: 7,
      src: "/images/shop/catalog/products/paragolpes_delantero_bmw_e87_e81e82e88_look_m_05_11.jpg",
      title: null,
    },
  },
  {
    id: 2,
    name: "Paragolpes Delantero Audi Q3 2020+ Look RSQ3",
    canonical_uri: "audi/q3/paragolpes-delantero-audi-q3-2020-look-rsq3",
    description: "Paragolpes delantero para Audi Q3 2020+, Look RSQ3.",
    shop_design_group_id: null,
    slug: "paragolpes-delantero-audi-q3-2020-look-rsq3",
    variation: {
      id: 3,
      name: "Paragolpes Delantero Audi Q3 2020+ Look RSQ3",
      description: "Paragolpes delantero para Audi Q3 2020+, Look RSQ3.",
      discount: "0.0000",
      discount_type: "percentage",
      price: "733.9100",
      pvpr: "960",
      ref: "salable_65asasaf3eref7i86",
      ref_cat: "sa65asasaf3eref7i865",
      stock: 4,
      tax: {
        IVA: "21.00",
        RE: "5.20",
      },
      emptyStockAction: {
        action: "Invisible",
        message: "Stock 0",
      },
    },
    main_image: {
      alt: "",
      description: null,
      figcaption: null,
      id: 6,
      position: 1,
      shop_product_id: 8,
      src: "/images/shop/catalog/products/paragolpes_delantero_audi_q3_2020_look_rsq3_1.jpg",
      title: null,
    },
  },
  {
    id: 3,
    name: "Parrilla Audi Q3 Look RSQ3",
    canonical_uri: "audi/q3/parrilla-audi-q3-look-rsq3",
    description: "Parrilla delantera Audi Q3 Look RSQ3",
    shop_design_group_id: null,
    slug: "parrilla-audi-q3-look-rsq3",
    variation: {
      id: 4,
      name: "Parrilla Audi Q3 Look RSQ3",
      description: "Parrilla delantera Audi Q3 Look RSQ3",
      discount: "0.0000",
      discount_type: "percentage",
      price: "252.0100",
      pvpr: "339",
      ref: "salable_1653927542",
      ref_cat: "salable_1653927542",
      stock: 9,
      tax: {
        IVA: "21.00",
        RE: "5.20",
      },
      emptyStockAction: {
        action: "Invisible",
        message: "Stock 0",
      },
    },
    main_image: {
      alt: "",
      description: null,
      figcaption: null,
      id: 9,
      position: 1,
      shop_product_id: 9,
      src: "/images/shop/catalog/products/parrilla_audi_q3_look_rsq3_1.jpg",
      title: null,
    },
  },
  {
    id: 4,
    name: "Pilotos Traseros Audi Q7 2006-2015 Led/Red",
    canonical_uri: "audi/q7/pilotos-traseros-audi-q7-2006-2015-led-red",
    description: "Juego de faros traseros para el Audi Q7 2006-2015",
    shop_design_group_id: null,
    slug: "pilotos-traseros-audi-q7-2006-2015-led-red",
    variation: {
      id: 5,
      name: "Pilotos Traseros Audi Q7 2006-2015 Led/Red",
      description: "Juego de faros traseros para el Audi Q7 2006-2015",
      discount: "0.0000",
      discount_type: "percentage",
      price: "244.1100",
      pvpr: "329",
      ref: "salable_1653928199",
      ref_cat: "salable_1653928199",
      stock: 5,
      tax: {
        IVA: "21.00",
        RE: "5.20",
      },
      emptyStockAction: {
        action: "Invisible",
        message: "Stock 0",
      },
    },
    main_image: {
      alt: "",
      description: null,
      figcaption: null,
      id: 12,
      position: 1,
      shop_product_id: 10,
      src: "/images/shop/catalog/products/pilotos_traseros_audi_q7_led_red_1.jpg",
      title: null,
    },
  },
  {
    id: 5,
    name: "Capó Carbono BMW E81 / E82 / E87 / E88 M3 GTR 4 Tomas",
    canonical_uri:
      "bmw/e87-e81/capos/capo-carbono-bmw-e81-e82-e87-e88-m3-gtr-4-tomas",
    description: "Capó carbono BMW E81 / E82 / E87 / E88 M3 GTR 4 TOMAS",
    shop_design_group_id: null,
    slug: "capo-carbono-bmw-e81-e82-e87-e88-m3-gtr-4-tomas",
    variation: {
      id: 6,
      name: "Capó Carbono BMW E81 / E82 / E87 / E88 M3 GTR 4 Tomas",
      description: "Capó carbono BMW E81 / E82 / E87 / E88 M3 GTR 4 TOMAS",
      discount: "0.0000",
      discount_type: "percentage",
      price: "654.9100",
      pvpr: "849",
      ref: "salable_1653929119",
      ref_cat: "salable_1653929119",
      stock: 3,
      tax: {
        IVA: "21.00",
        RE: "5.20",
      },
      emptyStockAction: {
        action: "Invisible",
        message: "Stock 0",
      },
    },
    main_image: {
      alt: "",
      description: null,
      figcaption: null,
      id: 16,
      position: 1,
      shop_product_id: 11,
      src: "/images/shop/catalog/products/capo_carbono_bmw_e87_e81_e82_m3_gtr_4_tomas_1.jpg",
      title: null,
    },
  },
  {
    id: 7,
    name: "Paragolpes Delantero BMW E87/ E81/E82/E88 Look M 05-11 Antinieblas",
    canonical_uri:
      "bmw/e87-e81/paragolpes/paragolpes-delantero-bmw-e87-e81-e82-e88-look-m-05-11-antinieblas",
    description:
      "Paragolpes Delantero BMW E87 / E81 / E88 /81 3 Y 5 PUERTAS look M 2005 a 2011.",
    shop_design_group_id: null,
    slug: "paragolpes-delantero-bmw-e87-e81-e82-e88-look-m-05-11-antinieblas",
    variation: {
      id: 2,
      name: "Paragolpes Delantero BMW E87/ E81/E82/E88 Look M 05-11 Antinieblas",
      description:
        "Paragolpes Delantero BMW E87 / E81 / E88 /81 3 Y 5 PUERTAS look M 2005 a 2011.",
      discount: "0.0000",
      discount_type: "percentage",
      price: "327.8500",
      pvpr: null,
      ref: "PARAG.1653035419",
      ref_cat: "PARAG.1653035419",
      stock: 12,
      tax: {
        IVA: "21.00",
        RE: "5.20",
      },
      emptyStockAction: {
        action: "Invisible",
        message: "Stock 0",
      },
    },
    main_image: {
      alt: "",
      description: null,
      figcaption: null,
      id: 5,
      position: 1,
      shop_product_id: 7,
      src: "/images/shop/catalog/products/paragolpes_delantero_bmw_e87_e81e82e88_look_m_05_11.jpg",
      title: null,
    },
  },
  {
    id: 8,
    name: "Paragolpes Delantero Audi Q3 2020+ Look RSQ3",
    canonical_uri: "audi/q3/paragolpes-delantero-audi-q3-2020-look-rsq3",
    description: "Paragolpes delantero para Audi Q3 2020+, Look RSQ3.",
    shop_design_group_id: null,
    slug: "paragolpes-delantero-audi-q3-2020-look-rsq3",
    variation: {
      id: 3,
      name: "Paragolpes Delantero Audi Q3 2020+ Look RSQ3",
      description: "Paragolpes delantero para Audi Q3 2020+, Look RSQ3.",
      discount: "0.0000",
      discount_type: "percentage",
      price: "733.9100",
      pvpr: "960",
      ref: "salable_65asasaf3eref7i86",
      ref_cat: "sa65asasaf3eref7i865",
      stock: 4,
      tax: {
        IVA: "21.00",
        RE: "5.20",
      },
      emptyStockAction: {
        action: "Invisible",
        message: "Stock 0",
      },
    },
    main_image: {
      alt: "",
      description: null,
      figcaption: null,
      id: 6,
      position: 1,
      shop_product_id: 8,
      src: "/images/shop/catalog/products/paragolpes_delantero_audi_q3_2020_look_rsq3_1.jpg",
      title: null,
    },
  },
  {
    id: 9,
    name: "Parrilla Audi Q3 Look RSQ3",
    canonical_uri: "audi/q3/parrilla-audi-q3-look-rsq3",
    description: "Parrilla delantera Audi Q3 Look RSQ3",
    shop_design_group_id: null,
    slug: "parrilla-audi-q3-look-rsq3",
    variation: {
      id: 4,
      name: "Parrilla Audi Q3 Look RSQ3",
      description: "Parrilla delantera Audi Q3 Look RSQ3",
      discount: "0.0000",
      discount_type: "percentage",
      price: "252.0100",
      pvpr: "339",
      ref: "salable_1653927542",
      ref_cat: "salable_1653927542",
      stock: 9,
      tax: {
        IVA: "21.00",
        RE: "5.20",
      },
      emptyStockAction: {
        action: "Invisible",
        message: "Stock 0",
      },
    },
    main_image: {
      alt: "",
      description: null,
      figcaption: null,
      id: 9,
      position: 1,
      shop_product_id: 9,
      src: "/images/shop/catalog/products/parrilla_audi_q3_look_rsq3_1.jpg",
      title: null,
    },
  },
];

function Producto() {
  return (
    <section>
      <div id="listado-productos" className="container">
        {allDesigns.map((design) => {
          return <Fragment key={design.id}>{DesignCard(design)}</Fragment>;
        })}
      </div>
    </section>
  );
}

export default Producto;
