import React from "react";
import Parent from "./Parent";
import Child from "./Child";

// NOTE: Ordenamos las categorias y subcategorias
const CreateList = (categoriesSorted) => {
  return categoriesSorted.map((category) => {
    <li key={category.id}>
      {category.subCategory.length ? (
        <Parent {...category} />
      ) : (
        <Child {...category} />
      )}
    </li>;
  });
};

export default CreateList;
