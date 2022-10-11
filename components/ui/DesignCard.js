import { Fragment } from "react";
import Link from "next/link";

export const DesignCard = (
  x,
  selectedProduct,
  designSelected,
  productDetail,
  packDetail
) => {
  let design;
  let designSel;

  if (selectedProduct) {
    design = designSelected;
  } else if (productDetail) {
    design = productDetail;
  } else if (packDetail) {
    design = packDetail;
  } else if (x) {
    design = x;
  }
  if (designSelected) {
    designSel = selectedProduct;
  }

  return (
    <Fragment>
      {x &&
      !packDetail &&
      !selectedProduct &&
      !designSelected &&
      !productDetail ? (
        <div className="producto">
          {/* Ficha de Productos y packs */}
          {design.canonical_uri ? (
            <>
              <Link
                href={{
                  pathname: "/shop/[productDetail]",
                  query: {
                    productDetail: design.canonical_uri.replace(/[/]/g, "_"),
                  },
                }}
                passHref
              >
                <a className="imagen">
                  <picture>
                    <source
                      src={
                        !design.main_image &&
                        !design.src &&
                        (!design.images || !design.images[0].src)
                          ? "/mi_pipo.jpg"
                          : design.main_image
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.main_image.src}`
                          : design.src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.src}`
                          : design.images[0].src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.images[0].src}`
                          : "/mi_pipo.jpg"
                      }
                      type="image/webp"
                    />
                    <img
                      src={
                        !design.main_image &&
                        !design.src &&
                        (!design.images || !design.images[0].src)
                          ? "/mi_pipo.jpg"
                          : design.main_image
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.main_image.src}`
                          : design.src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.src}`
                          : design.images[0].src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.images[0].src}`
                          : "/mi_pipo.jpg"
                      }
                      alt={
                        design.main_image && design.main_image.alt !== ""
                          ? design.main_image.alt
                          : `${design.name} image`
                      }
                    />
                  </picture>
                </a>
              </Link>
              <Link
                href={{
                  pathname: "/shop/[productDetail]",
                  query: {
                    productDetail: design.canonical_uri.replace(/[/]/g, "_"),
                  },
                }}
                passHref
              >
                <a className="nombre">
                  {design.products && design.products[0].name} {design.name}
                </a>
              </Link>
              <div className="precio">
                {design.variation && design.variation.price ? (
                  <p> {Number(design.variation.price).toFixed(2)} €</p>
                ) : (
                  <p> {Number(design.price).toFixed(2)} €</p>
                )}
                <span className="iva-exc">+ IVA</span>
              </div>
            </>
          ) : design.products ? (
            /*Ficha de Diseños */
            <>
              <Link
                href={{
                  pathname: "/shop/[productDetail]/[designDetail]",
                  query: {
                    productDetail: design.products[0].slug,
                    designDetail: design.slug,
                  },
                }}
                passHref
              >
                <a className="imagen">
                  <picture>
                    <source
                      src={
                        !design.main_image &&
                        !design.src &&
                        (!design.images || !design.images[0].src)
                          ? "/mi_pipo.jpg"
                          : design.main_image
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.main_image.src}`
                          : design.src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.src}`
                          : design.images[0].src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.images[0].src}`
                          : "/mi_pipo.jpg"
                      }
                      type="image/webp"
                    />
                    <img
                      src={
                        !design.main_image &&
                        !design.src &&
                        (!design.images || !design.images[0].src)
                          ? "/mi_pipo.jpg"
                          : design.main_image
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.main_image.src}`
                          : design.src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.src}`
                          : design.images[0].src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.images[0].src}`
                          : "/mi_pipo.jpg"
                      }
                      alt={
                        design.main_image && design.main_image.alt !== ""
                          ? design.main_image.alt
                          : `${design.name} image`
                      }
                    />
                  </picture>
                </a>
              </Link>
              <Link
                href={{
                  pathname: "/shop/[productDetail]/[designDetail]",
                  query: {
                    designDetail: design.slug,
                    productDetail: design.products[0].slug,
                  },
                }}
                passHref
              >
                <a className="nombre">
                  {design.products && design.products[0].name} {design.name}
                </a>
              </Link>
              <div className="precio">
                <p>{Number(design.products[0].variation.price).toFixed(2)} €</p>
                <span className="iva-exc">+ IVA</span>
              </div>
            </>
          ) : (
            /*Ficha de Designs */
            <>
              <Link
                href={{
                  pathname: "/shop/[productDetail]/[designDetail]",
                  query: {
                    productDetail: design.productSlug,
                    designDetail: design.slug,
                  },
                }}
                passHref
              >
                <a className="imagen">
                  <picture>
                    <source
                      src={
                        !design.main_image &&
                        !design.src &&
                        (!design.images || !design.images[0].src)
                          ? "/mi_pipo.jpg"
                          : design.main_image
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.main_image.src}`
                          : design.src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.src}`
                          : design.images[0].src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.images[0].src}`
                          : "/mi_pipo.jpg"
                      }
                      type="image/webp"
                    />
                    <img
                      src={
                        !design.main_image &&
                        !design.src &&
                        (!design.images || !design.images[0].src)
                          ? "/mi_pipo.jpg"
                          : design.main_image
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.main_image.src}`
                          : design.src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.src}`
                          : design.images[0].src
                          ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.images[0].src}`
                          : "/mi_pipo.jpg"
                      }
                      alt={
                        design.main_image && design.main_image.alt !== ""
                          ? design.main_image.alt
                          : `${design.name} image`
                      }
                    />
                  </picture>
                </a>
              </Link>
              <Link
                href={{
                  pathname: "/shop/[productDetail]/[designDetail]",
                  query: {
                    designDetail: design.slug,
                    productDetail: design.productSlug,
                  },
                }}
                passHref
              >
                <a className="nombre">
                  {design.productName} {design.name}
                </a>
              </Link>
              <div className="precio">
                <p>{Number(design.price).toFixed(2)} €</p>
                <span className="iva-exc">+ IVA</span>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          {design && design.productName ? (
            <h3>
              {design.productName} {design.name}
            </h3>
          ) : packDetail ? (
            <h3>{packDetail.name}</h3>
          ) : design && !design.productName && !designSel ? (
            <h3>
              {design.products && design.products[0].name} {design.name}
            </h3>
          ) : design && !design.productName && designSel ? (
            <h3>
              {designSel.name} {design.name}
            </h3>
          ) : designSel ? (
            <h3>
              {designSel.name} {design.name}
            </h3>
          ) : (
            <h3>{design.name}</h3>
          )}

          <picture>
            <source
              src={
                !design.main_image &&
                !design.src &&
                (!design.images || !design.images[0].src)
                  ? "/mi_pipo.jpg"
                  : design.main_image
                  ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.main_image.src}`
                  : design.src
                  ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.src}`
                  : design.images[0].src
                  ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.images[0].src}`
                  : "/mi_pipo.jpg"
              }
              type="image/webp"
            />
            <img
              src={
                !design.main_image &&
                !design.src &&
                (!design.images || !design.images[0].src)
                  ? "/mi_pipo.jpg"
                  : design.main_image
                  ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.main_image.src}`
                  : design.src
                  ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.src}`
                  : design.images[0].src
                  ? `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${design.images[0].src}`
                  : "/mi_pipo.jpg"
              }
              alt={
                design.main_image && design.main_image.alt !== ""
                  ? design.main_image.alt
                  : `${design.name} image`
              }
            />
          </picture>
        </div>
      )}
    </Fragment>
  );
};
