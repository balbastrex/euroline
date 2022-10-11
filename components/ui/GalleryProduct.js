import React from "react";

export const GalleryProduct = (
  selectedProduct,
  designSelected,
  productDetail,
  packDetail
) => {
  return (
    <div id="imagenes">
      <div className="etiqueta nuevo">Nuevo</div>
      <div className="galeria">
        <div className="fotos-producto">
          {/* Diseños */}
          {designSelected && selectedProduct.images ? (
            <>
              {/* Imagen de Diseño */}
              {designSelected.src && (
                <div key={designSelected.id} id={designSelected.id}>
                  <picture>
                    <source
                      srcSet={`https://erp.skydone.net${designSelected.src}`}
                      type="image/webp"
                    />
                    <img
                      src={`https://erp.skydone.net${designSelected.src}`}
                      alt={designSelected.alt}
                    />
                  </picture>
                </div>
              )}
              {/* Imagen de Productos de los diseños */}
              {selectedProduct.images.map((picture, i) => {
                return (
                  selectedProduct.images.sort(
                    (a, b) => a.position - b.position
                  ),
                  (
                    <div key={picture.id} id={`foto-${picture.id}-${i++}-${i}`}>
                      <picture>
                        <source
                          srcSet={`https://erp.skydone.net${picture.src}`}
                          type="image/webp"
                        />
                        <img
                          src={`https://erp.skydone.net${picture.src}`}
                          alt={picture.alt}
                        />
                      </picture>
                    </div>
                  )
                );
              })}
              {/* Imagen de tipografía del diseño */}
              {designSelected && designSelected.typography && (
                <div key={designSelected.typography.id} id="typography">
                  <picture>
                    <source
                      srcSet={`https://erp.skydone.net${designSelected.typography.src}`}
                      type="image/webp"
                    />
                    <img
                      src={`https://erp.skydone.net${designSelected.typography.src}`}
                      alt={designSelected.typography.alt}
                    />
                  </picture>
                </div>
              )}
            </>
          ) : /* Productos */
          productDetail && productDetail.images ? (
            <>
              {/* Imagen del producto */}
              {productDetail.images.map((picture, i) => {
                return (
                  productDetail.images.sort((a, b) => a.position - b.position),
                  (
                    <div key={picture.id} id={`foto-${picture.id}-${i++}-${i}`}>
                      <picture>
                        <source
                          srcSet={`https://erp.skydone.net${picture.src}`}
                          type="image/webp"
                        />
                        <img
                          src={`https://erp.skydone.net${picture.src}`}
                          alt={picture.alt}
                        />
                      </picture>
                    </div>
                  )
                );
              })}
            </>
          ) : /* Packs */
          packDetail ? (
            <>
              {/* Imagen del pack */}
              {packDetail.images &&
                packDetail.images &&
                packDetail.images.map((image, i) => (
                  <div key={image.src} id={`foto-${image.id}-${i}`}>
                    <picture>
                      <source
                        srcSet={`https://erp.skydone.net${image.src}`}
                        type="image/webp"
                      />
                      <img
                        src={`https://erp.skydone.net${image.src}`}
                        alt={image.alt}
                      />
                    </picture>
                  </div>
                ))}
              {/* Imagen de los productos del pack */}
              {packDetail.products &&
                packDetail.products.length >= 1 &&
                packDetail.products.map((packProduct, i) => (
                  <div
                    key={packProduct.id}
                    id={`foto-${packProduct.id}-${i++}-${i}`}
                  >
                    <picture>
                      <source
                        srcSet={`https://erp.skydone.net${packProduct.main_image.src}`}
                        type="image/webp"
                      />
                      <img
                        src={`https://erp.skydone.net${packProduct.main_image.src}`}
                        alt={packProduct.main_image.alt}
                      />
                    </picture>
                  </div>
                ))}
              {/* Imagen de los diseños del pack */}
              {packDetail.products &&
                packDetail.products.length >= 1 &&
                packDetail.products.map(
                  (packProduct) =>
                    packProduct.designs &&
                    packProduct.designs.length >= 1 &&
                    packProduct.designs.map((designImage, i) => (
                      <div
                        key={designImage.id}
                        id={`foto-${designImage.id}-${i++}-${i}-${i}`}
                      >
                        <picture>
                          <source
                            srcSet={`https://erp.skydone.net${designImage.src}`}
                            type="image/webp"
                          />
                          <img
                            src={`https://erp.skydone.net${designImage.src}`}
                            alt={designImage.alt}
                          />
                        </picture>
                      </div>
                    ))
                )}
            </>
          ) : null}
        </div>

        <div className="miniaturas-producto">
          {
            /* Diseños */
            designSelected && selectedProduct.images ? (
              <>
                {/* Imagen de Diseño */}
                {designSelected.src && (
                  <a key={designSelected.id} href={`#${designSelected.id}`}>
                    <picture>
                      <source
                        srcSet={`https://erp.skydone.net${designSelected.src}`}
                        type="image/webp"
                      />
                      <img
                        src={`https://erp.skydone.net${designSelected.src}`}
                        alt={designSelected.alt}
                      />
                    </picture>
                  </a>
                )}
                {/* Imagen de Productos de los diseños */}
                {selectedProduct.images.map((picture, i) => {
                  return (
                    selectedProduct.images.sort(
                      (a, b) => a.position - b.position
                    ),
                    (
                      <a
                        key={picture.id}
                        href={`#foto-${picture.id}-${i++}-${i}`}
                      >
                        <picture>
                          <source
                            srcSet={`https://erp.skydone.net${picture.src}`}
                            type="image/webp"
                          />
                          <img
                            src={`https://erp.skydone.net${picture.src}`}
                            alt={picture.alt}
                          />
                        </picture>
                      </a>
                    )
                  );
                })}
                {/* Imagen de tipografía del diseño */}
                {designSelected && designSelected.typography && (
                  <a key={designSelected.typography.id} href="#typography">
                    <picture>
                      <source
                        srcSet={`https://erp.skydone.net${designSelected.typography.src}`}
                        type="image/webp"
                      />
                      <img
                        src={`https://erp.skydone.net${designSelected.typography.src}`}
                        alt={designSelected.typography.alt}
                      />
                    </picture>
                  </a>
                )}
              </>
            ) : /* Productos */
            productDetail && productDetail.images ? (
              <>
                {/* Imagen del producto */}
                {productDetail.images.map((picture, i) => {
                  return (
                    productDetail.images.sort(
                      (a, b) => a.position - b.position
                    ),
                    (
                      <a
                        key={picture.id}
                        href={`#foto-${picture.id}-${i++}-${i}`}
                      >
                        <picture>
                          <source
                            srcSet={`https://erp.skydone.net${picture.src}`}
                            type="image/webp"
                          />
                          <img
                            src={`https://erp.skydone.net${picture.src}`}
                            alt={picture.alt}
                          />
                        </picture>
                      </a>
                    )
                  );
                })}
              </>
            ) : /* Packs */
            packDetail ? (
              <>
                {/* Imagen del pack */}
                {packDetail.images &&
                  packDetail.images.length &&
                  packDetail.images.map((image, i) => (
                    <a key={image.src} href={`#foto-${image.id}-${i}`}>
                      {/* {imageComponent(image.src, image.alt, "fixed", 60, 60)} */}
                      <picture>
                        <source
                          srcSet={`https://erp.skydone.net${image.src}`}
                          type="image/webp"
                        />
                        <img
                          src={`https://erp.skydone.net${image.src}`}
                          alt={image.alt}
                        />
                      </picture>
                    </a>
                  ))}
                {/* Imagen de los productos del pack */}
                {packDetail.products &&
                  packDetail.products.length >= 1 &&
                  packDetail.products.map((packProduct, i) => (
                    <a
                      key={packProduct.id}
                      href={`#foto-${packProduct.id}-${i++}-${i}`}
                    >
                      <picture>
                        <source
                          srcSet={`https://erp.skydone.net${packProduct.main_image.src}`}
                          type="image/webp"
                        />
                        <img
                          src={`https://erp.skydone.net${packProduct.main_image.src}`}
                          alt={packProduct.main_image.alt}
                        />
                      </picture>
                    </a>
                  ))}
                {/* Imagen de los diseños del pack */}
                {packDetail.products &&
                  packDetail.products.length >= 1 &&
                  packDetail.products.map(
                    (packProduct) =>
                      packProduct.designs &&
                      packProduct.designs.length >= 1 &&
                      packProduct.designs.map((designImage, i) => (
                        <a
                          key={designImage.id}
                          href={`#foto-${designImage.id}-${i++}-${i}-${i}`}
                        >
                          <picture>
                            <source
                              srcSet={`https://erp.skydone.net${designImage.src}`}
                              type="image/webp"
                            />
                            <img
                              src={`https://erp.skydone.net${designImage.src}`}
                              alt={designImage.alt}
                            />
                          </picture>
                        </a>
                      ))
                  )}
              </>
            ) : null
          }
        </div>
      </div>
    </div>
  );
};
