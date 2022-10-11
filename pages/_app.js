// normalize es Hoja de estilo para resetar y que sean consistentes en diferentes navegadores
import { useState, useEffect } from "react";
import Head from "next/head";
import CategoriesProvider from "context/categories/categoriesContext";
import DesignsProvider from "context/designs/designsContext";
import UserProvider from "context/user/userContext";
import CartProvider from "context/cart/cartContext";
import {
  initAxiosInterceptors,
  getTokenSession,
} from "components/auth/authHelpers";

import "styles/normalize.css";
import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const checkTokenSession = async () => {
      getTokenSession();
      if (!getTokenSession()) {
        console.log("Not authorized");
        return;
      }
    };
    checkTokenSession();
  }, []);

  initAxiosInterceptors();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <UserProvider>
        <CategoriesProvider>
          <DesignsProvider>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </DesignsProvider>
        </CategoriesProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
