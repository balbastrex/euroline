import { getCategoryById } from "api/apiRoutes";
import React, { useEffect, useState } from "react";

export const getParent = async (parent_id) => {
  const parentCategory = await getCategoryById(parent_id);
  return parentCategory;
};

function Hierarchy() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const categoryResponse = await getCategoryById();
      setCategory(categoryResponse.data.category);
      console.log(categoryResponse.data.category);
    };
    getCategory();
  }, []);

  return <div>{category.name}</div>;
}

export default Hierarchy;
