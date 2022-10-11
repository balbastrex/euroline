import React from "react";
import Layout from "components/layout/Layout";
import {
  getAllProducts,
  getDesignGroupsById,
  getProduct,
} from "/api/apiRoutes";
import { useRouter } from "next/router";
import Spinner from "components/ui/Spinner";
import CardDetail from "components/detailPages/CardDetail";

function DesignDetail({ selectedProduct, designSelected, addCart }) {
  const router = useRouter();
  let metaContent;
  let metaPage;
  if (router.isFallback) {
    return (
      <Layout page="Diseños">
        <div>
          <Spinner />
        </div>
      </Layout>
    );
  }

  {
    designSelected && designSelected.meta_title
      ? (metaPage = designSelected.meta_title)
      : !designSelected || !designSelected.meta_title
      ? (metaPage = `${selectedProduct.name} ${designSelected.name}`)
      : null;
  }

  {
    designSelected && designSelected.meta_description
      ? (metaContent = designSelected.meta_description)
      : !designSelected || !designSelected.meta_description
      ? (metaContent = designSelected.description || designSelected.name)
      : null;
  }

  return (
    <Layout page={metaPage} name="description" content={metaContent}>
      {selectedProduct || designSelected ? (
        <CardDetail
          selectedProduct={selectedProduct}
          designSelected={designSelected}
          addCart={addCart}
        />
      ) : null}
    </Layout>
  );
}

export async function getStaticPaths() {
  let allDesignsGroupCopy;
  let allDesigns;
  let data = [];
  let productSlug;

  const Allproducts = await getAllProducts();

  if (Allproducts) {
    for (let i = 0; i < Allproducts.length; i++) {
      try {
        if (Allproducts[i].shop_design_group_id !== null) {
          const designId = await Allproducts[i].shop_design_group_id;
          const allDesignGroupById = await getDesignGroupsById(designId);
          allDesignsGroupCopy = await allDesignGroupById;
          productSlug = await Allproducts[i].slug;

          //NOTE: filtrar los repetidos y meterlos en data
          if (allDesignGroupById !== undefined) {
            allDesignGroupById.map((design) => {
              design.productSlug = productSlug || "";
              allDesigns = allDesignsGroupCopy.filter((designCopy) => {
                design.id === designCopy.id && !data.includes(designCopy);
              });
            });
          }
        }
      } catch (error) {
        console.log("Hubo un error", error);
      }
    }
  }

  if (allDesigns) {
    const paths = allDesigns.map((design) => ({
      params: {
        designDetail: design.slug || null,
        productDetail: (!design.canonical_uri && design.productSlug) || null,
      },
    }));

    return {
      paths,
      fallback: true,
    };
  } else {
    return { paths: [], fallback: true };
  }
}

export async function getStaticProps({ params }) {
  let allProducts;
  let selectedProduct;
  let designSelected;
  let productId;

  try {
    allProducts = await getAllProducts();
    await allProducts.map((prod) => {
      if (prod.slug === params.productDetail) {
        productId = prod.id;
      }
    });

    selectedProduct = await getProduct(productId);

    const groupId = await selectedProduct.shop_design_group_id;

    const designs = await getDesignGroupsById(groupId);

    await designs.map((design) => {
      if (design.slug === params.designDetail) {
        return (designSelected = design);
      }
    });
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      selectedProduct: selectedProduct || null,
      designSelected: designSelected || null,
    },
    revalidate: 10,
  };
}

export default DesignDetail;
