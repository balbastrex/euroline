import React, { useEffect, useContext, useState } from "react";
import { CategoriesContext } from "/context/categories/categoriesContext";

const TopMenu = () => {
  const categoriesContext = useContext(CategoriesContext);
  const { categories, categoriesSorted, getCategoriesSorted } =
    categoriesContext;

  useEffect(() => {
    if (categoriesSorted.length === 0 && categories[0]) {
      getCategoriesSorted();
    }
  }, [categories, categoriesSorted.length, getCategoriesSorted]);

  return (
    <>
      <section id="top-menu">
        <div className="container">
          <a href="#" className="hover">
            <picture>
              <source src="/ico-chupete.png" type="image/webp" />
              <img src="/ico-chupete.png" alt="chupete" />
            </picture>
            <p>CHUPETES</p>
          </a>
          <a href="#" className="hover">
            <picture>
              <source src="/ico-textil.png" type="image/webp" />
              <img src="/ico-textil.png" alt="chupete" />
            </picture>
            <p>TEXTIL</p>
          </a>
          <a href="#" className="hover">
            <picture>
              <source src="/ico-cole.png" type="image/webp" />
              <img src="/ico-cole.png" alt="chupete" />
            </picture>
            <p>COLE</p>
          </a>
          <a href="#" className="hover">
            <picture>
              <source src="/ico-cajitas.png" type="image/webp" />
              <img src="/ico-cajitas.png" alt="cajitas" />
            </picture>
            <p>CAJITAS</p>
          </a>
          <a href="#" className="hover">
            <picture>
              <source src="/ico-jugar.png" type="image/webp" />
              <img src="/ico-jugar.png" alt="jugar" />
            </picture>
            <p>A JUGAR</p>
          </a>
          <a href="#" className="hover">
            <picture>
              <source src="/ico-paseo.png" type="image/webp" />
              <img src="/ico-paseo.png" alt="paseo" />
            </picture>
            <p>PASEO</p>
          </a>
          <a href="#" className="hover">
            <picture>
              <source src="/ico-alimentacion.png" type="image/webp" />
              <img src="/ico-alimentacion.png" alt="alimentacion" />
            </picture>
            <p>ALIMENTACIÓN</p>
          </a>
        </div>
        <hr />
      </section>
    </>
  );
};

export default TopMenu;
