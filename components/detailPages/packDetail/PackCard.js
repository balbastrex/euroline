import React, { useState, Fragment } from "react";
import PackCustomization from "./PackCustomization";
import PackDesigns from "./PackDesigns";
import PackVariation from "./PackVariation";

const PackCard = ({ packDetail }) => {
  let packProducts = [];
  const [designsrc, setDesignsrc] = useState("");
  const [radiodesign, setRadioDesign] = useState([]);
  const [imgdesign, setImgDesign] = useState({});
  const [productspackselected, setProductsPackSelected] = useState({});
  const [packoptionselect, setPackOptionSelect] = useState([]);
  const [showinfo, setShowInfo] = useState(false);
  const [descriptionHtml, setDescriptionHtml] = useState();
  const [productid, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleChange = async (e) => {
    setPackOptionSelect({
      ...packoptionselect,
      [e.target.name]: e.target.value,
    });
  };

  if (packDetail) {
    packProducts = packDetail.products;
  }

  //NOTE: filtramos los elementos que hemos seleccionado previamente al último seleccionado para mantener la imágen del diseño y no cambie al seleccionar otro nuevamente
  const keepImgDesign = radiodesign.filter(
    (element) =>
      element.design.shop_design_group_id !== imgdesign.shop_design_group_id
  );

  let otherDesignSelected;
  for (let i = 0; i < keepImgDesign.length; i++) {
    otherDesignSelected = keepImgDesign[i];
  }

  ///

  let productDescription;
  /*   let descriptionHtml; */

  const infoProduct = async (productId) => {
    setProductId(productId);
    setShowInfo(true);
    productDescription = packProducts.filter(
      (product) => product.id === productId
    );
    setDescriptionHtml(productDescription[0].variations[0].html);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      {packProducts.map((packProduct) => (
        <Fragment key={packProduct.id}>
          <PackDesigns packProduct={packProduct} />
          <PackVariation
            packProduct={packProduct}
            handleChange={handleChange}
            packoptionselect={packoptionselect}
            setPackOptionSelect={setPackOptionSelect}
          />
        </Fragment>
      ))}
      {/* Lo sacamos del "map" para que no aparezcan repetidas las personalizaciones  */}
      <PackCustomization
        packDetail={packDetail}
        packProducts={packProducts}
        designsrc={designsrc}
      />
    </>
  );
};

export default PackCard;
