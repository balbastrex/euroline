import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "context/cart/cartContext";
import { UserContext } from "context/user/userContext";
import {
  deleteCartLine,
  deleteCustomerCartLine,
  getCustomerCart,
  getPublicCart,
} from "api/apiRoutes";
import Link from "next/link";
import { getTokenSession } from "components/auth/authHelpers";

const Cart = () => {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);
  const { cart, setCart, addCart, tokenCart, setTokenCart } = cartContext;
  const { tokensession } = userContext;
  const [updateLinespubliccart, setUpdateLinesPublicCart] = useState(false);
  const [updateLinescustomercart, setUpdateLinesCustomerCart] = useState(false);
  const [cartlines, setCartLines] = useState(false);
  useEffect(() => {
    const updateLines = async () => {
      if (updateLinespubliccart) {
        const deletePublicLine = await getPublicCart(tokenCart);
        setCart(deletePublicLine.cart);
        setUpdateLinesPublicCart(false);
        return;
      }
      if (updateLinescustomercart) {
        const deleteCustomerLine = await getCustomerCart();
        setCart(deleteCustomerLine.cart);
        setUpdateLinesCustomerCart(false);
        return;
      }
      if (cart && cart.lines && cart.lines.length >= 1) {
        setCartLines(true);
        return;
      }
      setCartLines(false);
    };
    updateLines();
  }, [updateLinespubliccart, updateLinescustomercart, cart]);

  console.log(cart);

  const handleCancelLine = async (lineId, tokenCart) => {
    if (tokenCart) {
      const publicresponse = await deleteCartLine(lineId.line_id, tokenCart);
      if (publicresponse && publicresponse.data.status === 200) {
        setUpdateLinesPublicCart(() => true);
        return;
      }
    }

    const privateResponse = await deleteCustomerCartLine(lineId.line_id);
    if (privateResponse && privateResponse.data.status === 200) {
      setUpdateLinesCustomerCart(() => true);
    }
  };

  return (
    <>
      <section>
        <div className="container cabecera carrito">
          <h2>Carrito de la compra</h2>
        </div>
      </section>
      <section>
        <div id="resumen-carrito" className="container">
          <div className="lep">
            <div id="login" className="login">
              <h6>
                <span className="icon">person</span> Mis datos
              </h6>
              <div id="inicio-registro" className="registrado">
                <p>
                  <b>Nombre: </b> Erik
                </p>
                <p>
                  <b>Apellidos: </b> Mol??s Carbruja
                </p>
                <p>
                  <b>E-mail: </b> EricmCarbruja@gustr.com
                </p>
                <p>
                  <b>Empresa: </b> Skydone, S.L.
                </p>
                <div className="direcciones">
                  <div className="mi-direccion">
                    <p className="nombre-dir">
                      <span className="icon">location_on</span>{" "}
                      <b>Direcci??n 1</b>
                    </p>
                    <p className="contacto">
                      <span className="icon">person</span> Erik Mol??s
                    </p>
                    <p className="tlf-contacto">
                      <span className="icon">phone</span>96 123 456
                    </p>
                    <p className="mail-contacto">
                      <span className="icon">email</span>{" "}
                      EricmCarbruja@gustr.com
                    </p>
                    <div className="datos-dir">
                      <p className="calle">
                        <b>Direcci??n:</b>C/ San Sebasti??n 2, bajo
                      </p>
                      <p className="cp">
                        <b>CP:</b> 46910
                      </p>
                      <p className="poblacion">
                        <b>Poblaci??n:</b> Alfafar
                      </p>
                      <p className="provincia">
                        <b>Provincia:</b>Valencia
                      </p>
                      <p className="pais">
                        <b>Pa??s:</b>Espa??a
                      </p>
                    </div>
                  </div>
                  <div className="select">
                    <select defaultValue="1">
                      <option value="">Selecciona tu direcci??n</option>
                      <option value="1">Direcci??n 1</option>
                      <option value="2">Direcci??n 2</option>
                      <option value="3">Direcci??n 3</option>
                    </select>
                    <span className="icon">keyboard_arrow_down</span>
                  </div>
                  <button>
                    <span className="icon">add_location</span> Agregar direcci??n
                  </button>
                </div>
              </div>
            </div>
            <div id="envio" className="envio">
              <h6>
                <span className="icon">local_shipping</span> M??todo de entrega
              </h6>
              <div className="metodos-envio">
                <div className="viaxpress">
                  <img src="./viaxpress_logo.jpg" />
                  <div className="precio">
                    <p>9,50 ???</p>
                    <span className="iva-exc">
                      <small>+ IVA</small>
                    </span>
                  </div>
                </div>
                <div className="correos">
                  <img src="./correos_logo.png/" />
                  <div className="precio">
                    <p>9,50 ???</p>
                    <span className="iva-exc">
                      <small>+ IVA</small>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div id="pago" className="pago">
              <h6>
                <span className="icon">euro</span> M??todo de pago
              </h6>
              <div className="metodos-pago">
                <div className="transferencia">
                  <img src="./transferencia.png" />
                  <p>Transferencia bancaria</p>
                </div>
                <div className="domiciliado">
                  <img src="./domiciliado.png" />
                  <p>Recibo domiciliado</p>
                </div>
                <div className="redsys">
                  <img src="./redsys.png" />
                  <p>Pago con tarjeta</p>
                </div>
              </div>
            </div>
          </div>
          <div className="resumen-productos ">
            {cartlines ? (
              <>
                <h6>
                  <span className="icon">shopping_cart</span> Resumen de
                  productos
                </h6>
                <div className="productos">
                  {cart &&
                    cart.lines.map((line) => {
                      return (
                        <div key={line.line_id} className="producto">
                          {/* Cuando est??n incluidas las im??genes en la respuesta de la l??nea del articulo del carro, descomentar y completar los "src" y dem??s */}
                          {/*  <Link
                          href={{
                            
                          }}
                        >*/}
                          <a className="imagen hover" href="#">
                            {/*  <picture>
                              <source
                                src={
                                  
                                }
                                type="image/webp"
                              /> */}
                            <img src="./producto-c.jpg" alt={"producto"} />
                            {/* </picture> */}
                          </a>
                          {/* </Link> */}
                          <div className="datos">
                            <div className="top">
                              <a className="nombre" href="#">
                                {line.name}
                              </a>
                              <button
                                className="delete icon"
                                onClick={() =>
                                  handleCancelLine(line, tokenCart)
                                }
                              >
                                delete
                              </button>
                            </div>
                            <div className="opciones">
                              {line.customizations &&
                              line.customizations.length > 0
                                ? line.customizations.map((customization) => {
                                    return (
                                      <p key={customization.id}>
                                        <b>{customization.label}:</b>
                                        {customization.content}
                                      </p>
                                    );
                                  })
                                : null}
                            </div>
                            <div className="cuerpo">
                              <div className="cant-precio">
                                <p className="cantidad">
                                  Cant: {line.quantity}
                                </p>
                                <div className="precio">
                                  {line.price && (
                                    <>
                                      <p>
                                        {Number.parseFloat(line.price)
                                          .toFixed(2)
                                          .replace(".", ",")}{" "}
                                        ???
                                      </p>
                                      <span className="iva-exc">
                                        <small>+ IVA</small>
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/*  <input
                          className={styles.inputcartline}
                          type="submit"
                          onClick={() => handleCancelLine(line, tokenCart)}
                          value="X"
                        /> */}
                        </div>
                      );
                    })}
                </div>
              </>
            ) : (
              <h6>
                <span className="icon">remove_shopping_cart</span> Tu Carrito
                est?? vac??o
              </h6>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
