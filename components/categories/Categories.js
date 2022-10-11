import React, { useState, useContext, useEffect, Fragment } from "react";
import { CategoriesContext } from "context/categories/categoriesContext";
import Spinner from "components/ui/Spinner";
import ReactHtmlParser from "react-html-parser";
/* import Image from "next/image"; */
import Link from "next/link";
import { useRouter } from "next/router";

function Categories({ selectedCategory, setPrincipalCat, principalCat }) {
  const [categorySelected, setCategorySelected] = useState([]);
  const categoriesContext = useContext(CategoriesContext);
  const { categoriesSorted, loadSpinner, setLoadSpinner } = categoriesContext;
  const router = useRouter();
  const querySlug = router.query.slug;

  useEffect(() => {
    const getCategory = async (categoriesSorted) => {
      if (categorySelected) {
        setPrincipalCat(categorySelected);
      }
      return categoriesSorted.map((category) => {
        if (category.id === selectedCategory.id) {
          setLoadSpinner(false);
          if (!categorySelected.includes(category)) {
            setCategorySelected([category]);
          }
        } else if (category.subCategory.length) {
          getCategory(category.subCategory);
        }
      });
    };
    getCategory(categoriesSorted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriesSorted, categorySelected, selectedCategory.id]);

  const handleSpinnerLoad = (elementSelected) => {
    if (elementSelected === categorySelected[0]) {
      setLoadSpinner(false);
      return elementSelected;
    } else if (elementSelected !== categorySelected[0]) {
      setLoadSpinner(true);
    }
  };

  let loopCount = 0;
  const categoriesGroup = (categorySelected) => {
    return categorySelected.map((selectedCategory) => {
      loopCount++;
      return (
        <Fragment key={selectedCategory.id}>
          {selectedCategory.slug === querySlug ? null : (
            <div className="subcategoria" key={selectedCategory.id}>
              <Link
                href={{
                  pathname: "/categories/[slug]",
                  query: {
                    slug: selectedCategory.slug,
                  },
                }}
              >
                <a>
                  <picture>
                    <source
                      src={
                        selectedCategory.main_image === null
                          ? "/mi_pipo.jpg"
                          : `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${selectedCategory.main_image.src}`
                      }
                      type="image/webp"
                    />
                    <img
                      src={
                        selectedCategory.main_image === null
                          ? "/mi_pipo.jpg"
                          : `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${selectedCategory.main_image.src}`
                      }
                      alt={
                        selectedCategory.main_image &&
                        selectedCategory.main_image.alt !== ""
                          ? selectedCategory.main_image.alt
                          : `${selectedCategory.name} image`
                      }
                    />
                  </picture>
                </a>
              </Link>
              <>
                <Link
                  href={{
                    pathname: "/categories/[slug]",
                    query: {
                      slug: selectedCategory.slug,
                    },
                  }}
                >
                  <a
                    className="nombre"
                    onClick={() => handleSpinnerLoad(selectedCategory)}
                  >
                    {selectedCategory.name}
                  </a>
                </Link>
              </>
            </div>
          )}
          {selectedCategory.subCategory.length && loopCount === 1
            ? categoriesGroup(selectedCategory.subCategory)
            : null}
        </Fragment>
      );
    });
  };

  return (
    <>
      {!loadSpinner ? (
        <>
          <section>
            <div className="container cabecera categoria bkg">
              {principalCat[0] && (
                <>
                  <picture>
                    <source
                      src={
                        selectedCategory.main_image === null
                          ? "/mi_pipo.jpg"
                          : `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${selectedCategory.main_image.src}`
                      }
                      type="image/webp"
                    />
                    <img
                      src={
                        principalCat[0].main_image === null ||
                        principalCat[0].main_image === undefined
                          ? "/mi_pipo.jpg"
                          : `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}${principalCat[0].main_image.src}`
                      }
                      alt={
                        principalCat[0].main_image &&
                        principalCat[0].main_image.alt !== ""
                          ? principalCat[0].main_image.alt
                          : `${principalCat[0].name} image`
                      }
                    />
                  </picture>
                  <div className="cartel">
                    <h5>{principalCat[0].name}</h5>
                    <span>{ReactHtmlParser(principalCat[0].html)}</span>
                  </div>
                </>
              )}
            </div>
          </section>
          <section>
            <div id="listado-subcategorias" className="container">
              {categoriesGroup(categorySelected)}
            </div>
          </section>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Categories;
