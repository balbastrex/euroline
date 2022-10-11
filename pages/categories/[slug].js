import React, { useContext, useEffect, useState } from "react";
import Layout from "components/layout/Layout";
import Categories from "components/categories/Categories";
import { CategoriesContext } from "/context/categories/categoriesContext";
import {
  getAllCategories,
  getProductsByCategory,
  getDesignByTag,
  getPackByCategory,
} from "/api/apiRoutes";
/* import DesignsGroup from "components/designs/DesignsGroup"; */
import DesignsGroup from "components/designs/DesignsGroup";
import Spinner from "components/ui/Spinner";
import ReactHtmlParser from "react-html-parser";
import { useRouter } from "next/router";

function CategoriesGroup({
  sortedCategory,
  prodByCategory,
  productsByTag,
  packByCategory,
}) {
  const categoriesContext = useContext(CategoriesContext);
  const { selectedCategory, setSelectedCategory } = categoriesContext;
  const [principalCat, setPrincipalCat] = useState([]);

  //NOTE: Adding sortedCategory to context and send it to Categories and saving category selected in localstorage
  useEffect(() => {
    const AddCategoryContext = () => {
      setSelectedCategory(sortedCategory);
    };
    AddCategoryContext();
  }, [sortedCategory, selectedCategory, setSelectedCategory]);
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Layout page="Categorias">
        <div>
          <Spinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      page={selectedCategory.name}
      name="description"
      content={selectedCategory.description}
    >
      <Categories
        selectedCategory={selectedCategory}
        principalCat={principalCat}
        setPrincipalCat={setPrincipalCat}
        productsByTag={productsByTag}
      />
      <DesignsGroup
        selectedCategory={selectedCategory}
        prodByCategory={prodByCategory}
        principalCat={principalCat}
        productsByTag={productsByTag}
        packByCategory={packByCategory}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const Allategories = await getAllCategories();

  const paths = await Allategories.map((category) => ({
    params: { slug: category.slug || "404" },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  let sortedCategory;
  let categoryId;
  let tagId;
  let productsByTag;

  try {
    const Allategories = await getAllCategories();

    Allategories.map((category) => {
      if (category.slug === slug) {
        sortedCategory = category;
        categoryId = category.id;
        if (category.tag !== null) {
          tagId = category.tag.id;
        }
      }
    });
  } catch (error) {
    console.log(error);
  }

  const prodByCategory = await getProductsByCategory(categoryId);
  const packByCategory = await getPackByCategory(categoryId);
  if (prodByCategory) {
    productsByTag = await getDesignByTag(tagId);
  }

  return {
    props: {
      sortedCategory: sortedCategory || null,
      prodByCategory: prodByCategory || null,
      productsByTag: productsByTag || null,
      packByCategory: packByCategory || null,
    },
    revalidate: 10,
  };
}

export default CategoriesGroup;
