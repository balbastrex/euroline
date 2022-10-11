import { createContext, useState, useContext, useEffect } from "react";
import { CategoriesContext } from "context/categories/categoriesContext";
import { getDesignGroupsById } from "/api/apiRoutes";

export const DesignsContext = createContext();

const DesignsProvider = (props) => {
  const categoriesContext = useContext(CategoriesContext);
  const { loadSpinner, setLoadSpinner } = categoriesContext;
  const [allDesigns, setAllDesigns] = useState([]);
  const [stopGetDesigns, setStopGetDesigns] = useState(false);
  const [productByCategory, setProductByCategory] = useState([]);

  const getDesigns = async (productsByCategorySelected) => {
    let data = [];
    let productSlug = "";
    let productName = "";
    let allDesignsGroup;
    let allDesignsGroupCopy;
    setAllDesigns([]);
    setProductByCategory(productsByCategorySelected);
    /* setStopGetDesigns(true); */
    if (productByCategory === productsByCategorySelected && productByCategory) {
      //NOTE: No tocar, Spinner mientras cargan los diseños
      setLoadSpinner(false);
      for (let i = 0; i < productByCategory.length; i++) {
        try {
          if (productByCategory[i].shop_design_group_id !== null) {
            const designId = await productByCategory[i].shop_design_group_id;
            const designsGroupId = await getDesignGroupsById(designId);
            allDesignsGroupCopy = await designsGroupId;
            productSlug = await productByCategory[i].slug;
            productName = await productByCategory[i].name;

            //NOTE: filtrar los repetidos y meterlos en data
            if (designsGroupId !== undefined) {
              designsGroupId.map((design) => {
                design.productSlug = productSlug || "";
                design.productName = productName || "";
                allDesignsGroupCopy.map((designCopy) => {
                  if (
                    design.id === designCopy.id &&
                    !data.includes(designCopy.id)
                  ) {
                    data.push(designCopy);
                  }
                });
              });
            }
          } else {
            data.push(productByCategory[i]);
          }
        } catch (error) {
          console.log("There are an error", error);
        }
      }
      setAllDesigns(data);
      setLoadSpinner(true);
    }
    setLoadSpinner(false);
  };

  return (
    <DesignsContext.Provider
      value={{
        allDesigns,
        stopGetDesigns,
        productByCategory,
        loadSpinner,
        setLoadSpinner,
        setProductByCategory,
        setStopGetDesigns,
        setAllDesigns,
        getDesigns,
      }}
    >
      {props.children}
    </DesignsContext.Provider>
  );
};

export default DesignsProvider;
