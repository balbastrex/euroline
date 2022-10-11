import React, { useContext, useEffect, Fragment } from "react";
import { CategoriesContext } from "context/categories/categoriesContext";
import { DesignsContext } from "context/designs/designsContext";
import { DesignCard } from "components/ui/DesignCard";

function DesignsGroup({
  selectedCategory,
  prodByCategory,
  principalCat,
  productsByTag,
  packByCategory,
}) {
  const categoriesContext = useContext(CategoriesContext);
  const { loadSpinner } = categoriesContext;
  const designsContext = useContext(DesignsContext);
  const {
    allDesigns,
    stopGetDesigns,
    productByCategory,
    setStopGetDesigns,
    getDesigns,
  } = designsContext;

  let prodName;
  //  NOTE: El precio que aparece en cada Card lo cogemos de la variación (product.variation.price)
  if (productByCategory && productByCategory.length) {
    productByCategory.map((product) => {
      prodName = product.name;
      allDesigns.map((design) => {
        if (product.shop_design_group_id === design.shop_design_group_id) {
          design.price = product.variation.price;
        }
      });
    });
  }

  useEffect(() => {
    if (!stopGetDesigns) {
      getDesigns(prodByCategory);
    }
    setStopGetDesigns(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory.id, productByCategory]);

  return (
    <>
      {!loadSpinner ? (
        <section>
          <div id="listado-productos" className="container">
            {/* NOTE: No tocar, evita renderizar productos de categorias con subcategorias */}
            {principalCat[0] &&
            principalCat[0].subCategory.length === 0 &&
            productByCategory &&
            !productsByTag ? (
              <>
                {allDesigns.map((design) => {
                  return (
                    <Fragment key={design.id}>{DesignCard(design)}</Fragment>
                  );
                })}
              </>
            ) : productsByTag || packByCategory ? (
              <>
                {productsByTag &&
                  productsByTag.map((prodTag) => {
                    if (!prodTag.products) return;
                    return (
                      <Fragment key={prodTag.id}>
                        {DesignCard(prodTag)}
                      </Fragment>
                    );
                  })}
                {packByCategory &&
                  packByCategory.map((packCat) => {
                    return (
                      <Fragment key={packCat.id}>
                        {DesignCard(packCat)}
                      </Fragment>
                    );
                  })}
              </>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}

export default DesignsGroup;
