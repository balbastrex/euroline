import React, { useEffect, useState, useContext, Fragment } from "react";
import { Personalization } from "components/detailPages/Personalization";
import { Variations } from "components/detailPages/Variations";
import ReactHtmlParser from "react-html-parser";
import {
  getStoredAnonymousCartToken,
  getTokenSession,
  setAnonymousCartToken,
} from "components/auth/authHelpers";
import {
  getTokenCartNoAuth,
  addLinesToCart,
  addLinesToCustomerCart,
} from "api/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PackCustomization from "./packDetail/PackCustomization";

export const InfoCardDetail = (
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
) => {
  const [showpersonalization, setShowPersonalization] = useState(true);
  const [addlinecartactive, setAddLineCartActive] = useState(false);
  const [filterlinecartsotred, setFilterLineCartStored] = useState([]);
  const [showtoast, setShowToast] = useState(true);

  useEffect(() => {
    if (
      variation &&
      variation.discount > 0 &&
      variation.discount_type === "percentage"
    ) {
      setDiscount(
        ((Number(variation.price) * Number(variation.discount)) / 100).toFixed(
          2
        )
      );
    } else if (
      variation &&
      variation.discount > 0 &&
      variation.discount_type === "amount"
    ) {
      setDiscount(Number(variation.discount));
    } else if (variation && variation.discount === "0.0000") {
      setDiscount(Number(variation.discount));
    }
    if (Object.entries(personalization).length === 0 && !variation) {
      setShowPersonalization(false);
    }
  }, [setDiscount, variation, personalization]);

  //Comprobamos si tiene token de carrito sin estar logueado. Si no tiene, lo creamos y añadimos artículo
  useEffect(() => {
    if (addlinecartactive) {
      const updateLinesCart = async () => {
        const sessionToken = getTokenSession();
        if (!sessionToken) {
          const cartToken = await getStoredAnonymousCartToken();
          if (!cartToken) {
            const newCartToken = await getTokenCartNoAuth();
            await setAnonymousCartToken(newCartToken);
            setAddLineCartActive(true);
            return;
          }
          const publicCart = await addLinesToCart(cartlinepayload, cartToken);
          setCart(publicCart.data.data.cart);
          return;
        }
        const customerCart = await addLinesToCustomerCart(cartlinepayload);
        setCart(customerCart.data.data.cart);
      };

      updateLinesCart();
    }
    setAddLineCartActive(false);
  }, [addlinecartactive, cartlinepayload]);

  useEffect(() => {
    if (packDetail) {
      cartlinepayload.type = "pack";
      return;
    }
    cartlinepayload.type = "variation";
  }, []);

  const submitFormAddLineCart = async (e) => {
    e.preventDefault();
    await setCartLinePayload({
      ...cartlinepayload,
      design_id: designSelected && designSelected.id,
      design_customizations: filterlinecartsotred,
      id: variation ? variation.id : product ? product.variations[0].id : null,
      quantity: quantity,
      shop_option_ids: optionsId,
    });
    if (cartlinepayload.type === "pack") {
      setShowToast(true);
      toast.warn("👩‍💻 Pronto podrás añadir Packs a tu carrito", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast",
      });
      setTimeout(() => {
        setPersonalization({});
        e.target.reset();
        return;
      }, 1500);
    }
    if (cartlinepayload.type === "variation") {
      setShowToast(true);
      toast.success("🛒 ¡Añadido al carrito correctamente!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast",
      });
      setAddLineCartActive(true);
      setTimeout(() => {
        setPersonalization({});
        e.target.reset();
      }, 1500);
    }
  };

  const handlePlusQuantity = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };
  const handleRestQuantity = (e) => {
    e.preventDefault();
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <div id="datos">
      {product && designSelected ? (
        <>
          {showtoast && <ToastContainer />}
          <div className="titulo">
            <h5>{`${product.name} ${designSelected.name}`}</h5>
            <div className="referencia">
              <p>
                <small>Ref: {designSelected.ref}</small>
              </p>
            </div>
          </div>
          <div className="precio">
            {variation ? (
              <p>{Number(variation.price).toFixed(2)} €</p>
            ) : (
              <p>{Number(product.price).toFixed(2)} €</p>
            )}
            <span className="iva-exc">+ IVA</span>
          </div>
        </>
      ) : variation && !designSelected ? (
        <>
          {showtoast && <ToastContainer />}
          <div className="titulo">
            <h5>{`${variation.name} `}</h5>
            <div className="referencia">
              <p>{<small>Ref: {variation.ref}</small>}</p>
            </div>
          </div>
          <div className="precio">
            <p>{Number(variation.price).toFixed(2)} €</p>
            <span className="iva-exc">+ IVA</span>
          </div>
        </>
      ) : packDetail && !variation && !designSelected ? (
        <>
          {showtoast && <ToastContainer />}
          <div className="titulo">
            <h5>{`${packDetail.name} `}</h5>
            <div className="referencia">
              <p>{<small>Ref: {packDetail.ref}</small>}</p>
            </div>
          </div>
          <div className="precio">
            <p>{Number(packDetail.price).toFixed(2)} €</p>
            <span className="iva-exc">+ IVA</span>
          </div>
        </>
      ) : null}

      <div className="personalizacion">
        {showpersonalization ? null : <h6>PERSONALIZACIÓN</h6>}
        <form id="compra" onSubmit={(e) => submitFormAddLineCart(e)}>
          {Variations(
            product,
            variation,
            packDetail,
            discount,
            subTotalPer,
            setExtraPrice,
            initialOptions,
            optionsId,
            setOptionsId,
            setVariation,
            variationSelected,
            setTotal,
            cartlinepayload,
            setCartLinePayload,
            cartlinepayload,
            setCartLinePayload
          )}
          {designSelected
            ? Personalization(
                extraPrice,
                designSelected,
                personalization,
                setSubTotalPer,
                subTotalPer,
                setPersonalization,
                setExtraPrice,
                setFilterLineCartStored
              )
            : null}

          {/* Dependiendo del mensaje de stock si es 0, posibilidad de comprar o no */}
          {variation &&
          variation.stock === 0 &&
          variation.emptyStockAction.action === "Visible sin venta" ? (
            <div className="cantidades" disabled>
              <label>Cantidad</label>
              <div className="input-group plus-minus-input">
                <div className="input-group-button">
                  <button
                    disabled
                    type="button"
                    data-quantity="minus"
                    data-field="quantity"
                    className="disabled"
                    onClick={(e) => handleRestQuantity(e)}
                  >
                    -
                  </button>
                </div>
                <input
                  className="cantidad"
                  type="number"
                  name="quantity"
                  value={(quantity = 0)}
                  readOnly
                ></input>
                <div className="input-group-button">
                  <button
                    disabled
                    type="button"
                    data-quantity="plus"
                    data-field="quantity"
                    onClick={(e) => handlePlusQuantity(e)}
                  >
                    +
                  </button>
                </div>
              </div>
              <input disabled type="submit" value="Añadir al carrito" />
            </div>
          ) : (
            <div className="cantidades">
              <label>Cantidad</label>
              <div className="input-group plus-minus-input">
                <div className="input-group-button">
                  <button
                    type="button"
                    data-quantity="minus"
                    data-field="quantity"
                    className="disabled"
                    onClick={(e) => handleRestQuantity(e)}
                  >
                    -
                  </button>
                </div>
                <input
                  className="cantidad"
                  type="number"
                  name="quantity"
                  value={quantity}
                  readOnly
                ></input>
                <div className="input-group-button">
                  <button
                    type="button"
                    data-quantity="plus"
                    data-field="quantity"
                    onClick={(e) => handlePlusQuantity(e)}
                  >
                    +
                  </button>
                </div>
              </div>
              <input type="submit" value="Añadir al carrito" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export const Description = (variation, packDetail) => {
  let packProducts;
  let productDescription;
  const [infoclass, setInfoClass] = useState(false);
  const [descriptionHtml, setDescriptionHtml] = useState();
  const [productid, setProductId] = useState("");

  const handleClass = () => {
    setInfoClass(!infoclass);
  };

  const infoProduct = async (productId, e) => {
    e.preventDefault();
    setProductId(productId);

    const valueToggleOpen = e.currentTarget.classList.toggle("open");

    setInfoClass((infoClass) => !infoclass);

    if (valueToggleOpen === infoclass) {
      setInfoClass(true);
    }

    productDescription = packProducts.filter(
      (product) => product.id === productId
    );
    setDescriptionHtml(productDescription[0].variations[0].html);
  };

  if (packDetail) {
    packProducts = packDetail.products;
  }

  return (
    <>
      {variation ? (
        <>
          {variation.html ? (
            <div id="caracteristicas">
              <h6>Características</h6>
              <ul>
                <li>{variation.name}</li>
              </ul>
              <br />
              <h6>+ INFO</h6>
              <a
                className={
                  !infoclass ? "componente-pack" : "componente-pack open"
                }
                onClick={handleClass}
              >
                {variation.name}
              </a>
              <div className="descripcion-componente">
                {ReactHtmlParser(variation.html)}
              </div>
            </div>
          ) : null}
        </>
      ) : packDetail ? (
        <div id="caracteristicas">
          <h6>Características</h6>
          <ul>
            <li>{packDetail.name}</li>
          </ul>
          <br />
          <h6>+ INFO</h6>
          {packProducts.map((product) => (
            <Fragment key={product.id}>
              {product.id !== productid ? (
                product.variations &&
                (product.variations[0].html === "<br>\n" ||
                  product.variations[0].html === null) ? (
                  <p>{product.name}</p>
                ) : (
                  <a
                    key={product.id}
                    className={"componente-pack"}
                    onClick={(e) => infoProduct(product.id, e)}
                  >
                    {product.name}
                  </a>
                )
              ) : (
                <>
                  <a
                    key={product.id}
                    className={
                      !infoclass
                        ? "componente-pack"
                        : infoclass
                        ? "componente-pack open"
                        : null
                    }
                    onClick={(e) => infoProduct(product.id, e)}
                  >
                    {product.name}
                  </a>
                  {infoclass && (
                    <div className="descripcion-componente">
                      {ReactHtmlParser(descriptionHtml)}
                    </div>
                  )}
                </>
              )}
            </Fragment>
          ))}
        </div>
      ) : null}
    </>
  );
};
