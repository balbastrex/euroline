import React, { useState } from "react";
import Child from "./Child";

const Parent = (sortedCategory) => {
  const [classN, setClassN] = useState("submenu");
  const category = sortedCategory;
  const subCategory = sortedCategory.subCategory;

  const CreateList = (category) => {
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
      <ul className={classN}>
        {/* {subCategory.map((category, key) => (
          <Child key={key} {...category} />
        ))} */}
        {CreateList(subCategory)}
      </ul>
    </>
  );
};

export default Parent;
