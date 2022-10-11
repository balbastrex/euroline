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
    const nuevoUpadate = async () => {
      const allCategories = await getAllCategories();
      await setCategories(allCategories);
    };
    nuevoUpadate();
  }, [setCategories]);

  return (
    <div>
      <Head>
        <title>mi pipo - {page}</title>
        <link rel="shortcut icon" href="/mi_pipo.ico" />
        <meta name={name} content={content} />
        <meta
          name="keywords"
          content="bebes, chupetes, personalizados, nombre, grabado, pipo, niño, niña"
        ></meta>
      </Head>

      <Header setHideMenu={setHideMenu} hideMenu={hideMenu} />
      <TopMenu setHideMenu={setHideMenu} hideMenu={hideMenu} />
      <Breadcrumbs />
      {children}
      {<Footer />}
    </div>
  );
};

export default Layout;
