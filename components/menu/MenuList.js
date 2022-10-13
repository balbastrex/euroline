import React, { useContext, useState } from "react";
import { CategoriesContext } from "context/categories/categoriesContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { ClickAwayListener } from "@mui/base";

const MenuList = ({ hideMenu, setHideMenu }) => {
  const router = useRouter();
  const categoriesContext = useContext(CategoriesContext);
  const { categoriesSorted, setLoadSpinner } = categoriesContext;

  const handleLink = (category) => {
    setHideMenu(false);
    if (category.slug === router.query.slug) {
      setLoadSpinner(false);
    } else {
      setLoadSpinner(true);
    }
  };
  const Child = (sortedCategory) => {
    return (
      <li>
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
      </li>
    );
  };

  const Parent = (sortedCategory) => {
    const [liClass, setLiClass] = useState("submenu-hidden");
    const subCategory = sortedCategory.subCategory;
    return (
      <li className={liClass}>
        <div>
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
          <div
            className="icon"
            onClick={() =>
              liClass == "submenu-hidden"
                ? setLiClass("submenu")
                : setLiClass("submenu-hidden")
            }
          >
            keyboard_arrow_down
          </div>
        </div>
        <ul>{CreateList(subCategory)}</ul>
      </li>
    );
  };

  const CreateList = (categoriesSorted) => {
    return categoriesSorted.map((sortedCategory) => {
      return (
        <>
          {sortedCategory.subCategory.length ? (
            <Parent {...sortedCategory} />
          ) : (
            <Child {...sortedCategory} />
          )}
        </>
      );
    });
  };

  return (
    <ClickAwayListener onClickAway={() => setHideMenu(false)}>
      <div className="menu">
        <div className="close icon" onClick={() => setHideMenu(!hideMenu)}>
          close
        </div>
        {hideMenu ? <ul>{CreateList(categoriesSorted)}</ul> : null}
      </div>
    </ClickAwayListener>
  );
};

export default MenuList;
