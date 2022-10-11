import { createContext, useState } from "react";

export const CategoriesContext = createContext();

const CategoriesProvider = (props) => {
  //OK: categoriesSorted, categories ordered by position, ready for menu [5]
  const [categoriesSorted, setCategoriesSorted] = useState([]);
  //OK: categories, All categories ordered by position with subCategories [12]
  const [categories, setCategories] = useState([]);
  //OK: selectedCategory, Category Selected with subCategories in menu or Categories componet Link {1}
  const [selectedCategory, setSelectedCategory] = useState({});
  //OK: loadSpinner, State to show Spinner component or not
  const [loadSpinner, setLoadSpinner] = useState(false);

  const getCategoriesSorted = async () => {
    setCategoriesSorted(categories[0].subCategory);
  };

  //Almacenamos en el contexto las categorias por niveles añadiendo sus subcategorias
  let newObject = {};

  categories.forEach((category) => {
    if (!newObject.hasOwnProperty(category.level)) {
      newObject[category.level] = {
        ...category,
      };
    }
  });

  let categoryCopy = [...categories],
    categoryCompare = [...categories];

  categoryCompare.forEach((category) => {
    category.subCategory = [];
    categoryCopy.forEach((copyElement) => {
      if (copyElement.parent_id === category.id) {
        category.subCategory.push(copyElement);
      }
    });
  });
  ////

  //Ordenamos el menú por posición de las categorias
  const menuOrder = (categories) => {
    return categories.map((category) => {
      categories.sort((a, b) => {
        return a.position - b.position;
      });
      if (category.subCategory.length) {
        menuOrder(category.subCategory);
      }
    });
  };
  menuOrder(categories);
  ////

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        selectedCategory,
        categoriesSorted,
        loadSpinner,
        setCategories,
        setSelectedCategory,
        setCategoriesSorted,
        setLoadSpinner,
        /* getAllCategories, */
        getCategoriesSorted,
      }}
    >
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
