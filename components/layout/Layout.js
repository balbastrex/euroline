import React, { useEffect, useState, useContext } from "react";
import { CategoriesContext } from "/context/categories/categoriesContext";
import { getAllCategories } from "/api/apiRoutes";
import Head from "next/head";
import Header from "./Header";
import TopMenu from "./TopMenu";
import Footer from "./Footer";
import Breadcrumbs from "components/ui/Breadcrumbs";

const Layout = ({ children, page, content, name }) => {
  const categoriesContext = useContext(CategoriesContext);
  const { setCategories } = categoriesContext;
  const [hideMenu, setHideMenu] = useState(false);

  useEffect(() => {
    const nuevoUpdate = async () => {
      const allCategories = await getAllCategories();
      await setCategories(allCategories);
    };
    nuevoUpdate();
  }, [setCategories]);

  return (
    <div>
      <Head>
        <title>Convert Cars - {page}</title>
        <link rel="shortcut icon" href="/convert_cars.png" />
        <meta name={name} content={content} />
        <meta
          name="keywords"
          content="Paragolpes, Faros Luz Diurna, Alerones, Pilotos"
        ></meta>
      </Head>

      <Header setHideMenu={setHideMenu} hideMenu={hideMenu} />
      <TopMenu />
      <Breadcrumbs />
      {children}
      {<Footer />}
    </div>
  );
};

export default Layout;
