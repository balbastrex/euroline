import React, { useContext, useState } from "react";
import { CategoriesContext } from "context/categories/categoriesContext";
import Link from "next/link";

const Child = (category) => {
  return (
    <li>
      <a>{category.name}</a>;
    </li>
  );
};

const Parent = (category) => {
  const [classN, setClassN] = useState("submenu");
  const subCategory = category.subCategory;
  return (
    <>
      <a>{category.name}</a>
      <div
        className="icon"
        onClick={() =>
          classN == "subcategory-ul-hidden"
            ? setClassN("submenu")
            : setClassN("subcategory-ul-hidden")
        }
      >
        keyboard_arrow_down
      </div>
      <ul className={classN}>{CreateList(subCategory)}</ul>
    </>
  );
};

export const CreateList = (category) => {
  return category.map((category) => {
    return (
      <li key={category.id}>
        {category.subCategory.length ? (
          <Parent {...category} />
        ) : (
          <Child {...category} />
        )}
      </li>
    );
  });
};

const MenuList = () => {
  const categoriesContext = useContext(CategoriesContext);
  const { categoriesSorted } = categoriesContext;

  return (
    <div className="menu">
      <ul>{CreateList(categoriesSorted)}</ul>
    </div>
  );
};

export default MenuList;
