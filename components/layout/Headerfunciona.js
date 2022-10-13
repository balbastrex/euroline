import React, { useState, useEffect, useContext } from "react";
import MenuList from "components/menu/MenuList";
import { CategoriesContext } from "/context/categories/categoriesContext";
import { CartContext } from "context/cart/cartContext";
import { UserContext } from "context/user/userContext";
import Link from "next/link";
import { getTokenSession } from "components/auth/authHelpers";
import Cart from "components/cart/Cart";
import { getPublicCart, getCustomerCart } from "api/apiRoutes";
import SearchBar from "components/searchBar/SearchBar";

const Header = ({ hideMenu, setHideMenu }) => {
  const [hideClass, setHideClass] = useState(true);
  const categoriesContext = useContext(CategoriesContext);
  const { categories, categoriesSorted, getCategoriesSorted } =
    categoriesContext;
  const { tokenstored, setTokenStored } = useContext(UserContext);
  const cartContext = useContext(CartContext);
  const { cart, setCart, tokenCart } = cartContext;
  useEffect(() => {
    if (categoriesSorted.length === 0 && categories[0]) {
      getCategoriesSorted();
    }
  }, [categories, categoriesSorted.length, getCategoriesSorted]);

  useEffect(() => {
    const checkTokenSession = async () => {
      getTokenSession();
      if (!getTokenSession()) {
        setTokenStored(false);
        console.log("Not authorized");
        return;
      }
      setTokenStored(true);
    };

    checkTokenSession();
  }, [tokenstored]);

  //Cargamos carro.
  useEffect(() => {
    const getCart = async () => {
      /* Si hay tokenCart, cargamos carro público */
      if (tokenCart) {
        const publicCart = await getPublicCart(tokenCart);
        if (publicCart) {
          setCart(publicCart.cart);
        }
        return;
      }
      /* Si no, cargamos carro privado */
      if (tokenstored) {
        const customerCart = await getCustomerCart();
        if (customerCart) {
          setCart(customerCart.cart);
        }
        return;
      }
    };
    getCart();
  }, [setCart, tokenCart, tokenstored]);

  return (
    <header>
      <div id="top-header">
        <div className="container"></div>
      </div>
      <div id="header">
        <div className="container">
          <div className="burger icon" onClick={() => setHideMenu(!hideMenu)}>
            menu
          </div>
          {hideMenu ? (
            <MenuList hideMenu={hideMenu} setHideMenu={setHideMenu} />
          ) : null}
          <div className="logo">
            <Link href="/" passHref>
              <a>
                <picture>
                  <source src="/logo_convert_cars.jpg" type="image/webp" />
                  <img src="/logo_convert_cars.jpg" alt="convert-cars-logo" />
                </picture>
              </a>
            </Link>
          </div>
          <div className="botones">
            <Link href="#" passHref>
              <div>
                <a
                  className="buscador"
                  onClick={() => setHideClass(!hideClass)}
                >
                  <div className="icon">search</div>
                  <p>Buscar</p>
                </a>
                {hideClass ? null : <SearchBar />}
              </div>
            </Link>
            {tokenstored ? (
              <Link href="/profile">
                <a className="sesion">
                  <div className="icon">person</div>
                  <p>Mi Cuenta</p>
                </a>
              </Link>
            ) : (
              <Link href="/auth/register">
                <a className="sesion">
                  <div className="icon">person</div>
                  <p>Iniciar sesión</p>
                </a>
              </Link>
            )}
            <Link href="/cart">
              <a className="carrito">
                <div className="icon">
                  shopping_cart
                  {cart && cart.lines && cart.lines.length >= 1 ? (
                    <p className="contador">{cart.lines.length}</p>
                  ) : (
                    <p className="contador">0</p>
                  )}
                </div>
                <p>Carrito</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div id="aviso-header">
        <div className="container">
          <p className="teleprompter">
            Chanante ipsum dolor sit amet, tontiploster, freshquisimo ad
            atiendee zagal hueles avinagrado ju-já chotera et. Veniam tempor sed
            estoy fatal de lo mío agazapao. Horcate incididunt, veniam cosica
            exercitation droja bizcoché elit coconut ad dolore, traeros tol
            jamón interneeeer gañán.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
