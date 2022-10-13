import { getTopCategories } from "api/apiRoutes";
import TopMenuCard from "components/topMenu/TopMenuCard";
import React, { useEffect, useState } from "react";

export default function TopMenu() {
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    const getTop = async () => {
      const topCategoriesResponse = await getTopCategories();
      setTopCategories(topCategoriesResponse);
    };
    getTop();
  }, []);

  const items = topCategories;

  return (
    <section id="top-menu">
      <div className="container">
        {items.map((item, key) => (
          <TopMenuCard key={key} {...item} />
        ))}
      </div>
      <hr />
    </section>
  );
}
