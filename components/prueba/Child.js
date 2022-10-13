import React from "react";

function Child(category) {
  return (
    <li>
      <a>{category.name}</a>;
    </li>
  );
}

export default Child;
