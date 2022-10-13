import clienteAxios from "config/configAxios";
import React, { useState } from "react";

export default function HttpRequest() {
  const [categories, setCategories] = useState("");

  const getAllCategories = async () => {
    const response = await clienteAxios.get(`categories`);
    setCategories(response.data.data.categories);
    console.log(response.data.data.categories);
    return response.data.data.categories;
  };

  const items = categories;
  return (
    <div>
      <button onClick={() => getAllCategories()}>HTTPRequest</button>
      <ul className="container">
        <>
          {items != ""
            ? items.map((item, key) => <li key={key}>{item.name}</li>)
            : null}
        </>
      </ul>
    </div>
  );
}
