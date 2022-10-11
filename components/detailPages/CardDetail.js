import React, { useState, useContext } from "react";
import { GalleryProduct } from "components/ui/GalleryProduct";
import { CartContext } from "context/cart/cartContext";
import {
  InfoCardDetail,
  Description,
} from "components/detailPages/InfoCardDetail";

const CardDetail = ({
  productDetail,
  packDetail,
  selectedProduct,
  designSelected,
}) => {
  const cartContext = useContext(CartContext);
  const {
    cart,
    setCart,
    cartlinepayload,
    setCartLinePayload,
    initialCartLinePayload,
  } = cartContext;
  const [optionsId, setOptionsId] = useState([]);
  const [variation, setVariation] = useState({});
  const [total, setTotal] = useState(0);
  const [subTotalPer, setSubTotalPer] = useState(0);
  const [extraPrice, setExtraPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [personalization, setPersonalization] = useState({});
  const [quantity, setQuantity] = useState(1);

  let variationSelected;
  let product;
  let initialOptions = {};

  if (selectedProduct) {
    product = selectedProduct;
  } else if (productDetail) {
    product = productDetail;
  }

  function array_equal(arr1, arr2) {
    if ((Array.isArray(arr1) && Array.isArray(arr2)) === false) return false;

    return (
      JSON.stringify([...new Set(arr1.flat().sort())]) ===
      JSON.stringify([...new Set(arr2.flat().sort())])
    );
  }

  if (product) {
    for (let i = 0; i < product.variations.length; i++) {
      if (array_equal(product.variations[i].option_ids, optionsId)) {
        variationSelected = product.variations[i];
      }
    }
  }

  let actionNoStock;
  if (variation && variation.emptyStockAction) {
    actionNoStock = variation.emptyStockAction.action;
  }

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <section>
      <div id="ficha-producto" className="container">
        {GalleryProduct(
          selectedProduct,
          designSelected,
          productDetail,
          packDetail
        )}
        {InfoCardDetail(
          product,
          extraPrice,
          variation,
          packDetail,
          discount,
          setDiscount,
          designSelected,
          personalization,
          setSubTotalPer,
          subTotalPer,
          setPersonalization,
          setExtraPrice,
          initialOptions,
          optionsId,
          setOptionsId,
          setVariation,
          variationSelected,
          setTotal,
          quantity,
          setQuantity,
          cartlinepayload,
          setCartLinePayload,
          cart,
          setCart,
          initialCartLinePayload
        )}
        {Description(variation, packDetail)}
      </div>
    </section>
  );
};

export default CardDetail;
