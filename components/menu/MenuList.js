import React, { useContext } from "react";
import { CategoriesContext } from "context/categories/categoriesContext";
import Link from "next/link";
import { useRouter } from "next/router";

// NOTE: Ordenamos las categorias y subcategorias
const MenuList = ({ hideMenu, setHideMenu }) => {
  const router = useRouter();
  const categoriesContext = useContext(CategoriesContext);
  const { categoriesSorted, setLoadSpinner } = categoriesContext;

  const handleLink = (sortedCategory) => {
    setHideMenu(false);
    if (sortedCategory.slug === router.query.slug) {
      setLoadSpinner(false);
    } else {
      setLoadSpinner(true);
    }
  };

  const createList = (categoriesSorted) => {
    return categoriesSorted.map((sortedCategory) => {
      return (
        <li key={sortedCategory.id}>
          {sortedCategory.subCategory.length ? (
            <Link
              href={{
                pathname: "/categories/[slug]",
                query: { slug: sortedCategory.slug },
              }}
              as={`/categories/${sortedCategory.slug}`}
            >
              <a onClick={() => handleLink(sortedCategory)}>
                {sortedCategory.name}
              </a>
            </Link>
          ) : (
            <Link
              href={{
                pathname: "/categories/[slug]",
                query: { slug: sortedCategory.slug },
              }}
              as={`/categories/${sortedCategory.slug}`}
            >
              <a onClick={() => handleLink(sortedCategory)}>
                {sortedCategory.name}
              </a>
            </Link>
          )}
          <>
            {sortedCategory.subCategory.length ? (
              <ul className="submenu">
                {createList(sortedCategory.subCategory)}
              </ul>
            ) : null}
          </>
        </li>
      );
    });
  };

  return (
    <div className="menu">
      <div className="close icon" onClick={() => setHideMenu(!hideMenu)}>
        close
      </div>
      {hideMenu ? <ul>{createList(categoriesSorted)}</ul> : null}
    </div>
  );
};

export default MenuList;
